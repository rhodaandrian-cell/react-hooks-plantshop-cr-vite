import { useState } from "react";

function NewPlantForm({ apiUrl, onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name: name.trim(),
      image: image.trim(),
      price: Number(price),
    };

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((created) => {
        onAddPlant(created);
        setName("");
        setImage("");
        setPrice("");
      })
      .catch((err) => {
        console.error("Failed to create plant:", err);
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="primary" type="submit">
          Add Plant
        </button>
      </form>
    </div>
  );
}

export default NewPlantForm;