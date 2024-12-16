import supabase from "../utils/supbaseClient";

const fetchAllOutfitItems = async () => {
  try {
    const { data, error } = await supabase.from("outfit_items").select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    return "There was an error fetching outfit items: " + err.message;
  }
};

export { fetchAllOutfitItems };
