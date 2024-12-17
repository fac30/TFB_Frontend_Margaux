import { Box, Button, Image, VStack, Spinner, Pressable, Icon } from "native-base";
import { useState, useRef } from "react";
import { uploadImage } from "../functions/upload";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import '../styles/CameraFunctionality.css';

export default function CameraFunctionality() {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setUploading(true);
      setUploadSuccess(false);
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);

      const success = await uploadImage(selectedFile);
      setUploadSuccess(success);
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    alert("Image uploaded successfully!");
    setUploadSuccess(false);
    setSelectedImage(null);
  };

  return (
    <Box flex={1} bg="primary.200" safeArea alignItems="center" pb="80px">
      <VStack space={4} w="100%" maxW="400px" px={4} alignItems="center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelection}
          ref={fileInputRef}
          aria-label="Upload image"
          className="hidden-input"
        />
        <Box mt={4} w="100%" alignItems="center">
          {uploading ? (
            <Spinner color="primary.100" size="lg" />
          ) : uploadSuccess ? (
            <Icon 
              as={FaCheckCircle} 
              size={50} 
              color="primary.100" 
            />
          ) : (
            <Pressable
              onPress={() => fileInputRef.current?.click()}
              aria-label="Select image"
            >
              <Icon 
                as={FaPlusCircle} 
                size={50} 
                color="primary.100"
              />
            </Pressable>
          )}
        </Box>
        {selectedImage && uploadSuccess && (
          <Box mt={4}>
            <Image
              source={{ uri: selectedImage }}
              alt="Uploaded Image"
              size="2xl"
              borderRadius="md"
            />
          </Box>
        )}
        {uploadSuccess && (
          <Button
            mt={4}
            w="100%"
            onPress={handleSubmit}
            bg="primary.200"
            borderWidth={1}
            _text={{ color: "primary.100" }}
            _hover={{
              borderColor: "amber.400",
              _text: { color: "amber.400" },
            }}
          >
            Submit
          </Button>
        )}
      </VStack>
    </Box>
  );
}
