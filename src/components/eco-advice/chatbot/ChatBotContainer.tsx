import { useState } from "react";
import { Box, VStack, Heading } from "native-base";
import { Message } from "../../../utils/types";
import { generateChatResponse } from "../../../utils/openai";
import ChatHistory from "./ChatHistory";
import ChatInputBox from "./ChatInputBox";

export default function ChatBotContainer() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;
        
        setIsLoading(true);
        try {
            // Add user message
            const newMessage: Message = {
                role: 'user',
                content: content.trim(),
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, newMessage]);
            
            // Get AI response
            const response = await generateChatResponse([
                ...messages, // Include conversation history
                newMessage
            ]);
            
            // Add AI response
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.message,
                timestamp: new Date(),
            }]);
        } catch (error) {
            console.error("Error generating response:", error);
            
            // Add error message
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: error instanceof Error 
                    ? `I apologise, but I encountered an error: ${error.message}. Please try again.`
                    : "I apologise, but I'm having trouble connecting to the chat service. Please try again later.",
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            w="100%"
            h="calc(100vh - 120px)"
            bg="primary.200"
            display="flex"
            flexDirection="column"
            position="relative"
            overflow="hidden"
            pb={20}
        >
            <VStack flex={1} space={2} bg="primary.200" p={4}>
                <Heading
                    color="primary.100"
                    textAlign="center"
                    fontSize={{ base: "xl", md: "2xl" }}
                    mb={2}
                >
                    Need help?
                </Heading>
                <Box 
                    flex={1} 
                    display="flex" 
                    flexDirection="column" 
                    position="relative" 
                    overflow="hidden"
                >
                    <ChatHistory 
                        messages={messages.map(msg => ({
                            message: msg.content,
                            sender: msg.role === 'assistant' ? 'bot' : 'user'
                        }))} 
                    />
                    <Box 
                        position="absolute" 
                        bottom={0} 
                        left={0} 
                        right={0} 
                        px={4} 
                        pb={4} 
                        bg="primary.200"
                    >
                        <ChatInputBox 
                            onSendMessage={handleSendMessage} 
                            isLoading={isLoading}
                        />
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
}
