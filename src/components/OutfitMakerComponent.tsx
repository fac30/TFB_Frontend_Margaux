import { Box, VStack, HStack, Text, useToast, ScrollView } from "native-base";
import { useState } from "react";
import Canvas from "./Canvas";
import CategoryMenu from "./CategoryMenu";
import { categories } from "../data/categories";

interface ClothingItem {
  name: string;
  image: string;
  category: string;
  subcategory: string;
}

export default function OutfitMakerComponent() {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const toast = useToast();

  const handleAddItem = (item: ClothingItem) => {
    setSelectedItems(prev => [...prev, { ...item }]);
    toast.show({
      description: `Added ${item.name} to your outfit`,
      placement: "top",
      duration: 2000,
      bg: "primary.200",
      color: "primary.100"
    });
  };

  const handleDeleteItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
    toast.show({
      description: "Item removed from outfit",
      placement: "top",
      duration: 2000,
      bg: "primary.200",
      color: "primary.100"
    });
  };

  return (
    <Box 
      flex={1} 
      bg="primary.200" 
      safeArea 
      p={4}
    >
      <VStack flex={1} space={4}>
        <Text 
          fontSize="2xl" 
          fontWeight="bold" 
          color="primary.100" 
          textAlign="center"
        >
          Outfit Maker
        </Text>

        <ScrollView flex={1}>
          <HStack 
            space={4} 
            alignItems="flex-start"
            flexDirection={{ base: "column", md: "row" }}
          >
            {/* Left side - Category Menu */}
            <Box 
              w={{ base: "100%", md: "30%" }}
              mb={{ base: 4, md: 0 }}
            >
              <CategoryMenu 
                categories={categories} 
                onSelectItem={handleAddItem} 
              />
            </Box>

            {/* Right side - Canvas */}
            <Box 
              w={{ base: "100%", md: "70%" }}
              minH="70vh"
            >
              <Canvas 
                items={selectedItems}
                onDeleteItem={handleDeleteItem}
              />
            </Box>
          </HStack>
        </ScrollView>
      </VStack>
    </Box>
  );
}
