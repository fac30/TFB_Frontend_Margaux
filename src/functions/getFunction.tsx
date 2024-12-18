import supabase from "../utils/supbaseClient";

// Simple function to get all items from a category
export const filterItemsByCategory = async (categoryId: number) => {
    try {
        // Basic select with specific columns and category filter
        const { data, error } = await supabase
            .from('clothing_items')
            .select('item_desc, photo_link')  // Only select what we need
            .eq('category_id', categoryId)
            .order('item_id', { ascending: true });  // Optional: order by ID

        // Log for debugging
        console.log('Category ID:', categoryId);
        console.log('Query result:', { data, error });

        if (error) {
            throw error;
        }

        // Return empty array if no data
        if (!data) {
            return [];
        }

        // Map to the format needed by the UI
        return data.map(item => ({
            photo: item.photo_link,
            description: item.item_desc
        }));

    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
};

// Simple test function for debugging
export const testDatabaseConnection = async () => {
    try {
        // Test basic select
        const { data, error } = await supabase
            .from('clothing_items')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Database error:', error);
            return false;
        }

        console.log('Test query result:', data);
        return true;

    } catch (error) {
        console.error('Connection test failed:', error);
        return false;
    }
};

// // Optional: Function to get categories
// export const getCategories = async () => {
//     try {
//         const { data, error } = await supabase
//             .from('categories')
//             .select('*')
//             .order('category_id');

//         if (error) {
//             throw error;
//         }

//         return data || [];
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         return [];
//     }
// };