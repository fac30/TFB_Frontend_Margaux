import React from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";

type PopUpGalleryProps = {
  isVisible: boolean;
  onClose: () => void;
  sectionName: string;
  galleryLinks: { photo_link: string; item_desc: string }[];
};

const PopUpGallery: React.FC<PopUpGalleryProps> = ({
  isVisible,
  onClose,
  sectionName,
  galleryLinks,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.header}>{sectionName}</Text>

        {galleryLinks && galleryLinks.length > 0 ? (
          <FlatList
            data={galleryLinks}
            keyExtractor={(_item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.photo_link }}
                  style={styles.image}
                  // Remove loading states and just use default platform behavior
                />
                <Text style={styles.description}>{item.item_desc}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noImagesText}>
            No items found in this category
          </Text>
        )}

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#f0f0f0", // Light gray background while loading
  },
  description: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  noImagesText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
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

export default PopUpGallery;
