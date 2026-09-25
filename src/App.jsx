import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleNewItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeletedItem(id) {
    setItems((items) => items.filter((item) => item.id != id));
  }
  function handleCheck(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleNewItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeletedItem}
        onchecked={handleCheck}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>✈️🏝️ Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your 🤩 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onchecked }) {
  const [sortBy, setSort] = useState("input");
  let sortedItems;
  if (sortBy === "input") {
    sortedItems = items;
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onchecked={onchecked}
          />
        ))}
      </ul>
      <select
        className="actions"
        value={sortBy}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="input">Input Items</option>
        <option value="packed">Packed Items</option>
        <option value="description">sort by description</option>
      </select>
    </div>
  );
}
function Stats({ items }) {
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
function Item({ item, onDeleteItem, onchecked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onchecked(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
