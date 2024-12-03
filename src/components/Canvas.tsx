export default function Canvas({ items }: { items: string[] }) {
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
            <div key={index} style={{ marginBottom: "10px" }}>
              {item}
            </div>
          ))
        )}
      </div>
    );
  }
  