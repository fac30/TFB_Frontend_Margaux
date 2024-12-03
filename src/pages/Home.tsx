"use client";

import { Box, Heading, VStack, Image } from "native-base";

export default function Home() {
  return (
    <Box w="100%" h="100vh" bg="white" safeArea>
      <VStack space={4} flex={1} justifyContent="center" alignItems="center">
        <Image
          source={{
            uri: '/pwa-512x512.png'
          }}
          alt="Inside My Closet"
          size="2xl"
          resizeMode="contain"
        />
        <Heading size="2xl" color="primary.500" textAlign="center">
          Inside My Closet
        </Heading>
      </VStack>
    </Box>
  );
}
