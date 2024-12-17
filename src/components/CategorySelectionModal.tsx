import { useState } from "react";
import { 
  Modal, 
  FormControl, 
  Input, 
  Select, 
  Button, 
  VStack,
  Text,
  IModalProps
} from "native-base";
import { categories } from "../data/categories";

interface CategorySelectionModalProps extends Omit<IModalProps, 'children'> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: string, description: string) => void;
}

export default function CategorySelectionModal({
  isOpen,
  onClose,
  onSubmit,
  ...props
}: CategorySelectionModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (selectedCategory && description) {
      onSubmit(selectedCategory, description);
      setSelectedCategory("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedCategory("");
    setDescription("");
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      closeOnOverlayClick={false}
      {...props}
    >
      <Modal.Content maxW="400px">
        <Modal.CloseButton 
          onPress={handleClose}
          _icon={{ color: "primary.100" }}
          _hover={{
            bg: "transparent",
            _icon: { color: "amber.400" },
          }}
        />
        <Modal.Header bg="primary.200" borderBottomWidth={0}>
          <Text color="primary.100" fontSize="lg" fontWeight="bold">
            Add Item Details
          </Text>
        </Modal.Header>
        <Modal.Body bg="primary.200">
          <VStack space={4}>
            <FormControl isRequired>
              <FormControl.Label _text={{ color: "primary.100" }}>
                Category
              </FormControl.Label>
              <Select
                selectedValue={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
                placeholder="Select category"
                color="primary.100"
                borderColor="primary.100"
                bg="primary.200"
              >
                {categories.map((category) => (
                  <Select.Item 
                    key={category.name} 
                    label={category.name} 
                    value={category.name}
                  />
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label _text={{ color: "primary.100" }}>
                Description
              </FormControl.Label>
              <Input
                value={description}
                onChangeText={setDescription}
                placeholder="e.g., Blue cotton t-shirt"
                color="primary.100"
                borderColor="primary.100"
                bg="primary.200"
              />
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer bg="primary.200" borderTopWidth={0}>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              onPress={handleClose}
              _text={{ color: "primary.100" }}
              _hover={{ _text: { color: "amber.400" } }}
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              onPress={handleSubmit}
              _text={{ color: "primary.100" }}
              _hover={{ _text: { color: "amber.400" } }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
} 