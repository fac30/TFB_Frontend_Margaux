import { Box, VStack, HStack, Text, useToast, ScrollView, Image, IconButton, Pressable, Center } from "native-base";
import { useState } from "react";
import { CloseIcon } from "native-base";
import { categories } from "../data/categories";

interface ClothingItem {
  name: string;
  image: string;
  category: string;
  subcategory: string;
}

export default function OutfitMakerComponent() {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedSubcategory, setSelectedSubcategory] = useState(categories[0].subcategories[0].name);
  const toast = useToast();

  const handleAddItem = (item: ClothingItem) => {
    setSelectedItems(prev => [...prev, { ...item }]);
    toast.show({
      description: `Added ${item.name} to your outfit`,
      placement: "top",
      duration: 2000,
      bg: "primary.200",
      color: "primary.100",
    });
  };

  const handleDeleteItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
    toast.show({
      description: "Item removed from outfit",
      placement: "top",
      duration: 2000,
      bg: "primary.200",
      color: "primary.100",
    });
  };

  const currentCategory = categories.find(cat => cat.name === selectedCategory);
  const currentSubcategory = currentCategory?.subcategories.find(sub => sub.name === selectedSubcategory);

  // Group selected items by category
  const selectedTops = selectedItems.filter(item => item.category === "Tops");
  const selectedBottoms = selectedItems.filter(item => item.category === "Bottoms");
  const selectedShoes = selectedItems.filter(item => item.category === "Shoes");

  return (
    <Box 
      flex={1} 
      bg="primary.200" 
      safeArea 
      position="relative"
      h="100vh"
      display="flex"
      alignItems="center"
    >
      <VStack 
        space="2" 
        flex={1} 
        w="100%" 
        maxW="800px" 
        px="lg"
        py="2"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Text 
          fontSize="2xl" 
          fontWeight="bold" 
          color="primary.100" 
          textAlign="center"
          mb="2"
        >
          Outfit Maker
        </Text>

        {/* Category Selection */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} mb="2">
          <HStack space="4" justifyContent="center">
            {categories.map((category) => (
              <Pressable
                key={category.name}
                onPress={() => {
                  setSelectedCategory(category.name);
                  setSelectedSubcategory(category.subcategories[0].name);
                }}
              >
                <Box
                  bg={selectedCategory === category.name ? "primary.100" : "transparent"}
                  px="4"
                  py="1"
                  borderRadius="lg"
                >
                  <Text
                    color={selectedCategory === category.name ? "primary.200" : "primary.100"}
                    fontWeight="medium"
                    fontSize="lg"
                  >
                    {category.name}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>

        {/* Items Grid */}
        <Box flex={1} w="100%" mb={selectedItems.length > 0 ? 16 : 0}>
          <ScrollView>
            <Box 
              flexDirection="row" 
              flexWrap="wrap" 
              justifyContent="center"
              py="2"
            >
              {currentSubcategory?.items.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleAddItem({
                    ...item,
                    category: selectedCategory,
                    subcategory: selectedSubcategory
                  })}
                >
                  <Box
                    m="1"
                    p="1"
                  >
                    <Image
                      source={{ uri: item.image }}
                      alt={item.name}
                      size="lg"
                      width={20}
                      height={20}
                    />
                    <Text
                      color="primary.100"
                      fontSize="sm"
                      textAlign="center"
                      mt="1"
                    >
                      {item.name}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </Box>
          </ScrollView>
        </Box>
      </VStack>

      {/* Selected Items Display */}
      {selectedItems.length > 0 && (
        <Box 
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="primary.200"
          py="2"
          px="4"
        >
          <Center>
            <HStack space="4" justifyContent="center" alignItems="flex-end">
              {/* Tops Section */}
              {selectedTops.map((item, index) => (
                <Box key={index} position="relative">
                  <Image
                    source={{ uri: item.image }}
                    alt={item.name}
                    size="lg"
                    width={20}
                    height={20}
                  />
                  <IconButton
                    position="absolute"
                    top={-2}
                    right={-2}
                    size="sm"
                    icon={<CloseIcon size="xs" color="primary.100" />}
                    onPress={() => handleDeleteItem(selectedItems.indexOf(item))}
                    bg="primary.200"
                    _hover={{
                      bg: "primary.300"
                    }}
                    rounded="full"
                  />
                </Box>
              ))}

              {/* Bottoms Section */}
              {selectedBottoms.map((item, index) => (
                <Box key={index} position="relative">
                  <Image
                    source={{ uri: item.image }}
                    alt={item.name}
                    size="lg"
                    width={20}
                    height={20}
                  />
                  <IconButton
                    position="absolute"
                    top={-2}
                    right={-2}
                    size="sm"
                    icon={<CloseIcon size="xs" color="primary.100" />}
                    onPress={() => handleDeleteItem(selectedItems.indexOf(item))}
                    bg="primary.200"
                    _hover={{
                      bg: "primary.300"
                    }}
                    rounded="full"
                  />
                </Box>
              ))}

              {/* Shoes Section */}
              {selectedShoes.map((item, index) => (
                <Box key={index} position="relative">
                  <Image
                    source={{ uri: item.image }}
                    alt={item.name}
                    size="lg"
                    width={20}
                    height={20}
                  />
                  <IconButton
                    position="absolute"
                    top={-2}
                    right={-2}
                    size="sm"
                    icon={<CloseIcon size="xs" color="primary.100" />}
                    onPress={() => handleDeleteItem(selectedItems.indexOf(item))}
                    bg="primary.200"
                    _hover={{
                      bg: "primary.300"
                    }}
                    rounded="full"
                  />
                </Box>
              ))}
            </HStack>
          </Center>
        </Box>
      )}
    </Box>
  );
}
