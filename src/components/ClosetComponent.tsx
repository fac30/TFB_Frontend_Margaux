import { Box, Text, VStack } from 'native-base';

export default function ClosetComponent() {
    return (
        <Box 
            flex={1} 
            justifyContent="center" 
            alignItems="center"
        >
            <VStack space={4} alignItems="center">
                <Text fontSize="4xl" color="primary.100">Hello</Text>
                <Text fontSize="2xl" color="primary.100">This is the</Text>
                <Text fontSize="xl" color="primary.100">Closet Component</Text>
            </VStack>
        </Box>
    )
}