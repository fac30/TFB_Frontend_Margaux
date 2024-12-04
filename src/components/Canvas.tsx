export default function Canvas({
    items,
    onDeleteItem,
  }: {
    items: { name: string; image: string }[];
    onDeleteItem: (index: number) => void;
  }) {
    return (
      <div
        style={{
          border: "2px dashed gray",
          height: "300px",
          margin: "20px 0",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <h3>Your Outfit</h3>
        {items.length === 0 ? (
          <p>No items selected yet. Start building your outfit!</p>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  border: "1px solid gray",
                }}
              />
              <button
                onClick={() => onDeleteItem(index)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
  