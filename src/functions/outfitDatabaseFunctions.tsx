import supabase from "../utils/supbaseClient";

// Fetch all items for a specific category
export const fetchItemsByCategory = async (categoryId: number, userId: number) => {
  try {
    const { data, error } = await supabase
      .from('clothing_items')
      .select('item_id, item_desc, photo_link, category_id')
      .eq('category_id', categoryId)
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

// Save a new outfit
export const saveOutfit = async (
  userId: number,
  outfitName: string,
  itemIds: number[]
) => {
  try {
    // First, create the outfit
    const { data: outfitData, error: outfitError } = await supabase
      .from('outfits')
      .insert([
        { user_id: userId, outfit_name: outfitName }
      ])
      .select('outfit_id')
      .single();

    if (outfitError) throw outfitError;

    // Then, create outfit_items entries
    const outfitItems = itemIds.map(itemId => ({
      outfit_id: outfitData.outfit_id,
      item_id: itemId
    }));

    const { error: itemsError } = await supabase
      .from('outfit_items')
      .insert(outfitItems);

    if (itemsError) throw itemsError;

    return outfitData.outfit_id;
  } catch (error) {
    console.error('Error saving outfit:', error);
    return null;
  }
};

// Fetch saved outfits with their items
export const fetchSavedOutfits = async (userId: number) => {
  try {
    // First get all outfits for the user
    const { data: outfits, error: outfitsError } = await supabase
      .from('outfits')
      .select(`
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
      `)
      .eq('user_id', userId);

    if (outfitsError) throw outfitsError;

    return outfits || [];
  } catch (error) {
    console.error('Error fetching outfits:', error);
    return [];
  }
};

// Delete an outfit
export const deleteOutfit = async (outfitId: number) => {
  try {
    const { error } = await supabase
      .from('outfits')
      .delete()
      .eq('outfit_id', outfitId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting outfit:', error);
    return false;
  }
};