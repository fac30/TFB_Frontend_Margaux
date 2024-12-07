import { useState } from "react";
import { Box, VStack } from "native-base";
import ChatHistory from "./ChatHistory";
import ChatInputBox from "./ChatInputBox";

export default function ChatBotContainer() {
    const [messages, setMessages] = useState<{message: string, sender: string}[]>([{
        message: "Hello, how can I help you today?",
        sender: "bot"
    }]);

    const handleSendMessage = (message: string) => {
        setMessages([...messages, {
            message: message,
            sender: "user"
        }]);
    };

    return (
        <Box h="100%" w="100%" position="relative" backgroundColor="">
            <VStack h="100%" space={4}>
                <Box flex={1}>
                    <ChatHistory messages={messages} />
                </Box>
                <Box position="absolute" bottom={20} left={1} right={1}>
                    <ChatInputBox onSendMessage={handleSendMessage} />
                </Box>
            </VStack>
        </Box>
    )
}