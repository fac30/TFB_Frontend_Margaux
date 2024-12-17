export const uploadImage = async (file: File, category: string, description: string) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    formData.append('description', description);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    console.log("Image uploaded successfully:", {
      name: file.name,
      category,
      description
    });
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Upload failed:", error.message);
      alert(error.message);
    } else {
      console.error("Upload failed: An unknown error occurred");
      alert("Upload failed: An unknown error occurred");
    }
    return false;
  }
};