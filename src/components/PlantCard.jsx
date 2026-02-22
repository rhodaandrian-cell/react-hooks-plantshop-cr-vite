function PlantCard({ plant, onSoldOut }) {
  const { id, name, image, price, inStock } = plant;

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>

      {inStock ? (
        <button className="primary" onClick={() => onSoldOut(id)}>
          In Stock
        </button>
      ) : (
        <button disabled>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;