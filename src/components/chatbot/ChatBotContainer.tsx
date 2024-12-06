import { Box, VStack } from "native-base";
import ChatHistory from "./ChatHistory";
import ChatInputBox from "./ChatInputBox";

export default function ChatBotContainer(){
    return (
        <Box h="100%" w="100%" position="relative" backgroundColor="">
            <VStack h="100%" space={4}>
                <Box flex={1}>
                    <ChatHistory/>
                </Box>
                <Box position="absolute" bottom={20} left={1} right={1}>
                    <ChatInputBox />
                </Box>
            </VStack>
        </Box>
    )
}