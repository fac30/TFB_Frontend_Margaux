import React from "react";

interface CategoryMenuProps {
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  onCategorySelect: (category: string) => void;
  onBackToCategories: () => void;
  onItemSelect: (item: { name: string; image: string }) => void;
  setSelectedSubCategory: (subCategory: string | null) => void;
}

// const categories = {
//   Tops: {
//     TShirts: [
//       { name: "Red T-Shirt", image: "/images/red-tshirt.png" },
//       { name: "Blue T-Shirt", image: "/images/blue-tshirt.png" },
//     ],
//     Hoodies: [
//       { name: "Grey Hoodie", image: "/images/grey-hoodie.png" },
//       { name: "Black Hoodie", image: "/images/black-hoodie.png" },
//     ],
//   },
//   Bottoms: {
//     Jeans: [
//       { name: "Blue Jeans", image: "/images/blue-jeans.png" },
//       { name: "Black Jeans", image: "/images/black-jeans.png" },
//     ],
//     Shorts: [
//       { name: "Denim Shorts", image: "/images/denim-shorts.png" },
//       { name: "Khaki Shorts", image: "/images/khaki-shorts.png" },
//     ],
//   },
//   Shoes: {
//     Sneakers: [
//       { name: "White Sneakers", image: "/images/white-sneakers.png" },
//       { name: "Black Sneakers", image: "/images/black-sneakers.png" },
//     ],
//     Boots: [
//       { name: "Brown Boots", image: "/images/brown-boots.png" },
//       { name: "Black Boots", image: "/images/black-boots.png" },
//     ],
//   },
// };

const categories: {
  [key in 'Tops' | 'Bottoms' | 'Shoes']: {
    [subCategory: string]: { name: string; image: string }[];
  };
} = {
  Tops: {
    TShirts: [
      { name: "Red T-Shirt", image: "/images/red-tshirt.png" },
      { name: "Blue T-Shirt", image: "/images/blue-tshirt.png" },
    ],
    Hoodies: [
      { name: "Grey Hoodie", image: "/images/grey-hoodie.png" },
      { name: "Black Hoodie", image: "/images/black-hoodie.png" },
    ],
  },
  Bottoms: {
    Jeans: [
      { name: "Blue Jeans", image: "/images/blue-jeans.png" },
      { name: "Black Jeans", image: "/images/black-jeans.png" },
    ],
    Shorts: [
      { name: "Denim Shorts", image: "/images/denim-shorts.png" },
      { name: "Khaki Shorts", image: "/images/khaki-shorts.png" },
    ],
  },
  Shoes: {
    Sneakers: [
      { name: "White Sneakers", image: "/images/white-sneakers.png" },
      { name: "Black Sneakers", image: "/images/black-sneakers.png" },
    ],
    Boots: [
      { name: "Brown Boots", image: "/images/brown-boots.png" },
      { name: "Black Boots", image: "/images/black-boots.png" },
    ],
  },
};


const CategoryMenu: React.FC<CategoryMenuProps> = ({
  selectedCategory,
  selectedSubCategory,
  onCategorySelect,
  onBackToCategories,
  onItemSelect,
  setSelectedSubCategory,
}) => {
  const renderMainCategories = () => (
    <div>
      <h2>Select a Category</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.keys(categories).map((category) => (
          <li key={category}>
            <button
              style={{ margin: "10px", padding: "10px", cursor: "pointer" }}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSubCategories = () => (
    <div>
      <h2>{selectedCategory} Subcategories</h2>
      <button
        style={{ margin: "10px", padding: "10px", cursor: "pointer" }}
        onClick={onBackToCategories}
      >
        Back to Categories
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {/* {Object.keys(categories[selectedCategory!]).map((subCategory) => (
          <li key={subCategory}>
            <button
              style={{ margin: "10px", padding: "10px", cursor: "pointer" }}
              onClick={() => setSelectedSubCategory(subCategory)}
            >
              {subCategory}
            </button>
          </li>
        ))} */}
        {Object.keys(categories[selectedCategory as 'Tops' | 'Bottoms' | 'Shoes']).map((subCategory) => (
  <li key={subCategory}>
    <button
      style={{ margin: "10px", padding: "10px", cursor: "pointer" }}
      onClick={() => setSelectedSubCategory(subCategory)}
    >
      {subCategory}
    </button>
  </li>
))}

      </ul>
    </div>
  );

  const renderItems = () => (
    <div>
      <h2>{selectedSubCategory} Items</h2>
      <button
        style={{ margin: "10px", padding: "10px", cursor: "pointer" }}
        onClick={() => setSelectedSubCategory(null)}
      >
        Back to {selectedCategory}
      </button>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap" }}>
        {categories[selectedCategory!][selectedSubCategory!].map((item) => (
          <li key={item.name} style={{ margin: "10px" }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
              onClick={() => onItemSelect(item)}
            />
            <p style={{ textAlign: "center" }}>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px" }}>
      {selectedCategory ? (
        selectedSubCategory ? (
          renderItems()
        ) : (
          renderSubCategories()
        )
      ) : (
        renderMainCategories()
      )}
    </div>
  );
};

export default CategoryMenu;
