
import { useState } from "react";
import { Box, Text, VStack, HStack, Button } from "native-base";
import { useWindowDimensions } from "react-native";
import PopUpGallery from "./PopUpGallery";


export default function ClosetComponent() {
  const { width } = useWindowDimensions();

  // State to control the pop-up gallery
  const [modalVisible, setModalVisible] = useState(false);
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
    let links: string[] = [];
    
    switch (category) {
      case "Tops":
        links = topsGalleryLinks;
        break;
      case "Jumpers":
        links = jumpersGalleryLinks;
        break;
      case "Dresses/Skirts":
        links = dressesGalleryLinks;
        break;
      case "Jackets/Coats":
        links = jacketsGalleryLinks;
        break;
      case "Trousers":
        links = trousersGalleryLinks;
        break;
      default:
        links = [];
    }
    
    setGalleryLinks(links);
    setModalVisible(true);
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
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color="#395D51"
        mb={4}
        style={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        my closet
      </Text>
    <CameraFunctionality />
      {/* Wardrobe Container */}
      <VStack
        borderWidth={8}
        space={0}
        width="100%"
        borderColor="#5E5E5E"
        bg="primary.200"
      >
        {/* Top Row */}
        <HStack space={0} width="100%" height="20%">
          <Box
            flex={1}
            bg="primary.200"
            justifyContent="center"
            alignItems="center"
            borderRightWidth={6}
            borderBottomWidth={6}
            borderColor="#5E5E5E"
          >
            <Button
              bg="primary.200"
              _text={{ color: "primary.100" }}
              borderWidth={0}
              _hover={{
                _text: { color: "amber.400" },
              }}
              _focus={{
                bg: "primary.200",
                _text: { color: "primary.100" },
              }}
              onPress={() => openGallery("Tops")}
            >
              tops
            </Button>
          </Box>
          <Box
            flex={1}
            bg="primary.200"
            justifyContent="center"
            alignItems="center"
            borderBottomWidth={6}
            borderColor="#5E5E5E"
          >
            <Button
              bg="primary.200"
              _text={{ color: "primary.100" }}
              borderWidth={0}
              _hover={{
                _text: { color: "amber.400" },
              }}
              _focus={{
                bg: "primary.200",
                _text: { color: "primary.100" },
              }}
              onPress={() => openGallery("Jumpers")}
            >
              jumpers
            </Button>
          </Box>
        </HStack>

        {/* Middle Row */}
        <HStack space={0} width="100%">
          {/* Dresses/Skirts Section */}
          <VStack
            flex={1}
            height="250px"
            borderRightWidth={6}
            borderColor="#5E5E5E"
          >
            <Box
              flex={2}
              bg="primary.200"
              justifyContent="center"
              alignItems="center"
              borderColor="#5E5E5E"
            >
              <Button
                bg="primary.200"
                _text={{ color: "primary.100" }}
                borderWidth={0}
                _hover={{
                  _text: { color: "amber.400" },
                }}
                _focus={{
                  bg: "primary.200",
                  _text: { color: "primary.100" },
                }}
                onPress={() => openGallery("Dresses/Skirts")}
              >
                dresses/ skirts
              </Button>
              <Box
                position="absolute"
                bottom={160}
                height="4px"
                width="100%"
                bg="#B0B0B0"
              ></Box>
            </Box>

            {/* Drawer Section */}
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

          {/* Jackets/Coats Section */}
          <Box
            flex={1}
            height="250px"
            bg="primary.200"
            justifyContent="center"
            alignItems="center"
            borderBottomWidth={2}
            borderColor="#5E5E5E"
          >
            <Button
              bg="primary.200"
              _text={{ color: "primary.100" }}
              borderWidth={0}
              _hover={{
                _text: { color: "amber.400" },
              }}
              _focus={{
                bg: "primary.200",
                _text: { color: "primary.100" },
              }}
              onPress={() => openGallery("Jackets/Coats")}
            >
              jackets/ coats
            </Button>
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
          bg="primary.200"
          justifyContent="center"
          alignItems="center"
          borderTopWidth={3}
          borderColor="#5E5E5E"
        >
          <Button
            bg="primary.200"
            _text={{ color: "primary.100" }}
            borderWidth={0}
            _hover={{
              _text: { color: "amber.400" },
            }}
            _focus={{
              bg: "primary.200",
              _text: { color: "primary.100" },
            }}
            onPress={() => openGallery("Trousers")}
          >
            trousers
          </Button>
        </Box>

        {/* Bottom Drawer Lines */}
        <Box
          width="100%"
          height="130px"
          borderTopWidth={4}
          borderColor="#5E5E5E"
          position="relative"
        ></Box>
      </VStack>

      {/* PopUpGallery Component */}
      <PopUpGallery
        mode="category"
        title={`${selectedCategory || ''} Items`}
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedCategory(null);
          setGalleryLinks([]);
        }}
        categoryItems={galleryLinks.map(link => ({
          name: selectedCategory || "",
          image: link,
          category: selectedCategory || ""
        }))}
      />
    </Box>
  );
}
