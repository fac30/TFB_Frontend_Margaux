import { Button } from "native-base";
import { ButtonComponentProps } from "../../utils/types";

export default function ButtonComponent({
  onPress,
  label,
  style,
  isLoading = false,
}: ButtonComponentProps) {
  return (
    <Button
      onPress={onPress}
      bg="transparent"
      borderColor="#395D51"
      borderWidth={1.5}
      rounded="lg"
      _text={{
        color: "#395D51",
        fontWeight: "medium",
        textAlign: "center",
        fontSize: "md",
      }}
      _hover={{
        bg: "transparent",
        borderColor: "#FFB800",
        _text: { color: "#FFB800" },
      }}
      _pressed={{
        bg: "transparent",
        borderColor: "#FFB800",
        _text: { color: "#FFB800" },
      }}
      w="100%"
      isLoading={isLoading}
      style={{
        ...style,
        transition: "all 0.3s ease",
        overflow: "hidden",
        wordBreak: "break-word",
      }}
    >
      {label}
    </Button>
  );
}
