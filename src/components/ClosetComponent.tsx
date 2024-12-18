import { useState } from 'react';
import { Box, Text, VStack, HStack } from "native-base";
import { useWindowDimensions, TouchableOpacity } from "react-native";
import PopUpGallery from "./popUpGallery";
import CameraFunctionality from "./CameraFunctionality";

export default function ClosetComponent() {
  const { width } = useWindowDimensions();

  // State to control the pop-up gallery
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [galleryLinks, setGalleryLinks] = useState<string[]>([]);

  // Sample data for demonstration
  const topsGalleryLinks = [
    "https://example.com/top1.jpg",
    "https://example.com/top2.jpg",
  ];

  const jumpersGalleryLinks = [
    "https://example.com/jumper1.jpg",
    "https://example.com/jumper2.jpg",
  ];

  const dressesGalleryLinks = [
    "https://example.com/dress1.jpg",
    "https://example.com/dress2.jpg",
  ];

  const jacketsGalleryLinks = [
    "https://example.com/jacket1.jpg",
    "https://example.com/jacket2.jpg",
  ];

  const trousersGalleryLinks = [
    "https://example.com/trouser1.jpg",
    "https://example.com/trouser2.jpg",
  ];

  const openGallery = (category: string) => {
    setSelectedCategory(category);
    switch (category) {
      case "Tops":
        setGalleryLinks(topsGalleryLinks);
        break;
      case "Jumpers":
        setGalleryLinks(jumpersGalleryLinks);
        break;
      case "Dresses/Skirts":
        setGalleryLinks(dressesGalleryLinks);
        break;
      case "Jackets/Coats":
        setGalleryLinks(jacketsGalleryLinks);
        break;
      case "Trousers":
        setGalleryLinks(trousersGalleryLinks);
        break;
      default:
        setGalleryLinks([]);
    }
    setModalVisible(true);
  };

  const closeGallery = () => {
    setModalVisible(false);
    setSelectedCategory(null);
    setGalleryLinks([]);
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
      {/* Title */}
      <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" color="#395D51" mb={4} style={{ textTransform: "uppercase", letterSpacing: 1 }}>
        my closet
      </Text>
    <CameraFunctionality />
      {/* Wardrobe Container */}
      <VStack borderWidth={8} space={0} width="100%" borderColor="#5E5E5E" bg="#FFFFFF">
        {/* Top Row */}
        <HStack space={0} width="100%" height="20%">
          <Box flex={1} bg="#FFFFFF" justifyContent="center" alignItems="center" borderRightWidth={6} borderBottomWidth={6} borderColor="#5E5E5E">
            <TouchableOpacity onPress={() => openGallery("Tops")}>
              <Text color="#4A4A4A" fontSize="sm" textAlign="center">tops</Text>
            </TouchableOpacity>
          </Box>
          <Box flex={1} bg="#FFFFFF" justifyContent="center" alignItems="center" borderBottomWidth={6} borderColor="#5E5E5E">
            <TouchableOpacity onPress={() => openGallery("Jumpers")}>
              <Text color="#4A4A4A" fontSize="sm" textAlign="center">jumpers</Text>
            </TouchableOpacity>
          </Box>
        </HStack>

        {/* Middle Row */}
        <HStack space={0} width="100%">
          {/* Dresses/Skirts Section */}
          <VStack flex={1} height="250px" borderRightWidth={6} borderColor="#5E5E5E">
            <Box flex={2} bg="#FFFFFF" justifyContent="center" alignItems="center" borderColor="#5E5E5E">
              <TouchableOpacity onPress={() => openGallery("Dresses/Skirts")}>
                <Text color="#4A4A4A" fontSize="sm" textAlign="center">dresses/ skirts</Text>
              </TouchableOpacity>
              <Box position="absolute" bottom={160} height="4px" width="100%" bg="#B0B0B0"></Box>
            </Box>

            {/* Drawer Section */}
            <Box flex={0.6} bg="#5E5E5E" borderTopWidth={6} borderColor="#5E5E5E" position="relative">
              {/* Drawer Handles */}
              <Box position="absolute" top="15%" height="2px" width="80%" bg="#FFFFFF" alignSelf="center"></Box>
              <Box position="absolute" top="35%" height="2px" width="80%" bg="#FFFFFF" alignSelf="center"></Box>
              <Box position="absolute" top="55%" height="2px" width="80%" bg="#FFFFFF" alignSelf="center"></Box>
              <Box position="absolute" top="75%" height="2px" width="80%" bg="#FFFFFF" alignSelf="center"></Box>
            </Box>
          </VStack>

          {/* Jackets/Coats Section */}
          <Box flex={1} height="250px" bg="#FFFFFF" justifyContent="center" alignItems="center" borderBottomWidth={2} borderColor="#5E5E5E">
            <TouchableOpacity onPress={() => openGallery("Jackets/Coats")}>
              <Text color="#4A4A4A" fontSize="sm" textAlign="center">jackets/ coats</Text>
            </TouchableOpacity>
            <Box position="absolute" bottom={232} height="4px" width="100%" bg="#B0B0B0"></Box>
          </Box>
        </HStack>

        {/* Bottom Row */}
        <Box height="90px" bg="#FFFFFF" justifyContent="center" alignItems="center" borderTopWidth={3} borderColor="#5E5E5E">
          <TouchableOpacity onPress={() => openGallery("Trousers")}>
            <Text color="#4A4A4A" fontSize="sm" textAlign="center">trousers</Text>
          </TouchableOpacity>
        </Box>

        {/* Bottom Drawer Lines */}
        <Box width="100%" height="130px" borderTopWidth={4} borderColor="#5E5E5E" position="relative"></Box>
      </VStack>

      {/* PopUpGallery Component */}
      {isModalVisible && (
        <PopUpGallery
          isVisible={isModalVisible}
          onClose={closeGallery}
          sectionName={selectedCategory || ""}
          galleryLinks={galleryLinks}
        />
      )}
    </Box>
  );
}


