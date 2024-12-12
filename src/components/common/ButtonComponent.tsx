import { Button } from "native-base";

interface ButtonComponentProps {
    onPress: () => void;
    label: string | JSX.Element;
    style?: any;
}

export default function ButtonComponent({ onPress, label, style }: ButtonComponentProps) {
    return (
        <Button
            onPress={onPress}
            bg="primary.200"
            borderColor="primary.100"
            borderWidth={1}
            _text={{ 
                color: "primary.100",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "sm"
            }}
            _hover={{
                bg: "primary.200",
                borderColor: "amber.400",
                _text: { color: "amber.400" }
            }}
            _focus={{
                bg: "primary.200",
                borderColor: "primary.100",
                _text: { color: "primary.100" }
            }}
            _pressed={{
                bg: "primary.200",
                borderColor: "primary.100",
                _text: { color: "primary.100" }
            }}
            w="100%"
            style={{
                ...style,
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                wordBreak: 'break-word'
            }}
        >
            {label}
        </Button>
    );
}
