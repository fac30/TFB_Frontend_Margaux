const categories = {
    Tops: ["T-shirt", "Blouse", "Hoodie"],
    Trousers: ["Jeans", "Shorts", "Skirt"],
    Shoes: ["Sneakers", "Boots", "Sandals"],
  };
  
  export default function CategoryMenu({ onItemSelect }: { onItemSelect: (item: string) => void }) {
    return (
      <div style={{ border: "1px solid black", padding: "10px" }}>
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h3>{category}</h3>
            <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
              {items.map((item) => (
                <button key={item} onClick={() => onItemSelect(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  