import { Box, Image, useBreakpointValue, VStack } from "native-base";
import { useState } from "react";
import MainContent from "../components/MainContent";
import PWAInstallPrompt from "../components/PWAInstallPrompt";
import logo from "/pwa-512x512.png";
import CameraFunctionality from "../components/CameraFunctionality";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleComponentChange = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <Box
      w="100%"
      h="100vh"
      bg="primary.200"
      safeArea
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      {!activeComponent && (
        <VStack
          position="absolute"
          top={isMobile ? "30%" : "50%"}
          left="50%"
          style={{ transform: "translate(-50%, -50%)" }}
          width={{ base: "80%", md: "50%", lg: "30%" }}
          maxW="400px"
          zIndex={1}
          space={4}
        >
          {/* Logo on green background */}
          <Box 
            bg="primary.100" 
            p={4} 
            borderRadius="xl"
            position="relative"
            shadow="lg"
          >
            <Image
              source={{
                uri: logo
              }}
              alt="Inside My Closet Logo"
              width="100%"
              height="200px"
              resizeMode="contain"
            />
          </Box>

          {/* Upload button below */}
          <CameraFunctionality />
        </VStack>
      )}

      <MainContent
        activeComponent={activeComponent}
        setActiveComponent={handleComponentChange}
      />
      {!activeComponent && <PWAInstallPrompt />}
    </Box>
  );
}