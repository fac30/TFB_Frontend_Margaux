import { Box, Button, Image, Text, VStack, Spinner } from "native-base";
import { useState } from "react";
import supabase from "../supbaseClient"; // Adjust the path as needed
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

export default function CameraFunctionality() {
  const [uploading, setUploading] = useState(false); // Upload status
  const [uploadSuccess, setUploadSuccess] = useState(false); // Success status
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Selected image preview
  const [file, setFile] = useState<File | null>(null); // The selected file

  // Handle file selection and immediate upload
  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      try {
        setUploading(true);
        setUploadSuccess(false);
        setFile(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImage(imageUrl);

        // Upload file to Supabase
        const { error } = await supabase.storage
          .from("photo_link") // Replace with your Supabase bucket name
          .upload(`images/${selectedFile.name}`, selectedFile);

        if (error) throw error;

        setUploadSuccess(true); // Mark as successful
        console.log("Image uploaded successfully:", selectedFile.name);
      } catch (error) {
        console.error("Upload failed:", error.message);
        alert("Image upload failed!");
      } finally {
        setUploading(false);
      }
    }
  };

  // Handle confirmation of upload (clicking Submit)
  const handleSubmit = () => {
    alert("Image uploaded successfully!");
    // Reset states after successful upload
    setUploadSuccess(false);
    setSelectedImage(null);
    setFile(null);
  };

  return (
    <Box flex={1} bg="primary.200" safeArea alignItems="center" pb="80px">
      <VStack space={4} w="100%" maxW="400px" px={4} alignItems="center">
        {/* Header */}
        

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelection}
          style={{ display: "none" }}
          id="file-input"
        />

        {/* Add/Upload Icon */}
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

        {/* Image Preview */}
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

        {/* Submit Button */}
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
