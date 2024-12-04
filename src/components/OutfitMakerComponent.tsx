import React, { useState } from "react";
import CategoryMenu from "./CategoryMenu";
import Canvas from "./Canvas";

export default function OutfitMakerComponent() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ name: string; image: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  // Toggles the visibility of the category menu
  const toggleMenu = () => setShowMenu((prev) => !prev);

  // Sets the category and shows sub-categories
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null); // Reset selected subcategory when category changes
  };

  // Resets to the top-level categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  // Adds a selected item to the canvas
  const handleItemSelect = (item: { name: string; image: string }) => {
    setSelectedItems((prev) => [...prev, item]);
    setShowMenu(false); // Close menu after item selection (if intended)
  };

  // Deletes an item from the canvas
  const handleDeleteItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Outfit Maker</h1>

      {/* Button to open the menu */}
      <button
        onClick={toggleMenu}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        + Create Your Outfit
      </button>

      {/* Show the category menu when toggled */}
      {showMenu && (
        <CategoryMenu
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onBackToCategories={handleBackToCategories}
          onItemSelect={handleItemSelect}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      )}

      {/* Canvas to display selected items */}
      <Canvas items={selectedItems} onDeleteItem={handleDeleteItem} />
    </div>
  );
}
