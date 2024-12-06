import { Box, Input, Button } from "native-base";

export default function ChatInputBox(){
    return (
        <Box>
            <Input
                bg="white"
                minHeight={50}
                placeholder="Type your message here"
                InputRightElement={
                    <Button size="md" marginRight={1} rounded="5" w="120" h="full">
                        Send
                    </Button>
                }
            />
        </Box>
    )
}