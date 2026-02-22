import PlantCard from "./PlantCard";

function PlantList({ plants, onSoldOut }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onSoldOut={onSoldOut} />
      ))}
    </ul>
  );
}

export default PlantList;