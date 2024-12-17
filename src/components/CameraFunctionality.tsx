import { Box, Spinner, Icon, Button, Text, HStack } from "native-base";
import { useState, useRef } from "react";
import { uploadImage } from "../functions/upload";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import '../styles/CameraFunctionality.css';

export default function CameraFunctionality() {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setUploading(true);
      setUploadSuccess(false);

      const success = await uploadImage(selectedFile);
      setUploadSuccess(success);
      setUploading(false);

      if (success) {
        setTimeout(() => {
          setUploadSuccess(false);
        }, 2000);
      }
    }
  };

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
            <Icon 
              as={FaCheckCircle} 
              size={6} 
              color="primary.200" 
            />
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
            _text={{ 
              color: "primary.100",
              fontSize: { base: "sm", md: "md" }
            }}
            _hover={{
              borderColor: "amber.400",
              _text: { color: "amber.400" },
              _icon: { color: "amber.400" }
            }}
            _focus={{
              borderColor: "primary.200",
              _text: { color: "primary.100" },
              bg: "transparent",
            }}
            _pressed={{
              bg: "primary.200",
            }}
            leftIcon={
              <Icon 
                as={FaPlusCircle} 
                size={5} 
                color="primary.100"
                mr={2}
              />
            }
          >
            Upload Image
          </Button>
        )}
      </Box>
    </Box>
  );
}
