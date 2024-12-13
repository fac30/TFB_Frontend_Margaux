import { Box, VStack, Spinner, Heading } from "native-base";
import { parseDoc } from "../../utils/parse-doc";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function TalksContainer() {
    const [talks, setTalks] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        parseDoc("https://docs.google.com/document/d/e/2PACX-1vTxqRL1IeIdiqAp9QoBtdVY135Hq7PA2BkMooZRGDQ9GWdCnGJGvaWsEJ8RYw-7QGihXj5tI_CFtxXB/pub")
            .then((content) => {
                setTalks(content);
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching talks:", error);
                setError("Failed to load talks. Please try again later.");
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
                Talks
            </Heading>
            <Box maxH="80vh" overflow="auto" padding={4}>
                <VStack space={4}>
                    {isLoading && <Spinner size="lg" color="primary.100" />}
                    {error && <Box color="red.500">{error}</Box>}
                    {!isLoading && !error && (
                        <Box>
                            <ReactMarkdown>{talks}</ReactMarkdown>
                        </Box>
                    )}
                </VStack>
            </Box>
        </Box>
    );
}

