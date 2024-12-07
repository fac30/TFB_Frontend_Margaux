import ChatBotContainer from "./chatbot/ChatBotContainer"
import TalksContainer from "./talks/TalksContainer"
import { useState } from "react"
import { VStack, Button, Center } from "native-base";

export default function EcoAdviceComponent() {
    const [selectedComponent, setSelectedComponent] = useState<'talks' | 'chat' | 'clothes' | 'upscaling' | 'thrifting' | null>(null);
    
    return (
        <>
            {!selectedComponent && (
                <Center w="100%">
                    <VStack space={8} w="90%" maxW="300px">
                        <Button 
                            onPress={() => setSelectedComponent('clothes')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                        >
                            Clothes Swaps
                        </Button>
                        <Button 
                            onPress={() => setSelectedComponent('upscaling')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                        >
                            Upscaling
                        </Button>
                        <Button 
                            onPress={() => setSelectedComponent('thrifting')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                        >
                            Thrifting
                        </Button>
                        <Button 
                            onPress={() => setSelectedComponent('talks')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                        >
                            Talks
                        </Button>
                        <Button 
                            onPress={() => setSelectedComponent('chat')}
                            bg="primary.700"
                            _hover={{ bg: "primary.800" }}
                        >
                            Have A Question ?
                        </Button>
                    </VStack>
                </Center>
            )}
            {selectedComponent === 'talks' && <TalksContainer />}
            {selectedComponent === 'chat' && <ChatBotContainer />}
            {selectedComponent === 'clothes' && <div>Clothes Swaps Content Coming Soon</div>}
            {selectedComponent === 'upscaling' && <div>Upscaling Content Coming Soon</div>}
            {selectedComponent === 'thrifting' && <div>Thrifting Content Coming Soon</div>}
        </>
    )
}