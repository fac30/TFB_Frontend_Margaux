import React, { useState } from "react";
import CategoryMenu from "./CategoryMenu";
import Canvas from "./Canvas";

export default function OutfitMakerComponent() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Toggles the visibility of the category menu
  const toggleMenu = () => setShowMenu((prev) => !prev);

  // Adds a selected item to the canvas
  const handleItemSelect = (item: string) => {
    setSelectedItems((prev) => [...prev, item]);
    setShowMenu(false); // Close menu after item selection
  };

  // Deletes an item from the canvas
  const handleDeleteItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Outfit Maker</h1>

      {/* Button to open the menu */}
      <button onClick={toggleMenu} style={{ marginBottom: "20px" }}>
        + Create Your Outfit
      </button>

      {/* Show the category menu when toggled */}
      {showMenu && <CategoryMenu onItemSelect={handleItemSelect} />}

      {/* Canvas to display selected items */}
      <Canvas items={selectedItems} onDeleteItem={handleDeleteItem} />
    </div>
  );
}
