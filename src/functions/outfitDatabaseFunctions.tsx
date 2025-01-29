import supabase from "../utils/supbaseClient";

// interface ClothingItem {
//   item_id: number;
//   item_desc: string;
//   photo_link: string;
//   category_id: number;
// }

// interface OutfitItem {
//   clothing_items: ClothingItem;
// }

// interface SavedOutfit {
//   outfit_id: number;
//   outfit_name: string;
//   outfit_items: OutfitItem[];
// }

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
    console.log("Saving outfit:", { outfitName, itemIds });

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

    console.log("Created outfit:", outfitData);

    const outfitItems = itemIds.map((itemId) => ({
      outfit_id: outfitData.outfit_id,
      item_id: itemId,
    }));

    const { error: itemsError } = await supabase
      .from("outfit_items")
      .insert(outfitItems);

    if (itemsError) {
      console.error("Error creating outfit items:", itemsError);
      await supabase
        .from("outfits")
        .delete()
        .eq("outfit_id", outfitData.outfit_id);
      throw itemsError;
    }

    return true;
  } catch (error) {
    console.error("Error in saveOutfit:", error);
    throw error;
  }
};

// outfitDatabaseFunctions.tsx

export const fetchSavedOutfits = async () => {
  try {
    console.log("Fetching outfits");

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

    // Then delete the outfit itself
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
