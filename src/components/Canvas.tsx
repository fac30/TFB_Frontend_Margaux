import { Box, IconButton, Image, Icon, VStack } from "native-base";
import { CloseIcon } from "native-base";

interface ClothingItem {
  name: string;
  image: string;
  category: string;
  subcategory: string;
}

interface CanvasProps {
  items: ClothingItem[];
  onDeleteItem: (index: number) => void;
}

export default function Canvas({ items, onDeleteItem }: CanvasProps) {
  // Group items by category
  const topItems = items.filter(item => 
    item.category === "Tops"
  );
  const bottomItems = items.filter(item => 
    item.category === "Bottoms"
  );
  const shoeItems = items.filter(item => 
    item.category === "Shoes"
  );

  const renderClothingItem = (item: ClothingItem, index: number) => (
    <Box 
      key={index} 
      position="relative"
      m={2}
    >
      <Image
        source={{ uri: item.image }}
        alt={item.name}
        size="md"
        width="120px"
        height="120px"
        resizeMode="contain"
      />
      <IconButton
        position="absolute"
        top={0}
        right={0}
        size="sm"
        bg="primary.200"
        borderColor="primary.100"
        borderWidth={1}
        icon={<CloseIcon color="primary.100" />}
        onPress={() => onDeleteItem(index)}
        _hover={{
          bg: "primary.200"
        }}
      />
    </Box>
  );

  return (
    <VStack
      flex={1}
      bg="primary.200"
      borderColor="primary.100"
      borderWidth={1}
      borderRadius="md"
      space={4}
      p={4}
    >
      {/* Top Section */}
      <Box 
        minH="200px"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {topItems.map((item, index) => renderClothingItem(item, items.indexOf(item)))}
      </Box>

      {/* Middle Section (for Bottoms) */}
      <Box 
        minH="200px"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {bottomItems.map((item, index) => renderClothingItem(item, items.indexOf(item)))}
      </Box>

      {/* Bottom Section (for Shoes) */}
      <Box 
        minH="100px"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {shoeItems.map((item, index) => renderClothingItem(item, items.indexOf(item)))}
      </Box>
    </VStack>
  );
}
