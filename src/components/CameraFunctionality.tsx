import { Box, Button, Image, Text, VStack, Spinner } from "native-base";
import { useState } from "react";
import { seedDB} from "../functions/upload"; // Import the upload function
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

export default function CameraFunctionality() {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setUploading(true);
      setUploadSuccess(false);
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);

      const success = await seedDB(selectedFile, 1); // Use the upload function
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
          style={{ display: "none" }}
          id="file-input"
        />
        <Box mt={4} w="100%" alignItems="center">
          {uploading ? (
            <Spinner color="amber.400" size="lg" />
          ) : uploadSuccess ? (
            <FaCheckCircle size={50} color="green" />
          ) : (
            <FaPlusCircle
              size={50}
              color="blue"
              style={{ cursor: "pointer" }}
              onClick={() => document.getElementById("file-input")?.click()}
            />
          )}
        </Box>
        {selectedImage && uploadSuccess && (
          <Box mt={4}>
            <Image
              source={{ uri: selectedImage }}
              alt="Uploaded Image"
              size="lg"
              width={200}
              height={200}
              borderRadius="md"
            />
          </Box>
        )}
        {uploadSuccess && (
          <Box mt={4} w="100%" alignItems="center">
            <Button
              bg="primary.200"
              borderColor="primary.100"
              borderWidth={1}
              _text={{ color: "primary.100", fontWeight: "bold" }}
              _hover={{
                borderColor: "amber.400",
                _text: { color: "amber.400" },
              }}
              onPress={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
