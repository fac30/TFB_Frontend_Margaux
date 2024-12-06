import { Box, Text } from "native-base";
import { useState } from "react";

export default function ChatHistory(){
    const [message, setMessage] = useState<{message: string, sender: string}[]>([{
        message: "Hello, how can I help you today?",
        sender: "bot"
    },
    {
        message: "Hello, I'm after some help please",
        sender: "user"
    }
]);

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
         {message.map((msg, index) => (
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