import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./packinglist";
import Stats from "./stats";

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
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?",
    );
    if (!confirmed) return;
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleNewItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeletedItem}
        onchecked={handleCheck}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
