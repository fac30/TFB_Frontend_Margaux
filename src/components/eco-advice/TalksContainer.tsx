import { Box, VStack, Spinner } from "native-base";
import { parseDoc } from "../../utils/parse-doc";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function TalksContainer() {
    const [talks, setTalks] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        parseDoc("https://docs.google.com/document/d/e/2PACX-1vTM38NkUYuw_7y4ShBcd778IQwIoAA1epXrODKRdlE8pebaxIhnqKuuew4SlGl46qluhfILP9Pf11nk/pub")
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
        <Box>
            <h1>Talks</h1>
            <Box maxH="80vh" overflow="auto">
                <VStack space={4}>
                    {isLoading && <Spinner size="lg" />}
                    {error && <Box color="red.500">{error}</Box>}
                    {!isLoading && !error && <ReactMarkdown>{talks}</ReactMarkdown>}
                </VStack>
            </Box>
        </Box>
    );
}

