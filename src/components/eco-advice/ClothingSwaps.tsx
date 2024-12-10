import { Box, VStack, Spinner } from "native-base";
import { parseDoc } from "../../utils/parse-doc";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { theme } from "../../utils/native-base-config";

export default function ClothingSwaps() {
    const [swapsContent, setSwapsContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        parseDoc("https://docs.google.com/document/d/e/2PACX-1vTxqRL1IeIdiqAp9QoBtdVY135Hq7PA2BkMooZRGDQ9GWdCnGJGvaWsEJ8RYw-7QGihXj5tI_CFtxXB/pub")
            .then((content) => {
                setSwapsContent(content);
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching clothing swaps content:", error);
                setError("Failed to load clothing swaps content. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <Box fontFamily={'body'} padding={2} marginBottom={10} bg={theme.colors.gray[100]}>
            <h1>Clothing Swaps</h1>
            <Box maxH="80vh" overflow="auto" padding={4}>
                <VStack space={4}>
                    {isLoading && <Spinner size="lg" />}
                    {error && <Box color="red.500">{error}</Box>}
                    {!isLoading && !error && <ReactMarkdown>{swapsContent}</ReactMarkdown>}
                </VStack>
            </Box>
        </Box>
    );
}
