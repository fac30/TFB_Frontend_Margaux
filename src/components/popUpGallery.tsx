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

// Define the types for the props
type PopUpGalleryProps = {
  isVisible: boolean; // Controls if the pop-up is visible
  onClose: () => void; // Function to close the pop-up
  sectionName: string; // Name of the section (e.g., Tops, Jumpers)
  galleryLinks: string[]; // Array of image URLs
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
        {/* Section Title */}
        <Text style={styles.header}>{sectionName}</Text>

        {/* Gallery */}
        {galleryLinks && galleryLinks.length > 0 ? (
          <FlatList
            data={galleryLinks}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
          />
        ) : (
          <Text style={styles.noImagesText}>No Images Available</Text>
        )}

        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PopUpGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  header: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  image: { width: 150, height: 150, margin: 10 },
  noImagesText: { fontSize: 16, color: "gray" },
  closeButton: {
    padding: 10,
    backgroundColor: "tomato",
    borderRadius: 5,
    marginTop: 20,
  },
  closeText: { color: "#FFF", fontSize: 16 },
});
