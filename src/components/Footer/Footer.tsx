import { Box, Text, Center } from 'native-base';

export default function Footer() {
  return (
    <Box bg="primary.100" py="xl" position="relative" bottom={0} width="100%" shadow="xs">
      <Center>
        <Text color="primary.200" fontSize="sm">
          © 2024 Inside My Closet. All rights reserved.
        </Text>
      </Center>
    </Box>
  );
}
