import { Box, Text } from "native-base";
import { FlexAlignType } from "react-native";

interface ChatHistoryProps {
    messages: {message: string, sender: string}[];
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
    const botMessageStyle = {
        bg: "primary.200",
        p: 2,
        m: 1,
        borderRadius: 8,
        maxW: { base: "85%", md: "70%" },
        alignSelf: "flex-start" as FlexAlignType,
        borderColor: "primary.100",
        borderWidth: 1
    };

    const userMessageStyle = {
        bg: "primary.100",
        p: 2,
        m: 1,
        borderRadius: 8,
        maxW: { base: "85%", md: "70%" },
        alignSelf: "flex-end" as FlexAlignType,
        borderColor: "primary.200",
        borderWidth: 1
    };

    return (
        <Box
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            borderRadius={10}
            shadow={9}
            width={{ base: "95%", md: "90%" }}
            height={{ base: "calc(100% - 60px)", md: "calc(100% - 80px)" }}
            marginX="auto"
            p={{ base: 2, md: 4 }}
            overflow="auto"
            display="flex"
            flexDirection="column"
        >
            {messages.map((msg, index) => (
                <Box
                    key={index}
                    {...(msg.sender === "bot" ? botMessageStyle : userMessageStyle)}
                >
                    <Text 
                        color={msg.sender === "bot" ? "primary.100" : "primary.200"}
                        fontSize={{ base: "sm", md: "md" }}
                        textTransform="none"
                    >
                        {msg.message}
                    </Text>
                </Box>
            ))}
        </Box>
    );
}