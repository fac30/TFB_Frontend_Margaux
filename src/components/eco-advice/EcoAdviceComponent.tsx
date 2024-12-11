import ChatBotContainer from "./chatbot/ChatBotContainer"
import TalksContainer from "./TalksContainer"
import { useState, useEffect } from "react"
import { VStack, Center, Box } from "native-base";
import ThriftingComponent from "./ThriftingComponent"
import UpscalingComponent from "./UpscalingComponent"
import ClothingSwaps from "./ClothingSwaps"
import ButtonComponent from "../common/ButtonComponent";

type ComponentType = 'talks' | 'chat' | 'clothes' | 'upscaling' | 'thrifting';

interface ButtonConfig {
    id: ComponentType;
    label: string;
}

interface EcoAdviceComponentProps {
    onRegisterBack: (backFn: () => void) => void;
    setActiveComponent: (component: string) => void;
}

export default function EcoAdviceComponent({ onRegisterBack, setActiveComponent }: EcoAdviceComponentProps) {
    const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null);
    
    const buttons: ButtonConfig[] = [
        { id: 'clothes', label: 'Clothes Swaps' },
        { id: 'upscaling', label: 'Upscaling' },
        { id: 'thrifting', label: 'Thrifting' },
        { id: 'talks', label: 'Talks' },
        { id: 'chat', label: 'Have A Question ?' },
    ];

    // Register the back function with the parent component
    useEffect(() => {
        // Define the back function
        const handleBack = () => {
            if (selectedComponent) {
                setSelectedComponent(null);
            } else {
                setActiveComponent(""); // Return to main page when in sustainable menu
            }
        };

        // Register it with the parent
        onRegisterBack(handleBack);
    }, [selectedComponent, onRegisterBack, setActiveComponent]); // Include dependencies

    return (
        <Box 
            flex={1} 
            bg="primary.200" 
            safeArea
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
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