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
  useBreakpointValue,
} from "native-base";
import { useState } from "react";
import { CloseIcon } from "native-base";
import { categories } from "../data/categories";
import PopUpGallery from "./PopUpGallery";

interface ClothingItem {
  name: string;
  image: string;
  category: string;
  subcategory: string;
}

export interface SavedOutfit {
  items: ClothingItem[];
  date: string;
}

export default function OutfitMakerComponent() {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [saveButtonText, setSaveButtonText] = useState("Save");
  const [showGallery, setShowGallery] = useState(false);

  // Responsive values
  const containerMaxWidth = useBreakpointValue({
    base: "100%",
    md: "768px",
    lg: "1024px",
  });

  const buttonSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const imageSize = useBreakpointValue({
    base: 16,
    md: 24,
  });

  // Split categories into two rows for desktop
  const topRowCategories = categories.filter(cat => 
    ['Tops', 'Jumpers', 'Trousers'].includes(cat.name)
  );
  const bottomRowCategories = categories.filter(cat => 
    !['Tops', 'Jumpers', 'Trousers'].includes(cat.name)
  );

  const handleAddItem = (item: ClothingItem) => {
    if (selectedItems.length >= 6) {
      return;
    }

    if (selectedItems.some((selected) => selected.name === item.name)) {
      return;
    }

    setSelectedItems((prev) => [...prev, item]);
  };

  const handleDeleteItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const currentCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );

  const handleSaveCollection = () => {
    if (selectedItems.length > 0) {
      const newOutfit: SavedOutfit = {
        items: [...selectedItems],
        date: new Date().toLocaleDateString(),
      };

      setSavedOutfits((prev) => [...prev, newOutfit]);
      setSelectedItems([]);
      setSaveButtonText("Saved!");

      setTimeout(() => {
        setSaveButtonText("Save");
      }, 1500);
    }
  };

  const handleCloseModal = () => {
    if (selectedItems.length === 0) {
      setSelectedCategory(categories[0].name);
    }
    setShowGallery(false);
  };

  const handleDeleteOutfit = (index: number) => {
    setSavedOutfits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditOutfit = (outfit: SavedOutfit) => {
    setSelectedItems(outfit.items);
    if (outfit.items.length > 0) {
      setSelectedCategory(outfit.items[0].category);
    }
    handleCloseModal();
  };

  const toggleGallery = () => {
    setShowGallery(prev => !prev);
  };

  return (
    <Box 
      flex={1} 
      bg="primary.200" 
      safeArea 
      alignItems="center" 
      pb={{ base: "100px", md: "80px" }}
    >
      <VStack 
        space={4} 
        w="100%" 
        maxW={containerMaxWidth} 
        px={{ base: 2, md: 4 }} 
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

        {/* Category Buttons - Two rows on both mobile and desktop */}
        <VStack space={2} w="100%" alignItems="center">
          {/* Top Row */}
          <HStack space={2} justifyContent="center" w="100%">
            {topRowCategories.map((category) => (
              <Button
                key={category.name}
                onPress={() => setSelectedCategory(category.name)}
                bg="primary.200"
                borderColor="primary.100"
                borderWidth={1}
                size={buttonSize}
                flex={{ base: 1, md: 0 }}
                minW={{ md: "150px" }}
                _text={{ 
                  color: selectedCategory === category.name ? "amber.400" : "primary.100",
                  fontSize: { base: "sm", md: "md" }
                }}
                _hover={{
                  borderColor: "amber.400",
                  _text: { color: "amber.400" },
                }}
                _focus={{
                  borderColor: "amber.400",
                  _text: { color: "amber.400" },
                  bg: "transparent",
                }}
                _pressed={{
                  bg: "transparent",
                }}
              >
                {category.name}
              </Button>
            ))}
          </HStack>

          {/* Bottom Row */}
          <HStack space={2} justifyContent="center" w="100%">
            {bottomRowCategories.map((category) => (
              <Button
                key={category.name}
                onPress={() => setSelectedCategory(category.name)}
                bg="primary.200"
                borderColor="primary.100"
                borderWidth={1}
                size={buttonSize}
                flex={{ base: 1, md: 0 }}
                minW={{ md: "150px" }}
                _text={{ 
                  color: selectedCategory === category.name ? "amber.400" : "primary.100",
                  fontSize: { base: "sm", md: "md" }
                }}
                _hover={{
                  borderColor: "amber.400",
                  _text: { color: "amber.400" },
                }}
                _focus={{
                  borderColor: "amber.400",
                  _text: { color: "amber.400" },
                  bg: "transparent",
                }}
                _pressed={{
                  bg: "transparent",
                }}
              >
                {category.name}
              </Button>
            ))}
          </HStack>
        </VStack>

        {/* Available Items Grid */}
        <Box w="100%" minH={{ base: "120px", md: "150px" }}>
          <Text 
            color="primary.100" 
            fontSize={{ base: "md", md: "lg" }} 
            fontWeight="semibold" 
            mb={2}
            textAlign="center"
          >
            Available {selectedCategory}
          </Text>
          <Box alignItems="center" w="100%">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              scrollIndicatorInsets={{ right: 1 }}
              minH={{ base: "100px", md: "120px" }}
              contentContainerStyle={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <HStack space={2} px={4} pb={2} justifyContent="center">
                {currentCategory?.subcategories.map((subcategory) =>
                  subcategory.items.map((item, index) => (
                    <Pressable
                      key={`${subcategory.name}-${index}`}
                      onPress={() =>
                        handleAddItem({
                          ...item,
                          category: selectedCategory,
                          subcategory: subcategory.name,
                        })
                      }
                    >
                      <Box 
                        p={2}
                        borderRadius="md"
                        alignItems="center"
                      >
                        <Image
                          source={{ uri: item.image }}
                          alt={item.name}
                          size={imageSize}
                          width={imageSize}
                          height={imageSize}
                        />
                        <Text
                          color="primary.100"
                          fontSize={{ base: "xs", md: "sm" }}
                          textAlign="center"
                          mt={1}
                        >
                          {item.name}
                        </Text>
                      </Box>
                    </Pressable>
                  ))
                )}
              </HStack>
            </ScrollView>
          </Box>
        </Box>

        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <Box w="100%" minH={{ base: "120px", md: "150px" }}>
            <Text
              color="primary.100"
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="semibold"
              mb={2}
              textAlign="center"
            >
              Your Selection
            </Text>
            <Box alignItems="center" w="100%">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                scrollIndicatorInsets={{ right: 1 }}
                minH={{ base: "100px", md: "120px" }}
                contentContainerStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <HStack space={2} px={4} pb={2} justifyContent="center">
                  {selectedItems.map((item, index) => (
                    <Box key={index} position="relative">
                      <Box 
                        p={2}
                        borderRadius="md"
                        alignItems="center"
                      >
                        <Image
                          source={{ uri: item.image }}
                          alt={item.name}
                          size={imageSize}
                          width={imageSize}
                          height={imageSize}
                        />
                        <Text
                          color="primary.100"
                          fontSize={{ base: "xs", md: "sm" }}
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
                          _icon: { color: "amber.400" },
                        }}
                        _focus={{
                          bg: "transparent",
                          _icon: { color: "amber.400" },
                        }}
                      />
                    </Box>
                  ))}
                </HStack>
              </ScrollView>
            </Box>
          </Box>
        )}

        {/* Save and View Collections Buttons */}
        <HStack 
          space={4} 
          w="100%" 
          justifyContent="center" 
          mt={4}
          flexDir={{ base: "column", md: "row" }}
        >
          <Button
            onPress={handleSaveCollection}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            size={buttonSize}
            _text={{ 
              color: "primary.100",
              fontSize: { base: "sm", md: "md" }
            }}
            _hover={{
              borderColor: "amber.400",
              _text: { color: "amber.400" },
            }}
            _focus={{
              borderColor: "primary.100",
              _text: { color: "primary.100" },
              bg: "transparent",
            }}
            _pressed={{
              bg: "primary.200",
            }}
            w={{ base: "100%", md: "45%" }}
            mb={{ base: 2, md: 0 }}
          >
            {saveButtonText}
          </Button>
          <Button
            onPress={toggleGallery}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            size={buttonSize}
            _text={{ 
              color: "primary.100",
              fontSize: { base: "sm", md: "md" }
            }}
            _hover={{
              borderColor: "amber.400",
              _text: { color: "amber.400" },
            }}
            _focus={{
              borderColor: "amber.400",
              _text: { color: "amber.400" },
              bg: "transparent",
            }}
            _pressed={{
              bg: "primary.200",
            }}
            w={{ base: "100%", md: "45%" }}
          >
            {showGallery ? 'Close Outfits' : 'View Outfits'}
          </Button>
        </HStack>

        {/* PopUpGallery */}
        <PopUpGallery
          mode="outfits"
          isOpen={showGallery}
          onClose={() => setShowGallery(false)}
          savedOutfits={savedOutfits}
          onEditOutfit={handleEditOutfit}
          onDeleteOutfit={handleDeleteOutfit}
        />
      </VStack>
    </Box>
  );
}
