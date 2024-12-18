
import { Box, Button, Image, Text, VStack, Spinner } from "native-base";
import { useState } from "react";
import { seedDB} from "../functions/upload"; // Import the upload function
 
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import CategorySelectionModal from "./CategorySelectionModal";
import '../styles/CameraFunctionality.css';

export default function CameraFunctionality() {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowModal(true);
      // Reset the input value to allow selecting the same file again
      event.target.value = '';
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFile(null);
  };

  const handleUpload = async (category: string, description: string) => {
    if (!selectedFile) return;
    
    try {
      setUploading(true);
      setUploadSuccess(false);


      const success = await seedDB(selectedFile, 1); // Use the upload function

      setUploadSuccess(success);

      if (success) {
        setTimeout(() => {
          setUploadSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
      setSelectedFile(null);
      setShowModal(false);
    }
  };


//   const handleSubmit = () => {
//     alert("Image uploaded successfully!");
//     setUploadSuccess(false);
//     setSelectedImage(null);
//   };
  

  return (
    <Box 
      alignItems="center" 
      w="100%" 
      bg="primary.100" 
      p={4} 
      borderRadius="xl"
      shadow="lg"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelection}
        ref={fileInputRef}
        aria-label="Upload image"
        className="hidden-input"
      />
      <Box 
        alignItems="center" 
        justifyContent="center" 
        w="100%"
        position="relative"
      >
        {uploading ? (
          <HStack space={2} alignItems="center" justifyContent="center">
            <Spinner color="primary.200" size="lg" />
            <Text color="primary.200">Uploading...</Text>
          </HStack>
        ) : uploadSuccess ? (
          <HStack space={2} alignItems="center" justifyContent="center">
            <Icon as={FaCheckCircle} size={6} color="primary.200" />
            <Text color="primary.200">Upload successful!</Text>
          </HStack>
        ) : (
          <Button
            onPress={() => fileInputRef.current?.click()}
            bg="primary.200"
            borderColor="primary.200"
            borderWidth={1}
            w="100%"
            justifyContent="center"
            _text={{ color: "primary.100" }}
            _hover={{
              borderColor: "amber.400",
              _text: { color: "amber.400" },
              _icon: { color: "amber.400" }
            }}
            leftIcon={<Icon as={FaPlusCircle} size={5} color="primary.100" mr={2} />}
          >
            Upload Image
          </Button>
        )}
      </Box>

      <CategorySelectionModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleUpload}
      />
    </Box>
  );
}
