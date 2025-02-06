import { useState } from "react";
import { Box, Text, VStack, HStack } from "native-base";
import { useWindowDimensions, TouchableOpacity } from "react-native";
import PopUpGallery from "./popUpGallery";
import { filterItemsByCategory } from "../functions/getFunction"; // Import the function to fetch items
import { Category } from "../utils/types"; // Add this import

export default function ClosetComponent() {
  const { width } = useWindowDimensions();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [galleryItems, setGalleryItems] = useState<
    { photo_link: string; item_desc: string }[]
  >([]); // State to hold gallery items

  // Define categories with their IDs
  const categories: Category[] = [
    { id: 1, name: "Tops" },
    { id: 2, name: "Jumpers" },
    { id: 3, name: "Trousers" },
    { id: 4, name: "Dresses/Skirts" },
    { id: 5, name: "Jackets/Coats" },
  ];

  const openGallery = async (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName);
    if (category) {
      setSelectedCategory(category);
      setModalVisible(true);

      // Fetch items for the selected category
      const items = await filterItemsByCategory(category.id);
      setGalleryItems(items); // Set the fetched items to state
    }
  };

  const closeGallery = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      paddingX={width < 768 ? 4 : 16}
      maxWidth="1200px"
      marginX="auto"
    >
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color="#395D51"
        mb={4}
        style={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        my closet
      </Text>

      <VStack
        borderWidth={8}
        space={0}
        width="100%"
        borderColor="#5E5E5E"
        bg="#FFFFFF"
      >
        {/* Top Row */}
        <HStack space={0} width="100%" height="20%">
          <Box
            flex={1}
            bg="#FFFFFF"
            justifyContent="center"
            alignItems="center"
            borderRightWidth={6}
            borderBottomWidth={6}
            borderColor="#5E5E5E"
          >
            <TouchableOpacity onPress={() => openGallery("Tops")}>
              <Text color="#4A4A4A" fontSize="sm" textAlign="center">
                tops
              </Text>
            </TouchableOpacity>
          </Box>
          <Box
            flex={1}
            bg="#FFFFFF"
            justifyContent="center"
            alignItems="center"
            borderBottomWidth={6}
            borderColor="#5E5E5E"
          >
            <TouchableOpacity onPress={() => openGallery("Jumpers")}>
              <Text color="#4A4A4A" fontSize="sm" textAlign="center">
                jumpers
              </Text>
            </TouchableOpacity>
          </Box>
        </HStack>

        {/* Middle Row */}
        <HStack space={0} width="100%">
          <VStack
            flex={1}
            height="250px"
            borderRightWidth={6}
            borderColor="#5E5E5E"
          >
            <Box
              flex={2}
              bg="#FFFFFF"
              justifyContent="center"
              alignItems="center"
              borderColor="#5E5E5E"
            >
              <TouchableOpacity onPress={() => openGallery("Dresses/Skirts")}>
                <Text color="#4A4A4A" fontSize="sm" textAlign="center">
                  dresses/ skirts
                </Text>
              </TouchableOpacity>
              <Box
                position="absolute"
                bottom={160}
                height="4px"
                width="100%"
                bg="#B0B0B0"
              ></Box>
            </Box>

            <Box
              flex={0.6}
              bg="#5E5E5E"
              borderTopWidth={6}
              borderColor="#5E5E5E"
              position="relative"
            >
              {/* Drawer Handles */}
              <Box
                position="absolute"
                top="15%"
                height="2px"
                width="80%"
                bg="#FFFFFF"
                alignSelf="center"
              ></Box>
              <Box
                position="absolute"
                top="35%"
                height="2px"
                width="80%"
                bg="#FFFFFF"
                alignSelf="center"
              ></Box>
              <Box
                position="absolute"
                top="55%"
                height="2px"
                width="80%"
                bg="#FFFFFF"
                alignSelf="center"
              ></Box>
              <Box
                position="absolute"
                top="75%"
                height="2px"
                width="80%"
                bg="#FFFFFF"
                alignSelf="center"
              ></Box>
            </Box>
          </VStack>

          <Box
            flex={1}
            height="250px"
            bg="#FFFFFF"
            justifyContent="center"
            alignItems="center"
            borderBottomWidth={2}
            borderColor="#5E5E5E"
          >
            <TouchableOpacity onPress={() => openGallery("Jackets/Coats")}>
              <Text color="#4A4A4A" fontSize="sm" textAlign="center">
                jackets/ coats
              </Text>
            </TouchableOpacity>
            <Box
              position="absolute"
              bottom={232}
              height="4px"
              width="100%"
              bg="#B0B0B0"
            ></Box>
          </Box>
        </HStack>

        {/* Bottom Row */}
        <Box
          height="90px"
          bg="#FFFFFF"
          justifyContent="center"
          alignItems="center"
          borderTopWidth={3}
          borderColor="#5E5E5E"
        >
          <TouchableOpacity onPress={() => openGallery("Trousers")}>
            <Text color="#4A4A4A" fontSize="sm" textAlign="center">
              trousers
            </Text>
          </TouchableOpacity>
        </Box>

        <Box
          width="100%"
          height="130px"
          borderTopWidth={4}
          borderColor="#5E5E5E"
          position="relative"
        ></Box>
      </VStack>

      {/* PopUpGallery Component */}
      {isModalVisible && selectedCategory && (
        <PopUpGallery
          isVisible={isModalVisible}
          onClose={closeGallery}
          sectionName={selectedCategory.name}
          galleryLinks={galleryItems} // Pass the fetched items here
        />
      )}
    </Box>
  );
}
