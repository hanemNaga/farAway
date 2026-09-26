export default function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed);
  const percentage = Math.round((packedItems.length / items.length) * 100);
  if (!items.length) {
    return <footer className="stats">Add some items</footer>;
  }
  return items.length === packedItems.length ? (
    <footer className="stats"> everything packed ✈️</footer>
  ) : (
    <footer className="stats">
      <em>
        you have {items.length} items on your list , and you already packed{" "}
        {packedItems.length}({percentage}%)
      </em>
    </footer>
  );
}
