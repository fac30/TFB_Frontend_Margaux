import React, { useState } from "react";
import CategoryMenu from "./CategoryMenu";
import Canvas from "./Canvas";

// Define a type for saved outfits
interface SavedOutfit {
  id: string;
  items: { name: string; image: string; x: number; y: number }[];
}

export default function OutfitMakerComponent() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ name: string; image: string; x: number; y: number }[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]); // State to store saved outfits
  const [showSavedOutfits, setShowSavedOutfits] = useState(false); // State to toggle views
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [savedConfirmation, setSavedConfirmation] = useState(false); // State for showing confirmation

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

  // Adds a selected item to the canvas with random position
  const handleItemSelect = (item: { name: string; image: string }) => {
    setSelectedItems((prev) => [
      ...prev,
      {
        ...item,
        x: Math.random() * 400, // Random position for x (within canvas width)
        y: Math.random() * 300, // Random position for y (within canvas height)
      },
    ]);
    setShowMenu(false); // Close menu after item selection
  };

  // Deletes an item from the canvas
  const handleDeleteItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Updates item position after dragging
  const handleUpdateItemPosition = (index: number, x: number, y: number) => {
    setSelectedItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, x, y } : item
      )
    );
  };

  // Handle saving the outfit
  const handleSaveOutfit = () => {
    const newOutfit: SavedOutfit = {
      id: new Date().toISOString(), // Use the current time as a unique id
      items: selectedItems,
    };
    setSavedOutfits((prevOutfits) => [...prevOutfits, newOutfit]);
    setSelectedItems([]); // Clear selected items after saving

    // Show confirmation message
    setSavedConfirmation(true);

    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setSavedConfirmation(false);
    }, 3000);
  };

  // Toggle between create outfit view and saved outfits view
  const toggleSavedOutfitsView = () => {
    setShowSavedOutfits((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Outfit Maker</h1>

      {/* Button to toggle between Create Outfit and Saved Outfits views */}
      <button
        onClick={toggleSavedOutfitsView}
        style={{
          display: "block",
          margin: "0 auto",
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showSavedOutfits ? "Back to Outfit Creation" : "View Saved Outfits"}
      </button>

      {/* Show Saved Outfits Gallery if toggled */}
      {showSavedOutfits ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {savedOutfits.map((outfit) => (
            <div key={outfit.id} style={{ width: "100px", textAlign: "center" }}>
              <img
                src={outfit.items[0]?.image} // Show first item as preview (you can modify this)
                alt={outfit.items[0]?.name}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <p>{outfit.items.length} items</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Button to create a new outfit */}
          <button
            onClick={toggleMenu}
            style={{
              display: "block",
              margin: "0 auto",
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
          <Canvas
            items={selectedItems}
            onDeleteItem={handleDeleteItem}
            onUpdateItemPosition={handleUpdateItemPosition}
          />

          {/* Save Outfit Button */}
          <button
            onClick={handleSaveOutfit}
            style={{
              display: "block",
              margin: "20px auto",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Outfit
          </button>

          {/* Confirmation message */}
          {savedConfirmation && (
            <div
              style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#28a745",
                color: "#fff",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              Outfit Saved Successfully!
            </div>
          )}
        </>
      )}
    </div>
  );
}
