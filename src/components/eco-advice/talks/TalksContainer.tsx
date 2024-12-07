import { Box, Text } from "native-base";
import { parseDoc } from "../../../utils/parse-doc";
import { useEffect, useState } from "react";

export default function TalksContainer() {
    const [talks, setTalks] = useState<string>("");

    useEffect(() => {
        parseDoc("https://docs.google.com/document/d/e/2PACX-1vTM38NkUYuw_7y4ShBcd778IQwIoAA1epXrODKRdlE8pebaxIhnqKuuew4SlGl46qluhfILP9Pf11nk/pub")
            .then((content) => {
                setTalks(content);
            })
            .catch((error) => {
                console.error("Error fetching talks:", error);
            });
    }, []);

    return (
        <Box>
            <Text>{talks}</Text>
        </Box>
    );
}