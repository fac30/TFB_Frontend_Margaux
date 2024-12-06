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
        maxWidth: '70%',
        alignSelf: 'flex-start'
    };

    const userMessageStyle = {
        backgroundColor: '#DCF8C6',
        padding: 10,
        margin: 5,
        borderRadius: 8,
        maxWidth: '70%',
        alignSelf: 'flex-end'
    };

    return (
        <Box
            bg="white"
            borderColor="#67635E"
            position="relative"
            top={8}
            width="80%"
            height="80%"
            marginLeft="auto"
            marginRight="auto"
            borderRadius={10}
            shadow={9}
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