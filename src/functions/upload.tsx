export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    console.log("Image uploaded successfully:", file.name);
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