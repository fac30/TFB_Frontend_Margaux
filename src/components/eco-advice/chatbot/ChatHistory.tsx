import { Box, Text } from "native-base";

interface ChatHistoryProps {
    messages: {message: string, sender: string}[];
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
    const botMessageStyle = {
        backgroundColor: '#E8E8E8',
        padding: 10,
        margin: 5,
        borderRadius: 8,
        maxWidth: '70%' as const,
        alignSelf: 'flex-start' as const
    };

    const userMessageStyle = {
        backgroundColor: '#DCF8C6',
        padding: 10,
        margin: 5,
        borderRadius: 8,
        maxWidth: '70%' as const,
        alignSelf: 'flex-end' as const
    };

    return (
        <Box
            bg="white"
            borderColor="#67635E"
            position="relative"
            borderRadius={10}
            shadow={9}
            top={8}
            width="80%"
            height="78%"
            marginLeft="auto"
            marginRight="auto"
        >
         {messages.map((msg, index) => (
            <Text 
                style={msg.sender === "bot" ? botMessageStyle : userMessageStyle} 
                key={index}
            >
                {msg.message}
            </Text>
         ))}
        </Box>
    )
}