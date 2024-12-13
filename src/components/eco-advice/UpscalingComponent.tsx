import { Box, VStack, Spinner, Heading } from "native-base";
import { parseDoc } from "../../utils/parse-doc";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function UpscalingComponent() {
    const [upscalingContent, setUpscalingContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        parseDoc("https://docs.google.com/document/d/e/2PACX-1vQAoR9rbaWKe8ZlLzGNHX4ZZ4-8Jy4K4B3Gv5b8C1AE39rRUzl4q_uh5aGl6OWZt6hZkq2AYnkUzRJF/pub")
            .then((content) => {
                setUpscalingContent(content);
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching upscaling content:", error);
                setError("Failed to load upscaling content. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <Box 
            fontFamily={'body'} 
            padding={2} 
            marginBottom={10}
        >
            <Heading 
                color="primary.100"
                textAlign="center"
                w="100%"
                mb={4}
            >
                Upscaling
            </Heading>
            <Box maxH="80vh" overflow="auto" padding={4}>
                <VStack space={4}>
                    {isLoading && <Spinner size="lg" color="primary.100" />}
                    {error && <Box color="red.500">{error}</Box>}
                    {!isLoading && !error && (
                        <Box>
                            <ReactMarkdown>{upscalingContent}</ReactMarkdown>
                        </Box>
                    )}
                </VStack>
            </Box>
        </Box>
    );
}
