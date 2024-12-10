import React from "react";

interface CategoryMenuProps {
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  onCategorySelect: (category: string) => void;
  onBackToCategories: () => void;
  onItemSelect: (item: { name: string; image: string }) => void;
  setSelectedSubCategory: (subCategory: string | null) => void;
}

const categories: Record<
  "Tops" | "Bottoms" | "Shoes",
  Record<string, { name: string; image: string }[]>
> = {
  Tops: {
    TShirts: [
      { name: "Red T-Shirt", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/465751/item/goods_17_465751_3x4.jpg?width=400" },
      { name: "Blue T-Shirt", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/465751/item/goods_61_465751_3x4.jpg?width=400" },
    ],
    Hoodies: [
      { name: "Grey Hoodie", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/475855/sub/goods_475855_sub14_3x4.jpg?width=400" },
      { name: "Black Hoodie", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/456261/item/goods_09_456261_3x4.jpg?width=400" },
    ],
  },
  Bottoms: {
    Jeans: [
      { name: "Blue Jeans", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/464744/item/goods_64_464744_3x4.jpg?width=400" },
      { name: "Black Jeans", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/471374/sub/goods_471374_sub14_3x4.jpg?width=400" },
    ],
    Shorts: [
      { name: "Denim Shorts", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/464945001/sub/goods_464945001_sub14_3x4.jpg?width=400" },
      { name: "Khaki Shorts", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/467052/item/goods_33_467052_3x4.jpg?width=400" },
    ],
  },
  Shoes: {
    Sneakers: [
      { name: "White Sneakers", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/340740/3407401060_zm.jpg" },
      { name: "Black Sneakers", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/190032/1900327270_zm.jpg" },
    ],
    Boots: [
      { name: "Brown Boots", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/149501/1495016020_zm.jpg" },
      { name: "Black Boots", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/141179/1411797060_zm.jpg" },
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
        {Object.keys(categories[selectedCategory as "Tops" | "Bottoms" | "Shoes"]).map(
          (subCategory) => (
            <li key={subCategory}>
              <button
                style={{ margin: "10px", padding: "10px", cursor: "pointer" }}
                onClick={() => setSelectedSubCategory(subCategory)}
              >
                {subCategory}
              </button>
            </li>
          )
        )}
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
        {categories[selectedCategory as "Tops" | "Bottoms" | "Shoes"][
          selectedSubCategory!
        ].map((item) => (
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
