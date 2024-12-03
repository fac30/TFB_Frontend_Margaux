"use client";

import { Box, Button, VStack, Text } from "native-base";
import { useState } from "react";
import MainContent from "../components/MainContent";

export default function Home() {
  // State to track if the user has entered
  const [hasEntered, setHasEntered] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Component1");

  return (
    <Box w="100%" h="100vh" bg="white" safeArea justifyContent="center" alignItems="center">
      {hasEntered ? (
        <MainContent activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      ) : (
        <VStack space={4} flex={1} justifyContent="center" alignItems="center">
          <Text fontSize="2xl" mb={4}>
            Welcome to Inside My Closet!
          </Text>
          <Button onPress={() => setHasEntered(true)} colorScheme="blue">
            Enter
          </Button>
        </VStack>
      )}
    </Box>
  );
}
