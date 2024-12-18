
export const uploadImage = async (file: File, category: string, description: string) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    formData.append('description', description);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    console.log("Image uploaded successfully:", {
      name: file.name,
      category,
      description
    });
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Upload failed:", error.message);
      alert(error.message);
    } else {
      console.error("Upload failed: An unknown error occurred");
      alert("Upload failed: An unknown error occurred");
    }
    return false;
  }
};
 
import supabase from '../supbaseClient';
import {insertItems} from './databaseFunctions';

export const uploadImage = async (file: File) => {
	try {
		const { data, error } = await supabase.storage
			.from('photo_link') // Replace with your Supabase bucket name
            .upload(`images/${file.name}`, file);
    
		if (error) throw error;

		//console.log('Image uploaded successfully:', file.name);
		//console.log('Data:', data);
		return data; // Indicate success
	} catch (error) {
		//console.error('Upload failed:', error.message);
		alert('Image upload failed!');
		return false; // Indicate failure
	}
};

export const getPublicUrl = async (file: File) => {
	const { data } = await supabase.storage
		.from('photo_link')
		.getPublicUrl(`images/${file.name}`);

	//console.log('Public URL:', data?.publicUrl); // Log the public URL
	return data?.publicUrl; // Return the public URL if needed
};


export const seedDB = async (file: File, cat_id: number) => {
    try {
        const successLoad = uploadImage(file);
        if (!successLoad) {
            throw new Error('upload failed ')
        }
        successLoad.then(res=>console.log(res))
        const url = await getPublicUrl(file);
        if (!url) {
            throw new Error('url failed ')
        }
        console.log(url)
        const newData = {photo_link: url,
            category_id: cat_id,
            item_desc: 'test3'
        }
        console.log(newData);
        const insert = await insertItems('clothing_items', newData)
        if (!insert) {
            throw new Error('insert failed ')
        }
        insert.then(res=>console.log(res.status))
        return true;
    }catch (err) { return err.message}
}
 
