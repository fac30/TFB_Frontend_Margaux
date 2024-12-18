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
import { categories } from "../data/categories";
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [showSavedOutfits, setShowSavedOutfits] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState("Save");

  const handleAddItem = (item: ClothingItem) => {
    if (selectedItems.length >= 6) {
      return;
    }

    if (selectedItems.some(selected => selected.name === item.name)) {
      return;
    }

    setSelectedItems(prev => [...prev, item]);
  };

  const handleDeleteItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const currentCategory = categories.find(cat => cat.name === selectedCategory);

  const handleSaveCollection = () => {
    if (selectedItems.length > 0) {
      const newOutfit: SavedOutfit = {
        items: [...selectedItems],
        date: new Date().toLocaleDateString()
      };

      setSavedOutfits(prev => [...prev, newOutfit]);
      setSelectedItems([]);
      setSaveButtonText("Saved!");

      // Force button state reset
      const button = document.activeElement as HTMLElement;
      if (button) {
        button.blur();
      }

      setTimeout(() => {
        setSaveButtonText("Save");
      }, 1500);
    } else {
      return;
    }
  };

  const handleViewCollections = () => {
    try {
      setShowSavedOutfits(true);
    } catch (error) {
      console.error('Error showing collections:', error);
    }
  };

  const handleCloseModal = () => {
    try {
      setShowSavedOutfits(false);
    } catch (error) {
      console.error('Error closing modal:', error);
    }
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
        {/* Header */}
        <Text 
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold" 
          color="primary.100" 
          textAlign="center"
          mt={4}
        >
          Outfit Maker
        </Text>

        {/* Category Buttons - Updated styling */}
        <HStack space={4} justifyContent="center">
          {categories.map((category) => (
            <Button
              key={category.name}
              onPress={() => setSelectedCategory(category.name)}
              bg="primary.200"
              borderColor="primary.100"
              borderWidth={1}
              _text={{ color: "primary.100" }}
              _hover={{
                borderColor: "amber.400",
                color: "amber.400",
                _text: { color: "amber.400" }
              }}
              _focus={{
                borderColor: "amber.400",
                color: "amber.400",
                _text: { color: "amber.400" },
                bg: "transparent"
              }}
              _pressed={{}}
            >
              {category.name}
            </Button>
          ))}
        </HStack>

        {/* Available Items Grid */}
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
              {currentCategory?.subcategories.map(subcategory => (
                subcategory.items.map((item, index) => (
                  <Pressable
                    key={`${subcategory.name}-${index}`}
                    onPress={() => handleAddItem({
                      ...item,
                      category: selectedCategory,
                      subcategory: subcategory.name
                    })}
                  >
                    <Box
                      p={2}
                      borderRadius="md"
                      minH="100px"
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
                  </Pressable>
                ))
              ))}
            </HStack>
          </ScrollView>
        </Box>

        {/* Selected Items */}
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
                      _hover={{
                        bg: "transparent",
                        _icon: { color: "amber.400" }
                      }}
                      _focus={{
                        bg: "transparent",
                        _icon: { color: "amber.400" }
                      }}
                    />
                  </Box>
                ))}
              </HStack>
            </ScrollView>
          </Box>
        )}

        {/* Save and View Collections Buttons */}
        <HStack space={4} w="100%" justifyContent="center" mt={4}>
          <Button
            onPress={handleSaveCollection}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _text={{ color: "primary.100" }}
            _hover={{
              borderColor: "amber.400",
              _text: { color: "amber.400" }
            }}
            _focus={{
              borderColor: "primary.100",
              _text: { color: "primary.100" },
              bg: "transparent"
            }}
            _pressed={{
              bg: "primary.200",
              borderColor: "primary.100",
              _text: { color: "primary.100" }
            }}
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
            _hover={{
                borderColor: "amber.400",
                color: "amber.400",
                _text: { color: "amber.400" }
            }}
            _focus={{
                borderColor: "amber.400",
                color: "amber.400",
                _text: { color: "amber.400" },
                bg: "transparent"
            }}
            _pressed={{}}
            w="45%"
          >
            View
          </Button>
        </HStack>

        {/* Saved Outfits Modal */}
        {showSavedOutfits && (
          <Modal 
            isOpen={showSavedOutfits} 
            onClose={handleCloseModal}
            size="full"
            bg="primary.200"
          >
            <Modal.Content 
              bg="primary.200"
              flex={1}
              width="100%"
              marginTop={0}
              marginBottom={0}
            >
              <Modal.CloseButton 
                _icon={{ color: "primary.100" }}
                _hover={{
                  bg: "transparent",
                  _icon: { color: "amber.400" }
                }}
                _focus={{
                  bg: "transparent",
                  _icon: { color: "amber.400" }
                }}
                onPress={handleCloseModal}
              />
              <Modal.Header bg="primary.200" borderBottomWidth={0}>
                <Text color="primary.100" fontSize="xl" fontWeight="bold">
                  Saved Collections
                </Text>
              </Modal.Header>
              <Modal.Body flex={1}>
                {savedOutfits.length === 0 ? (
                  <Text color="primary.100" textAlign="center">
                    No saved collections yet
                  </Text>
                ) : (
                  <ScrollView flex={1}>
                    {savedOutfits.map((outfit, index) => (
                      <Box 
                        key={index}
                        borderWidth={1}
                        borderColor="primary.100"
                        borderRadius="md"
                        p={4}
                        mb={4}
                      >
                        <HStack justifyContent="space-between" alignItems="center" mb={2}>
                          <Text color="primary.100">
                            Saved on: {outfit.date}
                          </Text>
                          <HStack space={2}>
                            <IconButton
                              icon={<PencilIcon />}
                              onPress={() => {
                                setSelectedItems(outfit.items);
                                handleCloseModal();
                              }}
                              variant="ghost"
                              _icon={{ color: "primary.100" }}
                              _hover={{
                                bg: "transparent",
                                _icon: { color: "amber.400" }
                              }}
                              _focus={{
                                bg: "transparent",
                                _icon: { color: "amber.400" }
                              }}
                            />
                            <IconButton
                              icon={<TrashIcon />}
                              onPress={() => handleDeleteOutfit(index)}
                              variant="ghost"
                              _icon={{ color: "primary.100" }}
                              _hover={{
                                bg: "transparent",
                                _icon: { color: "amber.400" }
                              }}
                              _focus={{
                                bg: "transparent",
                                _icon: { color: "amber.400" }
                              }}
                            />
                          </HStack>
                        </HStack>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                          <HStack space={3}>
                            {outfit.items.map((item, itemIndex) => (
                              <Box key={itemIndex}>
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
                            ))}
                          </HStack>
                        </ScrollView>
                      </Box>
                    ))}
                  </ScrollView>
                )}
              </Modal.Body>
            </Modal.Content>
          </Modal>
        )}
      </VStack>
    </Box>
  );
}
