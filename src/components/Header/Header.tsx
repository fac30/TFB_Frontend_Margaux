"use client";

import { Box, HStack, Pressable, Image } from 'native-base';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box safeAreaTop bg="primary.100" px="2xl" shadow="sm">
      <HStack justifyContent="space-between" alignItems="center" h="2xl">
        <Pressable onPress={() => navigate('/')}>
          <Image
            source={{
              uri: '/pwa-192x192.png'
            }}
            alt="Inside My Closet"
            size="md"
          />
        </Pressable>
      </HStack>
    </Box>
  );
}
