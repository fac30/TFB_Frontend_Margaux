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
  Modal 
} from "native-base";
import { useState } from "react";
import { CloseIcon } from "native-base";
import { PencilIcon as HeroPencil, TrashIcon as HeroTrash } from "@heroicons/react/16/solid";
import { Icon } from "native-base";

interface ClothingItem {
  name: string;
  image: string;
  category: string;
  subcategory: string;
}

interface SavedOutfit {
  items: ClothingItem[];
  date: string;
}

const PencilIcon = (props: any) => (
  <Icon as={HeroPencil} size={5} {...props} />
);

const TrashIcon = (props: any) => (
  <Icon as={HeroTrash} size={5} {...props} />
);

export default function OutfitMakerComponent() {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Placeholder Category");
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [showSavedOutfits, setShowSavedOutfits] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState("Save");

  const handleAddItem = (item: ClothingItem) => {
    if (selectedItems.length >= 6 || selectedItems.some(selected => selected.name === item.name)) {
      return; // Prevent adding more than 6 items or duplicates
    }
    setSelectedItems(prev => [...prev, item]);
  };

  const handleDeleteItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveCollection = () => {
    if (selectedItems.length > 0) {
      const newOutfit: SavedOutfit = {
        items: [...selectedItems],
        date: new Date().toLocaleDateString()
      };
      setSavedOutfits(prev => [...prev, newOutfit]);
      setSelectedItems([]);
      setSaveButtonText("Saved!");

      // Reset button state after 1.5 seconds
      setTimeout(() => {
        setSaveButtonText("Save");
      }, 1500);
    }
  };

  const handleViewCollections = () => {
    setShowSavedOutfits(true);
  };

  const handleCloseModal = () => {
    setShowSavedOutfits(false);
  };

  const handleDeleteOutfit = (index: number) => {
    setSavedOutfits(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box 
      flex={1} 
      bg="primary.200" 
      safeArea 
      alignItems="center"
      pb="80px"
    >
      <VStack 
        space={4} 
        w="100%" 
        maxW="400px"
        px={4}
        alignItems="center"
      >
        <Text 
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold" 
          color="primary.100" 
          textAlign="center"
          mt={4}
        >
          Outfit Maker
        </Text>

        <HStack space={4} justifyContent="center">
          <Button
            onPress={() => setSelectedCategory("Placeholder Category")}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _text={{ color: "primary.100" }}
          >
            Placeholder Category
          </Button>
        </HStack>

        <Box w="100%" minH="150px">
          <Text 
            color="primary.100" 
            fontSize="lg" 
            fontWeight="semibold"
            mb={2}
          >
            Available {selectedCategory}
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            minH="120px"
          >
            <HStack space={3} px={2} minH="120px">
              <Pressable
                onPress={() => handleAddItem({
                  name: "Placeholder Item",
                  image: "https://via.placeholder.com/150",
                  category: selectedCategory,
                  subcategory: "Placeholder Subcategory"
                })}
              >
                <Box
                  p={2}
                  borderRadius="md"
                  minH="100px"
                >
                  <Image
                    source={{ uri: "https://via.placeholder.com/150" }}
                    alt="Placeholder Item"
                    size="lg"
                    width={24}
                    height={24}
                  />
                  <Text
                    color="primary.100"
                    fontSize="sm"
                    textAlign="center"
                    mt={1}
                  >
                    Placeholder Item
                  </Text>
                </Box>
              </Pressable>
            </HStack>
          </ScrollView>
        </Box>

        {selectedItems.length > 0 && (
          <Box w="100%" minH="150px">
            <Text 
              color="primary.100" 
              fontSize="lg" 
              fontWeight="semibold"
              mb={2}
            >
              Your Selection
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              minH="120px"
            >
              <HStack space={3} px={2} minH="120px">
                {selectedItems.map((item, index) => (
                  <Box key={index} position="relative">
                    <Box
                      p={2}
                      borderRadius="md"
                    >
                      <Image
                        source={{ uri: item.image }}
                        alt={item.name}
                        size="lg"
                        width={24}
                        height={24}
                      />
                      <Text
                        color="primary.100"
                        fontSize="sm"
                        textAlign="center"
                        mt={1}
                      >
                        {item.name}
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

        <HStack space={4} w="100%" justifyContent="center" mt={4}>
          <Button
            onPress={handleSaveCollection}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _text={{ color: "primary.100" }}
            w="45%"
          >
            {saveButtonText}
          </Button>
          <Button
            onPress={handleViewCollections}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _text={{ color: "primary.100" }}
            w="45%"
          >
            View
          </Button>
        </HStack>

        {showSavedOutfits && (
          <Modal 
            isOpen={showSavedOutfits} 
            onClose={handleCloseModal}
            size="full"
            bg="primary.200"
          >
            {/* Modal content goes here */}
          </Modal>
        )}
      </VStack>
    </Box>
  );
}
