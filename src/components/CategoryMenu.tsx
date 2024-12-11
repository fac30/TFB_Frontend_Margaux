import { Box, Text, Pressable, Image, ScrollView, VStack, HStack } from "native-base";
import { useState } from "react";
import { categories } from "../data/categories";

interface ClothingItem {
  name: string;
  image: string;
  category: string;
  subcategory: string;
}

interface CategoryMenuProps {
  categories: typeof categories;
  onSelectItem: (item: ClothingItem) => void;
}

export default function CategoryMenu({ categories, onSelectItem }: CategoryMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedSubcategory, setSelectedSubcategory] = useState(categories[0].subcategories[0].name);

  const currentCategory = categories.find(cat => cat.name === selectedCategory);
  const currentSubcategory = currentCategory?.subcategories.find(sub => sub.name === selectedSubcategory);

  return (
    <VStack 
      space={4} 
      bg="primary.200" 
      borderColor="primary.100"
      borderWidth={1}
      borderRadius="md"
      p={4}
      h="100%"
    >
      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space={2}>
          {categories.map((category) => (
            <Pressable
              key={category.name}
              onPress={() => {
                setSelectedCategory(category.name);
                setSelectedSubcategory(category.subcategories[0].name);
              }}
            >
              <Box
                bg={selectedCategory === category.name ? "primary.100" : "primary.200"}
                px={4}
                py={2}
                borderRadius="md"
                borderWidth={1}
                borderColor="primary.100"
              >
                <Text
                  color={selectedCategory === category.name ? "primary.200" : "primary.100"}
                  fontWeight="medium"
                >
                  {category.name}
                </Text>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>

      {/* Subcategories */}
      {currentCategory && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space={2}>
            {currentCategory.subcategories.map((subcategory) => (
              <Pressable
                key={subcategory.name}
                onPress={() => setSelectedSubcategory(subcategory.name)}
              >
                <Box
                  bg={selectedSubcategory === subcategory.name ? "primary.100" : "primary.200"}
                  px={4}
                  py={2}
                  borderRadius="md"
                  borderWidth={1}
                  borderColor="primary.100"
                >
                  <Text
                    color={selectedSubcategory === subcategory.name ? "primary.200" : "primary.100"}
                    fontWeight="medium"
                  >
                    {subcategory.name}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      )}

      {/* Items Grid */}
      <ScrollView flex={1}>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
        >
          {currentSubcategory?.items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => onSelectItem({
                ...item,
                category: selectedCategory,
                subcategory: selectedSubcategory
              })}
            >
              <Box
                m={2}
                p={2}
                borderWidth={1}
                borderColor="primary.100"
                borderRadius="md"
                bg="primary.200"
                _hover={{ opacity: 0.8 }}
              >
                <Image
                  source={{ uri: item.image }}
                  alt={item.name}
                  size="md"
                  width="100px"
                  height="100px"
                  resizeMode="contain"
                />
                <Text
                  color="primary.100"
                  fontSize="sm"
                  textAlign="center"
                  mt={2}
                >
                  {item.name}
                </Text>
              </Box>
            </Pressable>
          ))}
        </Box>
      </ScrollView>
    </VStack>
  );
}
