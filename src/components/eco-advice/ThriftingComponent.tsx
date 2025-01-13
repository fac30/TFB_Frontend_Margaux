import { Box, VStack, Spinner, Heading } from "native-base";
import { parseDoc } from "../../utils/parse-doc";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function ThriftingComponent() {
    const [thriftingContent, setThriftingContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        parseDoc("https://docs.google.com/document/d/e/2PACX-1vT2Ryq1O1FMz-R8OJ_eU_OtG1a8qcLSLTMp3VodusaQnCTSOOAzpR72l4gIGHDh_gpIhDK2jVeZOg-X/pub")
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
                Thrifting
            </Heading>
            <Box maxH="70vh" overflow="auto" padding={4}>
                <VStack space={4}>
                    {isLoading && <Spinner size="lg" color="primary.100" />}
                    {error && <Box color="red.500">{error}</Box>}
                    {!isLoading && !error && (
                        <Box>
                            <ReactMarkdown>{thriftingContent}</ReactMarkdown>
                        </Box>
                    )}
                </VStack>
            </Box>
        </Box>
    );
}
