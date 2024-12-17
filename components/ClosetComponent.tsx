import { Box, HStack, Text } from "native-base";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ClickableBox from './ClickableBox';

type RootStackParamList = {
  OutfitMaker: undefined;
  // Add other screens as needed
};

export default function ClosetComponent() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <HStack space={0} width="100%" height="20%">
      <Box
        flex={1}
        bg="#FFFFFF"
        justifyContent="center"
        alignItems="center"
        borderRightWidth={6}
        borderBottomWidth={6}
        borderColor="#5E5E5E"
      >
        <ClickableBox
          onPress={() => navigation.navigate('OutfitMaker')}
          label="Tops"
        />
      </Box>
      <Box
        flex={1}
        bg="#FFFFFF"
        justifyContent="center"
        alignItems="center"
        borderBottomWidth={6}
        borderColor="#5E5E5E"
      >
        <Text color="#4A4A4A" fontSize="sm" textAlign="center">
          jumpers
        </Text>
      </Box>
    </HStack>
  );
} 