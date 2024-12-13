import { useState } from "react";
import { Box, VStack, Heading } from "native-base";
import { generateChatResponse } from "../../../utils/openai"; // Import the function
import ChatHistory from "./ChatHistory";
import ChatInputBox from "./ChatInputBox";

export default function ChatBotContainer() {
    const [messages, setMessages] = useState<{ message: string; sender: string }[]>([
        { message: "Hello, how can I help you today?", sender: "bot" },
    ]);

    const handleSendMessage = async (message: string) => {
        setMessages((prev) => [...prev, { message, sender: "user" }]);

        try {
            // Simplified call to get a response from OpenAI
            const botMessage = await generateChatResponse(message);
            setMessages((prev) => [...prev, { message: botMessage, sender: "bot" }]);
        } catch (error) {
            console.error("Error generating response:", error);
            setMessages((prev) => [
                ...prev,
                { message: "Oops, something went wrong. Please try again.", sender: "bot" },
            ]);
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
                <Box flex={1} display="flex" flexDirection="column" position="relative" overflow="hidden">
                    <ChatHistory messages={messages} />
                    <Box position="absolute" bottom={0} left={0} right={0} px={4} pb={4} bg="primary.200">
                        <ChatInputBox onSendMessage={handleSendMessage} />
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
}
