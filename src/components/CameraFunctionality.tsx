import { Box, Button, Image, VStack, Spinner, Modal } from 'native-base';
import { useState } from 'react';
import { seedDB } from '../functions/upload';

export default function CameraFunctionality({ setActiveComponent }) {
	const [uploading, setUploading] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [productDescription, setProductDescription] = useState('');
	const [category, setCategory] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setSelectedImage(URL.createObjectURL(selectedFile));
			setFile(selectedFile);
		}
	};

  const handleSubmit = async () => {
    if (!productDescription || !category || !file) {
        alert('Please add all product information.');
        return;
    }

    setUploading(true);
    const success = await seedDB(file, parseInt(category), productDescription);
    setUploadSuccess(success);
    setUploading(false);

    if (success) {
        alert('Image uploaded successfully!');
        resetForm();
    } else {
        alert('Image upload failed!');
    }
};

	const resetForm = () => {
		setSelectedImage(null);
		setFile(null);
		setProductDescription('');
		setCategory('');
		setIsModalVisible(false);
		setActiveComponent("");
	};

	return (
		<Box flex={1} bg='primary.200' safeArea alignItems='center' pb='80px'>
			<VStack space={4} w='100%' maxW='400px' px={4} alignItems='center'>
				<Button onPress={() => setIsModalVisible(true)}>Add Product</Button>

				<Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
					<Modal.Content>
						<Modal.CloseButton />
						<Modal.Header>Add Product Details</Modal.Header>
						<Modal.Body>
							<VStack space={4} display='flex' flexDirection='column'>
								<input
									type='file'
									accept='image/*'
									onChange={handleFileSelection}
									style={{ display: 'block', marginBottom: '10px', width: '100%' }}
								/>
								{uploading ? (
									<Spinner color='amber.400' size='lg' />
								) : uploadSuccess && selectedImage ? (
									<Image
										source={{ uri: selectedImage }}
										alt='Uploaded Image'
										size='lg'
										width='100%'
										height={200}
										borderRadius='md'
										style={{ marginBottom: 10 }}
										resizeMode='contain'
									/>
								) : null}

								<input
									type='text'
									placeholder='Product Description'
									value={productDescription}
									onChange={(e) => setProductDescription(e.target.value)}
									style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
								/>

								<select
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									style={{
										width: '100%',
										padding: '8px',
										marginTop: '10px',
										borderRadius: '5px',
										border: '1px solid #ccc',
									}}
								>
									<option  >Select Category</option>
									<option value='1'>Tops</option>
									<option value='2'>Jumpers</option>
									<option value='3'>Trousers</option>
									<option value='4'>Dresses/Skirts</option>
									<option value='5'>Jackets/Coats</option>
								</select>
							</VStack>
						</Modal.Body>
						<Modal.Footer>
							<Button onPress={() => setIsModalVisible(false)}>Close</Button>
							<Button onPress={handleSubmit}>Submit</Button>
						</Modal.Footer>
					</Modal.Content>
				</Modal>

				{selectedImage && uploadSuccess && (
					<Box mt={4}>
						<Image
							source={{ uri: selectedImage }}
							alt='Uploaded Image'
							size='lg'
							width={200}
							height={200}
							borderRadius='md'
						/>
					</Box>
				)}
			</VStack>
		</Box>
	);
}
