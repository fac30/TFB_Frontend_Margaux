import ChatBotContainer from "./chatbot/ChatBotContainer"
import TalksContainer from "./TalksContainer"
import { useState, useEffect } from "react"
import { VStack, Center, Box } from "native-base";
import ThriftingComponent from "./ThriftingComponent"
import UpscalingComponent from "./UpscalingComponent"
import ClothingSwaps from "./ClothingSwaps"
import ButtonComponent from "../common/ButtonComponent";
import { ComponentType, ButtonConfig, EcoAdviceComponentProps } from "../../utils/types";

export default function EcoAdviceComponent({ onRegisterBack }: EcoAdviceComponentProps) {
    const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null);

    // Handle back navigation
    useEffect(() => {
        const handleBack = () => {
            if (selectedComponent) {
                setSelectedComponent(null);
                return true; // Indicate we handled the back action
            }
            return false; // Let parent handle the back action
        };

        onRegisterBack(handleBack);
    }, [selectedComponent, onRegisterBack]);

    const buttons: ButtonConfig[] = [
        { id: 'clothes', label: 'Clothes Swaps' },
        { id: 'upscaling', label: 'Upscaling' },
        { id: 'thrifting', label: 'Thrifting' },
        { id: 'talks', label: 'Talks' },
        { id: 'chat', label: 'Chat with us' },
    ];

    return (
        <Box 
            flex={1} 
            bg="primary.200" 
            safeArea
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
            zIndex={1}
        >
            {!selectedComponent ? (
                <Center>
                    <VStack space={4} w="90%" maxW="300px">
                        {buttons.map((button) => (
                            <ButtonComponent 
                                key={button.id}
                                onPress={() => setSelectedComponent(button.id)}
                                label={button.label}
                            />
                        ))}
                    </VStack>
                </Center>
            ) : (
                <Box flex={1} w="100%" p={4}>
                    {selectedComponent === 'talks' && <TalksContainer />}
                    {selectedComponent === 'chat' && <ChatBotContainer />}
                    {selectedComponent === 'clothes' && <ClothingSwaps />}
                    {selectedComponent === 'upscaling' && <UpscalingComponent />}
                    {selectedComponent === 'thrifting' && <ThriftingComponent />}
                </Box>
            )}
        </Box>
    );
}