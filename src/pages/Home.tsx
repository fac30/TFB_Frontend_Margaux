"use client";

import { Box } from "native-base";
import { useState } from "react";
import MainContent from "../components/MainContent";
import PWAInstallPrompt from "../components/PWAInstallPrompt";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("");

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
      <MainContent
        activeComponent={activeComponent}
        setActiveComponent={handleComponentChange}
      />
      {!activeComponent && <PWAInstallPrompt centered />}
    </Box>
  );
}
