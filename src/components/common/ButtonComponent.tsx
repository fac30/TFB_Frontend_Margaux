import { Button, IButtonProps } from "native-base";

interface ButtonComponentProps extends IButtonProps {
    label: string;
}

export default function ButtonComponent({ label, ...props }: ButtonComponentProps) {
    return (
        <Button
            bg="primary.700"
            _hover={{ bg: "primary.800" }}
            shadow={3}
            {...props}
        >
            {label}
        </Button>
    );
}
