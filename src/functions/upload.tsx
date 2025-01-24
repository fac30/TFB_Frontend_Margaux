import supabase from "../utils/supbaseClient";
import { insertItems } from "./databaseFunctions";

export const uploadImage = async (file: File) => {
  try {
    const { data, error } = await supabase.storage
      .from("photo_link")
      .upload(`images/${file.name}`, file);

    if (error) {
      console.error("Upload error details:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Image upload failed:", error);
    alert("Image upload failed!");
    return false;
  }
};

export const getPublicUrl = async (file: File) => {
  const { data } = await supabase.storage
    .from("photo_link")
    .getPublicUrl(`images/${file.name}`);

  return data?.publicUrl;
};

export const seedDB = async (file: File, cat_id: number, item_desc: string) => {
  try {
    const successLoad = await uploadImage(file);
    if (!successLoad) {
      throw new Error("upload failed");
    }

    const url = await getPublicUrl(file);
    if (!url) {
      throw new Error("url failed");
    }

    const newData = {
      category_id: cat_id,
      item_desc: item_desc,
      photo_link: url,
    };

    console.log("Attempting to insert:", newData);
    const insert = await insertItems("clothing_items", newData);

    if (!insert) {
      console.error("Insert returned false");
      throw new Error("insert failed");
    }

    console.log("Insert successful:", insert);
    return true;
  } catch (err) {
    console.error("Error in seedDB:", err);
    return false;
  }
};
