import { useState } from "react";
import Item from "./item";
export default function PackingList({
  items,
  onDeleteItem,
  onchecked,
  handleClearList,
}) {
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
      <div className="actions">
        <select
          className="actions"
          value={sortBy}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="input">Input Items</option>
          <option value="packed">Packed Items</option>
          <option value="description">sort by description</option>
        </select>
        <button onClick={handleClearList}>Clear</button>
      </div>
    </div>
  );
}
