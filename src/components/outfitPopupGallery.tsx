
import {
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
} from "react-native";

interface ClothingItem {
  item_id: number;
  item_desc: string;
  photo_link: string;
  category_id: number;
}

interface SavedOutfit {
  outfit_id: number;
  outfit_name: string;
  outfit_items: {
    clothing_items: ClothingItem;
  }[];
}

type OutfitGalleryProps = {
  isVisible: boolean;
  onClose: () => void;
  outfit: SavedOutfit | null;
};

const OutfitGallery: React.FC<OutfitGalleryProps> = ({
  isVisible,
  onClose,
  outfit,
}) => {
  if (!outfit) return null;

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <Text style={styles.header}>{outfit.outfit_name}</Text>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.outfitGrid}>
              {outfit.outfit_items.map((item, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.clothing_items.photo_link }}
                    style={styles.image}
                  />
                  <Text style={styles.description}>
                    {item.clothing_items.item_desc}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#395D51",
  },
  scrollContainer: {
    maxHeight: '80%',
  },
  outfitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 5,
  },
  imageContainer: {
    width: '45%',
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  description: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    color: "#395D51",
  },
  closeButton: {
    padding: 15,
    backgroundColor: "#395D51",
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  closeText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OutfitGallery;