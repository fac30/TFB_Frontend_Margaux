import supabase from "../supbaseClient";

export const uploadImage = async (file: File) => {
  try {
    const { error } = await supabase.storage
      .from("photo_link") // Replace with your Supabase bucket name
      .upload(`images/${file.name}`, file);

    if (error) throw error;

    console.log("Image uploaded successfully:", file.name);
    return true; // Indicate success
  } catch (error) {
    console.error("Upload failed:", error.message);
    alert("Image upload failed!");
    return false; // Indicate failure
  }
};