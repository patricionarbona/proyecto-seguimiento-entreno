import { useState, useEffect } from "react";
import { recuperarEquipamientos } from "../../utils/Peticiones";

export default function SelectorEquipamientos({ equipamiento, setEquipamiento }) { // Recibir grupo y setGrupo como props
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await recuperarEquipamientos();
        setCategories(response); // Assuming response is an array of category objects
      } catch (err) {
        console.error("Error al recuperar los equipamientos:", err);
      }
    };
    fetchEquipment();
  }, []);

  return (
    <div>
      <label htmlFor="equipamiento">Categoría:</label>
      <select
        id="equipamiento"
        value={equipamiento} // Usar grupo de las props
        onChange={(e) => setEquipamiento(e.target.value)} // Usar setGrupo de las props
        required
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.equipamiento}>
            {cat.equipamiento}
          </option> // 'cat.grupo' asumo que es el valor correcto
        ))}
      </select>
    </div>
  );
}
