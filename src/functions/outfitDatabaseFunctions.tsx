import supabase from "../utils/supbaseClient";

export const fetchItemsByCategory = async (categoryId: number) => {
  try {
    console.log("Fetching items for category:", categoryId);
    const { data, error } = await supabase
      .from("clothing_items")
      .select("*")
      .eq("category_id", categoryId);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Fetched items:", data);
    return data || [];
  } catch (error) {
    console.error("Error in fetchItemsByCategory:", error);
    throw error;
  }
};

export const saveOutfit = async (outfitName: string, itemIds: number[]) => {
  try {
    const { data: outfitData, error: outfitError } = await supabase
      .from("outfits")
      .insert([
        {
          outfit_name: outfitName,
        },
      ])
      .select()
      .single();

    if (outfitError) {
      console.error("Error creating outfit:", outfitError);
      throw outfitError;
    }

    if (!outfitData) {
      throw new Error("No outfit data returned after insert");
    }

    const outfitItems = itemIds.map((itemId) => ({
      outfit_id: outfitData.outfit_id,
      item_id: itemId,
    }));

    const { error: itemsError } = await supabase
      .from("outfit_items")
      .insert(outfitItems);

    if (itemsError) {
      await supabase
        .from("outfits")
        .delete()
        .eq("outfit_id", outfitData.outfit_id);
      throw itemsError;
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// outfitDatabaseFunctions.tsx

export const fetchSavedOutfits = async () => {
  try {
    const { data, error } = await supabase.from("outfits").select(
      `
        outfit_id,
        outfit_name,
        outfit_items (
          clothing_items (
            item_id,
            item_desc,
            photo_link,
            category_id
          )
        )
      `
    );

    if (error) throw error;

    const transformedOutfits =
      data?.map((outfit) => ({
        ...outfit,
        outfit_items: outfit.outfit_items.filter(
          (item) => item.clothing_items !== null
        ),
      })) || [];

    return transformedOutfits;
  } catch (error) {
    console.error("Error in fetchSavedOutfits:", error);
    throw error;
  }
};
export const deleteOutfit = async (outfitId: number) => {
  try {
    // First, delete all related outfit items
    const { error: itemsError } = await supabase
      .from("outfit_items")
      .delete()
      .eq("outfit_id", outfitId);

    if (itemsError) {
      console.error("Error deleting outfit items:", itemsError);
      throw itemsError;
    }

    const { error: outfitError } = await supabase
      .from("outfits")
      .delete()
      .eq("outfit_id", outfitId);

    if (outfitError) {
      console.error("Error deleting outfit:", outfitError);
      throw outfitError;
    }
  } catch (error) {
    console.error("Error in deleteOutfit:", error);
    throw error;
  }
};
