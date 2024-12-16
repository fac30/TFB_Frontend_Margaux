import { Box, Text, VStack, HStack } from "native-base";
import { useWindowDimensions } from "react-native";

export default function ClosetComponent() {
  const { width } = useWindowDimensions();

  // Adjust container styles for responsiveness
  const containerStyle = {
    paddingX: width < 768 ? 4 : 16, // Small padding on mobile, larger on desktop
    maxWidth: "1200px", // Prevent content from becoming too wide
    marginX: "auto",
  };

  return (
    <Box
      flex={1}
      bg="#F2F1E6"
      justifyContent="center"
      alignItems="center"
      {...containerStyle}
    >
      {/* Title */}
      <Text
        fontSize={{ base: "2xl", md: "4xl" }} 
        fontWeight="bold"
        color="#395D51"
        mb={6}
      >
        MY CLOSET
      </Text>

      {/* Closet Grid */}
      <VStack
        space={4}
        width="100%"
        maxWidth={{ base: "800px", md: "1000px" }} 
      >
        {/* Top Row: Tops & Jumpers */}
        <HStack
          space={4}
          width="100%"
          flex={{ base: 1, md: 1 }} 
        >
          <Box
            flex={1}
            height={{ base: "100px", md: "150px" }}
            bg="#5E5E5E"
            justifyContent="center"
            alignItems="center"
            borderRadius={4}
          >
            <Text color="white" fontSize={{ base: "md", md: "lg" }}>
              TOPS
            </Text>
          </Box>
          <Box
            flex={1}
            height={{ base: "100px", md: "150px" }}
            bg="#5E5E5E"
            justifyContent="center"
            alignItems="center"
            borderRadius={4}
          >
            <Text color="white" fontSize={{ base: "md", md: "lg" }}>
              JUMPERS
            </Text>
          </Box>
        </HStack>

        {/* Middle Row: Dresses/Skirts & Jackets/Coats */}
        <HStack
          space={4}
          width="100%"
          flex={{ base: 2, md: 1.5 }} 
        >
          <Box
            flex={1}
            height={{ base: "200px", md: "250px" }}
            bg="#5E5E5E"
            justifyContent="center"
            alignItems="center"
            borderRadius={4}
          >
            <Text
              color="white"
              fontSize={{ base: "md", md: "lg" }}
              textAlign="center"
            >
              DRESSES/ SKIRTS
            </Text>
          </Box>
          <Box
            flex={1}
            height={{ base: "200px", md: "250px" }}
            bg="#5E5E5E"
            justifyContent="center"
            alignItems="center"
            borderRadius={4}
          >
            <Text
              color="white"
              fontSize={{ base: "md", md: "lg" }}
              textAlign="center"
            >
              JACKETS/ COATS
            </Text>
          </Box>
        </HStack>

        {/* Bottom Row: Trousers */}
        <Box
          width="100%"
          height={{ base: "100px", md: "150px" }} 
          bg="#5E5E5E"
          justifyContent="center"
          alignItems="center"
          borderRadius={4}
        >
          <Text color="white" fontSize={{ base: "md", md: "lg" }}>
            TROUSERS
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
