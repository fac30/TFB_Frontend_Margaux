"use client";

import { Box, HStack, Pressable, Image } from 'native-base';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box safeAreaTop bg="white" px={4} shadow={1}>
      <HStack justifyContent="space-between" alignItems="center" h={16}>
        <Pressable onPress={() => navigate('/')}>
          <Image
            source={{
              uri: '/pwa-192x192.png'  // Using the smaller logo version for better performance
            }}
            alt="Inside My Closet"
            size="sm"  // You can adjust this size: "xs", "sm", "md", "lg", "xl", "2xl"
            resizeMode="contain"
          />
        </Pressable>
        {/* Add navigation items here later */}
      </HStack>
    </Box>
  );
}
