import {
  Modal,
  Text,
  Image,
  VStack,
  Box,
  ScrollView,
  HStack,
  IconButton,
  useBreakpointValue,
  Pressable,
  IIconProps
} from "native-base";
import {
  PencilIcon as HeroPencil,
  TrashIcon as HeroTrash,
} from "@heroicons/react/16/solid";
import { Icon } from "native-base";
import { SavedOutfit } from "./OutfitMakerComponent";

interface PopUpGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'outfits' | 'category';
  title?: string;
  savedOutfits?: SavedOutfit[];
  categoryItems?: Array<{
    name: string;
    image: string;
    category: string;
  }>;
  onEditOutfit?: (outfit: SavedOutfit) => void;
  onDeleteOutfit?: (index: number) => void;
  onSelectItem?: (item: { name: string; image: string; category: string }) => void;
}

const PencilIcon = (props: IIconProps) => <Icon as={HeroPencil} size={5} {...props} />;
const TrashIcon = (props: IIconProps) => <Icon as={HeroTrash} size={5} {...props} />;

function PopUpGallery({ 
  isOpen, 
  onClose,
  mode,
  title = mode === 'outfits' ? 'Saved Outfits' : 'Category Items',
  savedOutfits = [],
  categoryItems = [],
  onEditOutfit = () => {},
  onDeleteOutfit = () => {},
  onSelectItem = () => {}
}: PopUpGalleryProps) {
  const imageSize = useBreakpointValue({
    base: 16,
    md: 24,
  });

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="full"
      closeOnOverlayClick={true}
      avoidKeyboard
    >
      <Modal.Content 
        bg="primary.200"
        maxW="768px"
        w="100%"
        h="100%"
      >
        <Modal.CloseButton 
          _icon={{ color: "primary.100" }}
          _hover={{
            bg: "transparent",
            _icon: { color: "amber.400" },
          }}
        />
        <Modal.Header bg="primary.200" borderBottomWidth={0} alignItems="center">
          <Text 
            color="primary.100" 
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            textAlign="center"
            w="100%"
          >
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          {mode === 'outfits' ? (
            // Outfits View
            savedOutfits.length === 0 ? (
              <Text 
                color="primary.100" 
                textAlign="center"
                fontSize={{ base: "md", md: "lg" }}
              >
                No saved outfits yet
              </Text>
            ) : (
              <ScrollView>
                <VStack space={4} alignItems="center">
                  {savedOutfits.map((outfit, index) => (
                    <Box
                      key={index}
                      borderWidth={1}
                      borderColor="primary.100"
                      borderRadius="md"
                      p={{ base: 2, md: 4 }}
                      w="100%"
                      maxW="600px"
                    >
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                        flexWrap="wrap"
                      >
                        <Text 
                          color="primary.100"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          Saved on: {outfit.date}
                        </Text>
                        <HStack space={2}>
                          <IconButton
                            icon={<PencilIcon />}
                            onPress={() => onEditOutfit(outfit)}
                            variant="ghost"
                            _icon={{ color: "primary.100" }}
                            _hover={{
                              bg: "transparent",
                              _icon: { color: "amber.400" },
                            }}
                            _focus={{
                              bg: "transparent",
                              _icon: { color: "amber.400" },
                            }}
                          />
                          <IconButton
                            icon={<TrashIcon />}
                            onPress={() => onDeleteOutfit(index)}
                            variant="ghost"
                            _icon={{ color: "primary.100" }}
                            _hover={{
                              bg: "transparent",
                              _icon: { color: "amber.400" },
                            }}
                            _focus={{
                              bg: "transparent",
                              _icon: { color: "amber.400" },
                            }}
                          />
                        </HStack>
                      </HStack>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        pb={2}
                      >
                        <HStack space={2} justifyContent="center" px={4}>
                          {outfit.items.map((item, itemIndex) => (
                            <Box 
                              key={itemIndex}
                              p={2}
                              borderRadius="md"
                              alignItems="center"
                            >
                              <Image
                                source={{ uri: item.image }}
                                alt={item.name}
                                size={imageSize}
                                width={imageSize}
                                height={imageSize}
                              />
                              <Text
                                color="primary.100"
                                fontSize={{ base: "xs", md: "sm" }}
                                textAlign="center"
                                mt={1}
                              >
                                {item.name}
                              </Text>
                            </Box>
                          ))}
                        </HStack>
                      </ScrollView>
                    </Box>
                  ))}
                </VStack>
              </ScrollView>
            )
          ) : (
            // Category View
            <ScrollView
              showsHorizontalScrollIndicator={true}
              pb={2}
            >
              <HStack 
                flexWrap="wrap" 
                justifyContent="center" 
                space={4} 
                px={4}
              >
                {categoryItems.map((item, index) => (
                  <Pressable 
                    key={index}
                    onPress={() => onSelectItem(item)}
                  >
                    <Box 
                      p={2}
                      borderRadius="md"
                      alignItems="center"
                    >
                      <Image
                        source={{ uri: item.image }}
                        alt={item.name}
                        size={imageSize}
                        width={imageSize}
                        height={imageSize}
                      />
                      <Text
                        color="primary.100"
                        fontSize={{ base: "xs", md: "sm" }}
                        textAlign="center"
                        mt={1}
                      >
                        {item.name}
                      </Text>
                    </Box>
                  </Pressable>
                ))}
              </HStack>
            </ScrollView>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default PopUpGallery;
