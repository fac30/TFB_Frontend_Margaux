import { Button } from "native-base";

interface ButtonComponentProps {
    onPress: () => void;
    label: string;
}

export default function ButtonComponent({ onPress, label }: ButtonComponentProps) {
    return (
        <Button
            onPress={onPress}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _hover={{
                bg: "primary.200",
                borderColor: "amber.400",
                _text: { color: "amber.400" }
            }}
            _focus={{
                bg: "primary.200",
                borderColor: "amber.400",
                _text: { color: "amber.400" }
            }}
            _text={{ color: "primary.100" }}
            w="100%"
            py={4}
        >
            {label}
        </Button>
    );
}
