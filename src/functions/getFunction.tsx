import supabase from "../utils/supbaseClient";

export const filterItemsByCategory = async (categoryId: number) => {
  try {
      const { data, error } = await supabase
          .from('clothing_items')
          .select('item_desc, photo_link')
          .eq('category_id', categoryId)
          .order('item_id', { ascending: true });

      console.log('Category ID:', categoryId);
      console.log('Query result:', { data, error });

      if (error) {
          throw error;
      }

      if (!data) {
          return [];
      }

      // Match the property names expected by PopUpGallery
      return data.map(item => ({
          photo_link: item.photo_link, // Changed from photo to photo_link
          item_desc: item.item_desc    // Changed from description to item_desc
      }));

  } catch (error) {
      console.error('Error fetching items:', error);
      return [];
  }
};