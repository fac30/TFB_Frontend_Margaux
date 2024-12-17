# Inside My Closet

The In My Closet Project is an innovative application designed to promote sustainable fashion choices by helping users manage their wardrobe efficiently. Through features like outfit planning, wardrobe categorization, and AI-powered sustainability tips, we empower users to make the most of their existing clothes and reduce impulse purchases. The application allows users to track their clothing items, create and save outfit combinations, and access educational content about sustainable fashion practices. By encouraging users to shop their own wardrobe first and make informed decisions about new purchases, we help reduce textile waste and combat fast fashion's environmental impact. Our platform combines practical organization tools with sustainability education, creating a mindful approach to personal style that benefits both the user and the planet.

# Table of Contents:

- [Getting Started](#getting-started)
- [Pages Overview](#pages-overview)
- [Key Components](#key-components)



## Features

- 📱 **Progressive Web App (PWA)** - Install on any device
- 🎨 **Clean, modern UI** with Inter font
- 🔄 **Automatic updates**
- 🌐 **Cross-platform compatibility**
- 🗄️ **Backend Storage**: Utilizes Supabase for storing backend data and images, seamlessly integrated with the frontend.



## **Features - In App**
- **Wardrobe Management**: Add, edit, and remove clothing items in a virtual closet.  
- **Outfit Creation**: Build, save, and view custom outfits from cataloged wardrobe items.  
- **Sustainability Insights**: Access guides and tips on eco-friendly fashion, along with AI-powered Q&A support.



## Tech Stack

- React 18
- TypeScript
- Vite
- Native Base
- React Router DOM
- PWA (Vite PWA Plugin)
- Supabase (for backend storage and image management)


---



## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fac30/inside-my-closet.git
   cd inside-my-closet
   ```

2. Install dependencies:

   ```bash
   npm install
   npm i
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Building for Production

```bash
npm run build
# or
yarn build
### Contributing:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
### License:
This project is licensed under the Unlicense - see the LICENSE file for details.

---



### Acknowledgments:
- **Font**: Inter by Google Fonts
- **Icons**: Heroicons

## Environment Setup

1. Create a `.env` file in the root directory
2. Add the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Testing

Run the test suite:
```bash
npm run test
# or
yarn test
```

## Troubleshooting

### Common Issues

1. **Image Upload Fails**
   - Check your Supabase storage bucket permissions
   - Verify file size is under the maximum limit

2. **Development Server Issues**
   - Clear your browser cache
   - Remove node_modules and reinstall dependencies

## API Documentation

### Authentication Endpoints

- POST `/auth/login`
- POST `/auth/register`

See our [API Documentation](./docs/API.md) for detailed endpoints and examples.

---



## **Pages Overview**

### **Homepage (`Home.tsx`)**
- Displays the *In My Closet* logo as a splash screen.  
- Features an instructional guide introducing the navigation bar icons.

### **Closet Page**
- Users interact with a virtual closet divided into categories (e.g., tops, bottoms, coats).  
-these categories are buttons that you can actually click on.
-once these buttons are clicked you will then see the images that are saved via supabase.
-from there you can see the products you like and go the outfit maker page and save a outfit. 
- **User Journey**:  
  1. Click a category (e.g., tops).  
  2. View cataloged items or add new ones using the **+ button**.  
  3. Add items via camera upload with automatic background removal.  

### **Outfit Maker Page**
- **Features**:  
  - Create outfits by selecting items from wardrobe categories.  
  - Customize a canvas for outfit creation.  
  - Delete unwanted items before saving outfits.  
  - Saved outfits are accessible in a dedicated section with detailed previews.

### **Sustainability Page**
- Dynamic articles provide guidance on sustainable fashion practices.  
- Categories (e.g., "Clothes Swaps") lead to detailed pages with tips and insights.  
- Includes an AI feature to answer user questions about sustainability.
-These articles are here for imformational reasons and to teach people about the importance of sustainability

---

## **Key Components**

### **Navigation Bar**
- Mobile-first design, located and fixed at the bottom of the screen.  
- Features three icons: 
-also has a back button which allows you to go back to the home page and pick the next part you want to be looking in to and exploring wether thats looking in the wardrobe or saving a new outfit  
  - Closet (renders ClosetPage component).  
  - Outfit (renders OutfitMaker component).  
  - Leaf (Eco Advice - renders Sustainability component).  
- Renders components conditionally without navigating between pages.

### **Buttons**
- Styled using Native Base for consistent design and dynamic updates via `native-base-config.ts`.
-also buttons inside of the wardrobe that take you to the saved photos

---

## **Considerations**

### **Accessibility**
- Native Base ensures accessibility compliance for components.  
- Color schemes are verified through [colorshark.io](https://colorshark.io).  
-tried to add buttons in thewardrobe so that people who are visually impaired are tabbing through can know what they are doing 


### **Styling**
- **Library**: Native Base (ensures consistency and mobile-first design).  
- **Colors**: Derived from the app's logo, checked for readability and accessibility.  

---

## **Conclusion**
Thank you for exploring the *In My Closet* project!  

We aim to provide a visually engaging and user-friendly platform for eco-conscious fashionistas 💅. Together, let's reduce reliance on fast fashion by reusing what we own and exploring sustainable options.  

Feel free to contribute, raise issues, or suggest improvements. Let's evolve this project together! 🚀  

If you enjoyed this project, don't forget to ⭐️ star the repository on GitHub!
```



## **Pages Overview**

### **Homepage (`Home.tsx`)**
- Displays the *In My Closet* logo as a splash screen.  
- Features an instructional guide introducing the navigation bar icons.

### **Closet Page**
- Users interact with a virtual closet divided into categories (e.g., tops, bottoms, coats).  
-these categories are buttons that you can actually click on.
-once these buttons are clicked you will then see the images that are saved via supabase.
-from there you can see the products you like and go the outfit maker page and save a outfit. 
- **User Journey**:  
  1. Click a category (e.g., tops).  
  2. View cataloged items or add new ones using the **+ button**.  
  3. Add items via camera upload with automatic background removal.  

### **Outfit Maker Page**
- **Features**:  
  - Create outfits by selecting items from wardrobe categories.  
  - Customize a canvas for outfit creation.  
  - Delete unwanted items before saving outfits.  
  - Saved outfits are accessible in a dedicated section with detailed previews.

### **Sustainability Page**
- Dynamic articles provide guidance on sustainable fashion practices.  
- Categories (e.g., "Clothes Swaps") lead to detailed pages with tips and insights.  
- Includes an AI feature to answer user questions about sustainability.
-These articles are here for imformational reasons and to teach people about the importance of sustainability

---

## **Key Components**

### **Navigation Bar**
- Mobile-first design, located and fixed at the bottom of the screen.  
- Features three icons: 
-also has a back button which allows you to go back to the home page and pick the next part you want to be looking in to and exploring wether thats looking in the wardrobe or saving a new outfit  
  - Closet (renders ClosetPage component).  
  - Outfit (renders OutfitMaker component).  
  - Leaf (Eco Advice - renders Sustainability component).  
- Renders components conditionally without navigating between pages.

### **Buttons**
- Styled using Native Base for consistent design and dynamic updates via `native-base-config.ts`.
-also buttons inside of the wardrobe that take you to the saved photos

---

## **Considerations**

### **Accessibility**
- Native Base ensures accessibility compliance for components.  
- Color schemes are verified through [colorshark.io](https://colorshark.io).  


### **Styling**
- **Library**: Native Base (ensures consistency and mobile-first design).  
- **Colors**: Derived from the app's logo, checked for readability and accessibility.  

---

## **Conclusion**
Thank you for exploring the *In My Closet* project!  

We aim to provide a visually engaging and user-friendly platform for eco-conscious fashionistas 💅. Together, let's reduce reliance on fast fashion by reusing what we own and exploring sustainable options.  

Feel free to contribute, raise issues, or suggest improvements. Let's evolve this project together! 🚀  

If you enjoyed this project, don't forget to ⭐️ star the repository on GitHub!