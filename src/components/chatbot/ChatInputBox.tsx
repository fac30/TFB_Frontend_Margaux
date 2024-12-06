import { Box, Input, Button } from "native-base";
import { useState } from "react";

interface ChatInputBoxProps {
    onSendMessage: (message: string) => void;
}

export default function ChatInputBox({ onSendMessage }: ChatInputBoxProps) {
    const [inputMessage, setInputMessage] = useState("");

    const handleSend = () => {
        if (inputMessage.trim()) {
            onSendMessage(inputMessage);
            setInputMessage(""); // Clear input after sending
        }
    };

    return (
        <Box>
            <Input
                value={inputMessage}
                onChangeText={setInputMessage}
                minHeight={50}
                placeholder="Type your message here"
                InputRightElement={
                    <Button 
                        size="md" 
                        marginRight={1} 
                        rounded="5" 
                        w="120" 
                        h="full"
                        onPress={handleSend}
                    >
                        Send
                    </Button>
                }
            />
        </Box>
    )
}