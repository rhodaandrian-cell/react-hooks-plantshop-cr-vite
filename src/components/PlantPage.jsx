import { useEffect, useMemo, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const BASE_URL = "http://localhost:6001";
const PLANTS_URL = `${BASE_URL}/plants`;

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // 1) fetch all plants on load
  useEffect(() => {
    fetch(PLANTS_URL)
      .then((r) => r.json())
      .then((data) => {
        // ensure inStock exists for the UI toggle
        const withStock = data.map((p) => ({
          ...p,
          inStock: p.inStock ?? true,
        }));
        setPlants(withStock);
      })
      .catch((err) => {
        console.error("Failed to fetch plants:", err);
      });
  }, []);

  // 2) add a plant after POST returns the created plant
  function handleAddPlant(createdPlant) {
    setPlants((prev) => [
      ...prev,
      { ...createdPlant, inStock: createdPlant.inStock ?? true },
    ]);
  }

  // 3) mark plant sold out (non-persisting)
  function handleSoldOut(id) {
    setPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: false } : p))
    );
  }

  // 4) search filter
  const visiblePlants = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q === "") return plants;
    return plants.filter((p) => p.name.toLowerCase().includes(q));
  }, [plants, search]);

  return (
    <main>
      <NewPlantForm apiUrl={PLANTS_URL} onAddPlant={handleAddPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList plants={visiblePlants} onSoldOut={handleSoldOut} />
    </main>
  );
}

export default PlantPage;