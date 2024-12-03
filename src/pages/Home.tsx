"use client";

import { Box, Button, VStack, HStack, Text } from "native-base";
import { useState } from "react";
import ClosetComponent from "../components/ClosetComponent";
import WardrobeComponent from "../components/OutfitMakerCompnent";
import EcoAdviceComponent from "../components/EcoAdviceComponent";

export default function Home() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState("Component1");

  // Components to render conditionally
  const renderComponent = () => 
    activeComponent === "Component1" ? (
      <ClosetComponent/>
    ) : activeComponent === "Component2" ? (
      <WardrobeComponent/>
    ) : activeComponent === "Component3" ? (
      <EcoAdviceComponent/>
    ) : (
      <Text>Component 1</Text>
    );

  return (
    <Box w="100%" h="100vh" bg="white" safeArea>
      <VStack space={4} flex={1} justifyContent="center" alignItems="center">
        {renderComponent()}
      </VStack>

      {/* Navbar at the bottom */}
      <HStack
        w="100%"
        position="absolute"
        bottom={0}
        bg="blue.500"
        justifyContent="space-around"
        p={4}
      >
        <Button
          onPress={() => setActiveComponent("Component1")}
          colorScheme="light"
          variant={activeComponent === "Component1" ? "solid" : "outline"}
        >
          Button 1
        </Button>
        <Button
          onPress={() => setActiveComponent("Component2")}
          colorScheme="light"
          variant={activeComponent === "Component2" ? "solid" : "outline"}
        >
          Button 2
        </Button>
        <Button
          onPress={() => setActiveComponent("Component3")}
          colorScheme="light"
          variant={activeComponent === "Component3" ? "solid" : "outline"}
        >
          Button 3
        </Button>
      </HStack>
    </Box>
  );
}
