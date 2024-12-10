import { Box, VStack, Spinner } from "native-base";
import { parseDoc } from "../../utils/parse-doc";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { theme } from "../../utils/native-base-config";

export default function ThriftingComponent() {
    const [thriftingContent, setThriftingContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        parseDoc("https://docs.google.com/document/d/e/2PACX-1vTnVBUYkkXsZmnCZztovNkinxKfNRTgHB_cf5RSVqv_7mx6pmdwV71N2yBSXS-K0ibnsdzd9D6u81r-/pub")
            .then((content) => {
                setThriftingContent(content);
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching thrifting content:", error);
                setError("Failed to load thrifting content. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <Box fontFamily={'body'} padding={2} marginBottom={10} bg={theme.colors.gray[100]}>
            <h1>Thrifting</h1>
            <Box maxH="70vh" overflow="auto" padding={4}>
                <VStack space={4}>
                    {isLoading && <Spinner size="lg" />}
                    {error && <Box color="red.500">{error}</Box>}
                    {!isLoading && !error && <ReactMarkdown>{thriftingContent}</ReactMarkdown>}
                </VStack>
            </Box>
        </Box>
    );
}
