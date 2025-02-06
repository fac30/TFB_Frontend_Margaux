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
      setInputMessage("");
    }
  };

  //   const handleKeyPress = (e: React.KeyboardEvent) => {
  //     if (e.key === "Enter" && !e.shiftKey) {
  //       e.preventDefault();
  //       handleSend();
  //     }
  //   };

  return (
    <Box
      bg="primary.200"
      p={{ base: 1, md: 2 }}
      borderRadius="md"
      borderColor="primary.100"
      borderWidth={1}
      width={{ base: "95%", md: "90%" }}
      mx="auto"
    >
      <Input
        value={inputMessage}
        onChangeText={setInputMessage}
        placeholder="Type your message here..."
        color="primary.100"
        borderColor="primary.100"
        _focus={{
          borderColor: "amber.400",
          bg: "primary.200",
        }}
        _hover={{
          borderColor: "amber.400",
        }}
        fontSize={{ base: "sm", md: "md" }}
        py={{ base: 1, md: 2 }}
        InputRightElement={
          <Button
            size={{ base: "sm", md: "md" }}
            marginRight={1}
            rounded="md"
            w={{ base: "16", md: "20" }}
            h="full"
            onPress={handleSend}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _hover={{
              borderColor: "amber.400",
              _text: { color: "amber.400" },
            }}
            _focus={{
              borderColor: "amber.400",
              _text: { color: "amber.400" },
              bg: "transparent",
            }}
            _pressed={{
              bg: "primary.200",
              borderColor: "primary.100",
              _text: { color: "primary.100" },
            }}
            _text={{
              color: "primary.100",
              fontSize: { base: "sm", md: "md" },
            }}
          >
            Send
          </Button>
        }
      />
    </Box>
  );
}
