import { Box, Input } from "native-base";

export default function ChatInputBox(){
    return (
        <Box        
        >
            <Input
            minHeight={50}
             placeholder="Type your message here" />
        </Box>
    )
}