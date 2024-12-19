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
import { fetchItemsByCategory, saveOutfit, fetchSavedOutfits, deleteOutfit } from '../functions/outfitDatabaseFunctions';

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
  { id: 1, name: "TOPS" },
  { id: 2, name: "JUMPERS" },
  { id: 3, name: "TROUSERS" },
  { id: 4, name: "DRESSES/SKIRTS" },
  { id: 5, name: "JACKETS/COATS" }
];

export default function OutfitMakerComponent() {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState({ id: 1, name: "TOPS" });
  const [availableItems, setAvailableItems] = useState<ClothingItem[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [showSavedOutfits, setShowSavedOutfits] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [outfitName, setOutfitName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    <Box flex={1} bg="#E6E5DC" safeArea alignItems="center" pb="80px">
      <VStack space={4} w="100%" maxW="400px" px={4} alignItems="center">
        {/* Title */}
        <Text fontSize="xl" fontWeight="bold" color="#395D51" textAlign="center" mt={4}>
          OUTFIT MAKER
        </Text>

        {/* Category Selection */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} w="100%">
          <HStack space={3} py={2}>
            {categories.map((category) => (
              <Button
                key={category.id}
                onPress={() => setSelectedCategory(category)}
                bg="transparent"
                borderColor={selectedCategory.id === category.id ? "#FFB800" : "#395D51"}
                borderWidth={1.5}
                rounded="lg"
                _text={{ 
                  color: selectedCategory.id === category.id ? "#FFB800" : "#395D51",
                  fontSize: "md",
                  fontWeight: "medium"
                }}
                _pressed={{
                  bg: "transparent"
                }}
                px={6}
                py={2}
              >
                {category.name}
              </Button>
            ))}
          </HStack>
        </ScrollView>

        {/* Available Items */}
        <Box w="100%" minH="150px">
          <Text color="#395D51" fontSize="lg" fontWeight="semibold" mb={2}>
            AVAILABLE {selectedCategory.name}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} minH="120px">
            <HStack space={3} px={2} minH="120px">
              {availableItems.map((item) => (
                <Pressable
                  key={item.item_id}
                  onPress={() => handleAddItem(item)}
                >
                  <Box 
                    p={2} 
                    borderRadius="md" 
                    minH="100px"
                    bg="white"
                    borderWidth={1.5}
                    borderColor="#395D51"
                  >
                    <Image
                      source={{ uri: item.photo_link }}
                      alt={item.item_desc}
                      size="lg"
                      width={24}
                      height={24}
                    />
                    <Text color="#395D51" fontSize="sm" textAlign="center" mt={1}>
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
            <Text color="#395D51" fontSize="lg" fontWeight="semibold" mb={2}>
              YOUR SELECTION
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} minH="120px">
              <HStack space={3} px={2} minH="120px">
                {selectedItems.map((item, index) => (
                  <Box key={index} position="relative">
                    <Box 
                      p={2} 
                      borderRadius="md"
                      bg="white"
                      borderWidth={1.5}
                      borderColor="#395D51"
                    >
                      <Image
                        source={{ uri: item.photo_link }}
                        alt={item.item_desc}
                        size="lg"
                        width={24}
                        height={24}
                      />
                      <Text color="#395D51" fontSize="sm" textAlign="center" mt={1}>
                        {item.item_desc}
                      </Text>
                    </Box>
                    <IconButton
                      position="absolute"
                      top={-2}
                      right={-2}
                      size="sm"
                      icon={<CloseIcon size="xs" color="#395D51" />}
                      onPress={() => handleDeleteItem(index)}
                      bg="transparent"
                      borderWidth={1.5}
                      borderColor="#395D51"
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
            bg="transparent"
            borderColor="#395D51"
            borderWidth={1.5}
            rounded="lg"
            _text={{ 
              color: "#395D51",
              fontSize: "md",
              fontWeight: "medium"
            }}
            _pressed={{
              bg: "transparent"
            }}
            w="45%"
            py={2}
            isDisabled={selectedItems.length === 0}
          >
            SAVE OUTFIT
          </Button>
          <Button
            onPress={() => setShowSavedOutfits(true)}
            bg="transparent"
            borderColor="#395D51"
            borderWidth={1.5}
            rounded="lg"
            _text={{ 
              color: "#395D51",
              fontSize: "md",
              fontWeight: "medium"
            }}
            _pressed={{
              bg: "transparent"
            }}
            w="45%"
            py={2}
          >
            VIEW OUTFITS
          </Button>
        </HStack>

        {/* Save Modal */}
        <Modal isOpen={showSaveModal} onClose={() => setShowSaveModal(false)}>
          <Modal.Content bg="#E6E5DC">
            <Modal.CloseButton />
            <Modal.Header 
              bg="#E6E5DC" 
              borderBottomWidth={0}
              _text={{
                color: "#395D51",
                fontWeight: "bold"
              }}
            >
              SAVE OUTFIT
            </Modal.Header>
            <Modal.Body>
              <Input
                placeholder="Enter outfit name"
                value={outfitName}
                onChangeText={setOutfitName}
                mb={4}
                borderColor="#395D51"
                borderWidth={1.5}
                color="#395D51"
                _focus={{
                  borderColor: "#FFB800",
                  bg: "transparent",
                  borderWidth: 1.5
                }}
              />
              <VStack space={2}>
                <Text fontWeight="bold" color="#395D51">SELECTED ITEMS:</Text>
                {selectedItems.map((item, index) => (
                  <Text key={index} color="#395D51">{item.item_desc}</Text>
                ))}
              </VStack>
            </Modal.Body>
            <Modal.Footer borderTopWidth={0} bg="#E6E5DC">
              <Button.Group space={2}>
                <Button 
                  variant="outline"
                  borderColor="#395D51"
                  borderWidth={1.5}
                  rounded="lg"
                  onPress={() => setShowSaveModal(false)}
                  _text={{ 
                    color: "#395D51"
                  }}
                  _pressed={{
                    bg: "transparent"
                  }}
                >
                  CANCEL
                </Button>
                <Button 
                  onPress={handleSaveOutfit}
                  isLoading={isLoading}
                  bg="transparent"
                  borderColor="#395D51"
                  borderWidth={1.5}
                  rounded="lg"
                  _text={{ 
                    color: "#395D51"
                  }}
                  _pressed={{
                    bg: "transparent"
                  }}
                >
                  SAVE
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* View Saved Outfits Modal */}
        <Modal isOpen={showSavedOutfits} onClose={() => setShowSavedOutfits(false)} size="full">
          <Modal.Content bg="#E6E5DC">
            <Modal.CloseButton />
            <Modal.Header 
              bg="#E6E5DC" 
              borderBottomWidth={0}
              _text={{
                color: "#395D51",
                fontWeight: "bold"
              }}
            >
              MY SAVED OUTFITS
            </Modal.Header>
            <Modal.Body>
              <ScrollView>
                <VStack space={4}>
                  {savedOutfits.map((outfit) => (
                    <Box
                      key={outfit.outfit_id}
                      borderWidth={1.5}
                      borderColor="#395D51"
                      borderRadius="lg"
                      p={4}
                      bg="transparent"
                    >
                      <HStack justifyContent="space-between" alignItems="center" mb={2}>
                        <Text fontSize="lg" fontWeight="bold" color="#395D51">
                          {outfit.outfit_name}
                        </Text>
                        <IconButton
                          icon={<CloseIcon color="#395D51" />}
                          onPress={() => handleDeleteOutfit(outfit.outfit_id)}
                          bg="transparent"
                          borderWidth={1.5}
                          borderColor="#395D51"
                          rounded="full"
                        />
                      </HStack>
                      <ScrollView horizontal>
                        <HStack space={2}>
                          {outfit.outfit_items.map((item, index) => (
                            <Box 
                              key={index}
                              borderWidth={1.5}
                              borderColor="#395D51"
                              borderRadius="md"
                              p={2}
                              bg="transparent"
                            >
                              <Image
                                source={{ uri: item.clothing_items.photo_link }}
                                alt={item.clothing_items.item_desc}
                                size="md"
                              />
                              <Text fontSize="xs" mt={1} color="#395D51">
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