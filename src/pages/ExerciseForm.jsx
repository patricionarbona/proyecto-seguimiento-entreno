import React, { useState, useEffect } from 'react';
import { crearEjercicio, recuperarGrupos } from '../utils/Peticiones';

const ExerciseForm = () => {
  const [exerciseName, setExerciseName] = useState('');
  const [exercisePhoto, setExercisePhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('exerciseName', exerciseName);
    formData.append('exercisePhoto', exercisePhoto);
    formData.append('description', description);
    formData.append('category', category);
    try {
      const response = await crearEjercicio(formData)
      console.log(response)
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
    // Aquí puedes manejar el envío de los datos, por ejemplo enviarlos a un servidor o guardarlos en el estado global
    console.log({
      exerciseName,
      exercisePhoto,
      description,
      categories
    });
  };

  const handlePhotoChange = (e) => {
    setExercisePhoto(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="exerciseName">Nombre del ejercicio:</label>
        <input
          type="text"
          id="exerciseName"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="exercisePhoto">Foto del ejercicio:</label>
        <input
          type="file"
          id="exercisePhoto"
          onChange={handlePhotoChange}
        />
      </div>
      
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          value={category} // Debe ser 'category' porque este es el estado para la categoría seleccionada
          onChange={(e) => setCategory(e.target.value)} // Debe actualizar 'category'
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.grupo}>{cat.grupo}</option> // 'cat.grupo' asumo que es el valor correcto
          ))}
        </select>

      </div>
      
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ExerciseForm;
