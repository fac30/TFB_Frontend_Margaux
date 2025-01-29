import {
  Box,
  Text,
  Pressable,
  Image,
  ScrollView,
  VStack,
  HStack,
} from "native-base";
import { useState } from "react";
import { CategoryMenuProps } from "../utils/types";

export default function CategoryMenu({
  categories,
  onSelectItem,
}: CategoryMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    categories[0].subcategories[0].name
  );

  const currentCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );
  const currentSubcategory = currentCategory?.subcategories.find(
    (sub) => sub.name === selectedSubcategory
  );

  return (
    <VStack
      space={2}
      bg="primary.200"
      borderColor="primary.100"
      borderWidth={1}
      borderRadius="md"
      h="100%"
    >
      {/* Categories */}
      <Box p={2} borderBottomWidth={1} borderBottomColor="primary.100">
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
                  bg={
                    selectedCategory === category.name
                      ? "primary.100"
                      : "primary.200"
                  }
                  px={3}
                  py={1}
                  borderRadius="md"
                  borderWidth={1}
                  borderColor="primary.100"
                >
                  <Text
                    color={
                      selectedCategory === category.name
                        ? "primary.200"
                        : "primary.100"
                    }
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    {category.name}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      </Box>

      {/* Subcategories */}
      {currentCategory && (
        <Box p={2} borderBottomWidth={1} borderBottomColor="primary.100">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={2}>
              {currentCategory.subcategories.map((subcategory) => (
                <Pressable
                  key={subcategory.name}
                  onPress={() => setSelectedSubcategory(subcategory.name)}
                >
                  <Box
                    bg={
                      selectedSubcategory === subcategory.name
                        ? "primary.100"
                        : "primary.200"
                    }
                    px={3}
                    py={1}
                    borderRadius="md"
                    borderWidth={1}
                    borderColor="primary.100"
                  >
                    <Text
                      color={
                        selectedSubcategory === subcategory.name
                          ? "primary.200"
                          : "primary.100"
                      }
                      fontWeight="medium"
                      fontSize="sm"
                    >
                      {subcategory.name}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>
        </Box>
      )}

      {/* Items Grid */}
      <ScrollView flex={1} p={2}>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
        >
          {currentSubcategory?.items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                onSelectItem({
                  ...item,
                  category: selectedCategory,
                  subcategory: selectedSubcategory,
                })
              }
            >
              <Box
                m={1}
                p={2}
                borderWidth={1}
                borderColor="primary.100"
                borderRadius="md"
                bg="primary.200"
              >
                <Image
                  source={{ uri: item.image }}
                  alt={item.name}
                  size="sm"
                  width="80px"
                  height="80px"
                  resizeMode="contain"
                />
                <Text
                  color="primary.100"
                  fontSize="xs"
                  textAlign="center"
                  mt={1}
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
