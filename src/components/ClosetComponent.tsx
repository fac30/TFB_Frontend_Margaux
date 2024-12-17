import { Box, Text, VStack, HStack } from "native-base";
import { useWindowDimensions } from "react-native";
import CameraFunctionality from "../components/CameraFunctionality";

export default function ClosetComponent() {
  const { width } = useWindowDimensions();

  // Adjust container styles for responsiveness
  const containerStyle = {
    paddingX: width < 768 ? 4 : 16, // Small padding on mobile, larger on desktop
    maxWidth: "1200px",
    marginX: "auto",
  };

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      {...containerStyle}
    >
      {/* Title */}
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color="#395D51"
        mb={4}
        style={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        <CameraFunctionality />
        my closet
      </Text>

      {/* Wardrobe Container */}
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
            <Text color="#4A4A4A" fontSize="sm" textAlign="center">
              tops
            </Text>
          </Box>
          <Box
            flex={1}
            bg="#FFFFFF"
            justifyContent="center"
            alignItems="center"
            borderBottomWidth={6}
            borderColor="#5E5E5E"
          >
            <Text color="#4A4A4A" fontSize="sm" textAlign="center">
              jumpers
            </Text>
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
              bg="#FFFFFF"
              justifyContent="center"
              alignItems="center"
              borderColor="#5E5E5E"
            >
              <Text color="#4A4A4A" fontSize="sm" textAlign="center">
                dresses/ skirts
              </Text>
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
              flex={0.6} // Remaining space for the drawer
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
            bg="#FFFFFF"
            justifyContent="center"
            alignItems="center"
            borderBottomWidth={2}
            borderColor="#5E5E5E"
          >
            <Text color="#4A4A4A" fontSize="sm" textAlign="center">
              jackets/ coats
            </Text>
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
          <Text color="#4A4A4A" fontSize="sm" textAlign="center">
            trousers
          </Text>
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
    </Box>
  );
}


