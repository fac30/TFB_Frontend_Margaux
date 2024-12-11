"use client";

import { Box, VStack, Image, Pressable } from "native-base";
import { useState } from "react";
import MainContent from "../components/MainContent";
import logo from "../assets/images/logo.svg";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeComponent, setActiveComponent] = useState("");

  return (
    <Box
      w="100%"
      h="100vh"
      bg="primary.200"
      safeArea
      justifyContent="center"
      alignItems="center"
    >
      {hasEntered ? (
        <MainContent
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
      ) : (
        <VStack
          space={4}
          flex={1}
          justifyContent="center"
          alignItems="center"
          bg="primary.200"
          p={6}
        >
          <Pressable
            onPress={() => setHasEntered(true)}
            _hover={{ opacity: 0.8 }}
          >
            <Image
              source={{
                uri: logo,
              }}
              alt="Inside My Closet Logo"
              size="2xl"
            />
          </Pressable>
        </VStack>
      )}
    </Box>
  );
}
