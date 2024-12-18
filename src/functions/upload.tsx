import supabase from '../supbaseClient';
import { insertItems } from './databaseFunctions';

export const uploadImage = async (file: File) => {
	try {
		const { data, error } = await supabase.storage
			.from('photo_link')
			.upload(`images/${file.name}`, file);

		if (error) throw error;

		return data;
	} catch (error) {
		alert('Image upload failed!');
		return false;
	}
};

export const getPublicUrl = async (file: File) => {
	const { data } = await supabase.storage
		.from('photo_link')
		.getPublicUrl(`images/${file.name}`);

	return data?.publicUrl;
};

export const seedDB = async (file: File, cat_id: number, item_desc: string) => {
	try {
		const successLoad = uploadImage(file);
		if (!successLoad) {
			throw new Error('upload failed ');
		}
	 
		const url = await getPublicUrl(file);
		if (!url) {
			throw new Error('url failed ');
		}
		 
        const user_id = 1; // Replace with the actual user ID you're using

        const newData = { 
            user_id: user_id, 
            category_id: cat_id, 
            item_desc: item_desc,
            photo_link: url 
        };

        const insert = await insertItems('clothing_items', newData);
        if (!insert) {
            throw new Error('insert failed');
        }

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};
