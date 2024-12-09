import ChatBotContainer from "./chatbot/ChatBotContainer"
import TalksContainer from "./TalksContainer"
import { useState } from "react"
import { VStack, Button, Center, Text } from "native-base";
import ThriftingComponent from "./ThriftingComponent"
import UpscalingComponent from "./UpscalingComponent"
import ClothingSwaps from "./ClothingSwaps"

export default function EcoAdviceComponent() {
    const [selectedComponent, setSelectedComponent] = useState<'talks' | 'chat' | 'clothes' | 'upscaling' | 'thrifting' | null>(null);
    
    const handleBack = () => {
        setSelectedComponent(null);
    };

    return (
        <>
            {!selectedComponent && (
                <Center w="100%">
                    <VStack space={8} w="90%" maxW="300px">
                        <Button 
                            onPress={() => setSelectedComponent('clothes')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                            shadow={3}
                        >
                            Clothes Swaps
                        </Button>
                        <Button 
                            onPress={() => setSelectedComponent('upscaling')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                            shadow={3}
                        >
                            Upscaling
                        </Button>
                        <Button 
                            onPress={() => setSelectedComponent('thrifting')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                            shadow={3}
                        >
                            Thrifting
                        </Button>
                        <Button 
                            onPress={() => setSelectedComponent('talks')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                            shadow={3}
                        >
                            Talks
                        </Button>
                        <Button 
                            onPress={() => setSelectedComponent('chat')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                            shadow={3}
                        >
                            Have A Question ?
                        </Button>
                    </VStack>
                </Center>
            )}
            {selectedComponent === 'talks' && <TalksContainer onBack={handleBack} />}
            {selectedComponent === 'chat' && <ChatBotContainer onBack={handleBack} />}
            {selectedComponent === 'clothes' && <ClothingSwaps onBack={handleBack} />}
            {selectedComponent === 'upscaling' && <UpscalingComponent onBack={handleBack} />}
            {selectedComponent === 'thrifting' && <ThriftingComponent onBack={handleBack} />}
        </>
    )
}