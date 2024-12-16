import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export async function fetchData() {
    try {
        const { data, error } = await supabase
            .from('items')
            .select('*');

        if (error) {
            console.error('Error fetching data:', error);
            return; // Exit if there's an error
        }

        if (!data || data.length === 0) {
            console.warn('No data found');
            return; // Exit if no data is returned
        }

        console.log('Data:', data); // This will log the fetched data
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}
// Call fetchData when needed
 