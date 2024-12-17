"use client";

import { Box, Image, useBreakpointValue } from "native-base";
import { useState } from "react";
import MainContent from "../components/MainContent";
import PWAInstallPrompt from "../components/PWAInstallPrompt";
import logo from "/pwa-512x512.png";

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
        <Box
          position="absolute"
          top={isMobile ? "30%" : "50%"}
          left="50%"
          style={{ transform: "translate(-50%, -50%)" }}
          width={{ base: "80%", md: "50%", lg: "30%" }}
          maxW="400px"
          zIndex={1}
          bg="primary.100"
          p={6}
          borderRadius="xl"
          shadow="lg"
        >
          <Image
            source={{
              uri: logo
            }}
            alt="Inside My Closet Logo"
            width="100%"
            height="300px"
            resizeMode="contain"
          />
        </Box>
      )}

      <MainContent
        activeComponent={activeComponent}
        setActiveComponent={handleComponentChange}
      />
      {!activeComponent && <PWAInstallPrompt />}
    </Box>
  );
}
