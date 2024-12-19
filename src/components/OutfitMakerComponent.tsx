import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  ScrollView, 
  Image, 
  IconButton, 
  Pressable, 
  Button,
  Modal,
  Input,
  useToast
} from "native-base";
import { useState, useEffect } from "react";
import { CloseIcon } from "native-base";
import { 
  fetchItemsByCategory, 
  saveOutfit, 
  fetchSavedOutfits, 
  deleteOutfit 
} from '../functions/outfitDatabaseFunctions';

interface ClothingItem {
  item_id: number;
  item_desc: string;
  photo_link: string;
  category_id: number;
}

interface SavedOutfit {
  outfit_id: number;
  outfit_name: string;
  outfit_items: {
    clothing_items: ClothingItem;
  }[];
}

const categories = [
  { id: 1, name: "Tops" },
  { id: 2, name: "Jumpers" },
  { id: 3, name: "Trousers" },
  { id: 4, name: "Dresses/Skirts" },
  { id: 5, name: "Jackets/Coats" }
];

export default function OutfitMakerComponent() {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState({ id: 1, name: "Tops" });
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [showSavedOutfits, setShowSavedOutfits] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [outfitName, setOutfitName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [availableItems, setAvailableItems] = useState<ClothingItem[]>([]);
  const toast = useToast();

  const userId = 1; // Replace with actual user ID

  useEffect(() => {
    loadItemsByCategory();
    loadSavedOutfits();
  }, [selectedCategory]);

  const loadItemsByCategory = async () => {
    try {
      const items = await fetchItemsByCategory(selectedCategory.id, userId);
      setAvailableItems(items);
    } catch (error) {
      toast.show({
        description: "Failed to load items",
        status: "error"
      });
    }
  };

  const loadSavedOutfits = async () => {
    try {
      const outfits = await fetchSavedOutfits(userId);
      setSavedOutfits(outfits);
    } catch (error) {
      toast.show({
        description: "Failed to load outfits",
        status: "error"
      });
    }
  };

  const handleSaveOutfit = async () => {
    if (!outfitName.trim()) {
      toast.show({
        description: "Please enter an outfit name",
        status: "warning"
      });
      return;
    }

    if (selectedItems.length === 0) {
      toast.show({
        description: "Please select at least one item",
        status: "warning"
      });
      return;
    }

    setIsLoading(true);
    try {
      const itemIds = selectedItems.map(item => item.item_id);
      await saveOutfit(userId, outfitName, itemIds);
      
      toast.show({
        description: "Outfit saved successfully!",
        status: "success"
      });
      
      setSelectedItems([]);
      setOutfitName("");
      setShowSaveModal(false);
      loadSavedOutfits();
    } catch (error) {
      toast.show({
        description: "Failed to save outfit",
        status: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOutfit = async (outfitId: number) => {
    try {
      const success = await deleteOutfit(outfitId);
      if (success) {
        toast.show({
          description: "Outfit deleted successfully",
          status: "success"
        });
        loadSavedOutfits();
      }
    } catch (error) {
      toast.show({
        description: "Failed to delete outfit",
        status: "error"
      });
    }
  };

  const handleAddItem = (item: ClothingItem) => {
    if (selectedItems.length >= 6 || selectedItems.some(selected => selected.item_id === item.item_id)) {
      return;
    }
    setSelectedItems(prev => [...prev, item]);
  };

  const handleDeleteItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box flex={1} bg="primary.200" safeArea alignItems="center" pb="80px">
      <VStack space={4} w="100%" maxW="400px" px={4} alignItems="center">
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="primary.100" textAlign="center" mt={4}>
          Outfit Maker
        </Text>

        {/* Category Selection */}
        <HStack space={4} justifyContent="center" flexWrap="wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              onPress={() => setSelectedCategory(category)}
              bg={selectedCategory.id === category.id ? "primary.100" : "primary.200"}
              borderColor="primary.100"
              borderWidth={1}
              _text={{ 
                color: selectedCategory.id === category.id ? "white" : "primary.100" 
              }}
              mb={2}
            >
              {category.name}
            </Button>
          ))}
        </HStack>

        {/* Available Items */}
        <Box w="100%" minH="150px">
          <Text color="primary.100" fontSize="lg" fontWeight="semibold" mb={2}>
            Available {selectedCategory.name}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} minH="120px">
            <HStack space={3} px={2} minH="120px">
              {availableItems.map((item) => (
                <Pressable
                  key={item.item_id}
                  onPress={() => handleAddItem(item)}
                >
                  <Box p={2} borderRadius="md" minH="100px">
                    <Image
                      source={{ uri: item.photo_link }}
                      alt={item.item_desc}
                      size="lg"
                      width={24}
                      height={24}
                    />
                    <Text color="primary.100" fontSize="sm" textAlign="center" mt={1}>
                      {item.item_desc}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>
        </Box>

        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <Box w="100%" minH="150px">
            <Text color="primary.100" fontSize="lg" fontWeight="semibold" mb={2}>
              Your Selection
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} minH="120px">
              <HStack space={3} px={2} minH="120px">
                {selectedItems.map((item, index) => (
                  <Box key={index} position="relative">
                    <Box p={2} borderRadius="md">
                      <Image
                        source={{ uri: item.photo_link }}
                        alt={item.item_desc}
                        size="lg"
                        width={24}
                        height={24}
                      />
                      <Text color="primary.100" fontSize="sm" textAlign="center" mt={1}>
                        {item.item_desc}
                      </Text>
                    </Box>
                    <IconButton
                      position="absolute"
                      top={-2}
                      right={-2}
                      size="sm"
                      icon={<CloseIcon size="xs" color="primary.100" />}
                      onPress={() => handleDeleteItem(index)}
                      bg="primary.200"
                      variant="unstyled"
                      rounded="full"
                    />
                  </Box>
                ))}
              </HStack>
            </ScrollView>
          </Box>
        )}

        {/* Action Buttons */}
        <HStack space={4} w="100%" justifyContent="center" mt={4}>
          <Button
            onPress={() => setShowSaveModal(true)}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _text={{ color: "primary.100" }}
            w="45%"
            isDisabled={selectedItems.length === 0}
          >
            Save Outfit
          </Button>
          <Button
            onPress={() => setShowSavedOutfits(true)}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _text={{ color: "primary.100" }}
            w="45%"
          >
            View Outfits
          </Button>
        </HStack>

        {/* Save Modal */}
        <Modal isOpen={showSaveModal} onClose={() => setShowSaveModal(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Save Outfit</Modal.Header>
            <Modal.Body>
              <Input
                placeholder="Enter outfit name"
                value={outfitName}
                onChangeText={setOutfitName}
                mb={4}
              />
              <VStack space={2}>
                <Text fontWeight="bold">Selected Items:</Text>
                {selectedItems.map((item, index) => (
                  <Text key={index}>{item.item_desc}</Text>
                ))}
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button 
                  variant="ghost" 
                  onPress={() => setShowSaveModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onPress={handleSaveOutfit}
                  isLoading={isLoading}
                >
                  Save Outfit
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* View Saved Outfits Modal */}
        <Modal isOpen={showSavedOutfits} onClose={() => setShowSavedOutfits(false)} size="full">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>My Saved Outfits</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <VStack space={4}>
                  {savedOutfits.map((outfit) => (
                    <Box
                      key={outfit.outfit_id}
                      borderWidth={1}
                      borderColor="gray.200"
                      borderRadius="md"
                      p={4}
                    >
                      <HStack justifyContent="space-between" alignItems="center" mb={2}>
                        <Text fontSize="lg" fontWeight="bold">
                          {outfit.outfit_name}
                        </Text>
                        <IconButton
                          icon={<CloseIcon />}
                          onPress={() => handleDeleteOutfit(outfit.outfit_id)}
                          variant="ghost"
                          colorScheme="red"
                        />
                      </HStack>
                      <ScrollView horizontal>
                        <HStack space={2}>
                          {outfit.outfit_items.map((item, index) => (
                            <Box key={index}>
                              <Image
                                source={{ uri: item.clothing_items.photo_link }}
                                alt={item.clothing_items.item_desc}
                                size="md"
                              />
                              <Text fontSize="xs" mt={1}>
                                {item.clothing_items.item_desc}
                              </Text>
                            </Box>
                          ))}
                        </HStack>
                      </ScrollView>
                    </Box>
                  ))}
                </VStack>
              </ScrollView>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </VStack>
    </Box>
  );
}