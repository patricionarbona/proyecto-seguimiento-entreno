import { useState, useEffect } from "react";
import { recuperarGrupos } from "../../utils/Peticiones";

export default function SelectorGrupos({ grupo, setGrupo }) { // Recibir grupo y setGrupo como props
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await recuperarGrupos();
        setCategories(response); // Assuming response is an array of category objects
      } catch (err) {
        console.error("Error al recuperar los grupos:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <label htmlFor="category">Categoría:</label>
      <select
        id="category"
        value={grupo} // Usar grupo de las props
        onChange={(e) => setGrupo(e.target.value)} // Usar setGrupo de las props
        required
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.grupo}>
            {cat.grupo}
          </option> // 'cat.grupo' asumo que es el valor correcto
        ))}
      </select>
    </div>
  );
}
