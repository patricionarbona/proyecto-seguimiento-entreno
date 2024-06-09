import { useState } from "react";
import { crearEjercicio } from "../utils/Peticiones";
import SelectorGrupos from "../components/Selectores/SelectorGrupos";
import toast from "react-hot-toast";

export default function AddExercise() {
  const [nombre, setNombre] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [foto, setFoto] = useState(null);
  const [musculos, setMusculos] = useState("");
  const [equipamiento, setEquipamiento] = useState("");
  const [grupo, setGrupo] = useState(""); // Añadir estado para el grupo

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("observaciones", observaciones);
    formData.append("foto", foto);
    formData.append("musculos", musculos);
    formData.append("equipamiento", equipamiento);
    formData.append("grupo", grupo); // Añadir grupo al formData

    crearEjercicio(formData)
      .then((response) => {
        console.log("Ejercicio creado:", response);
        toast.success("Ejercicio creado");
      })
      .catch((error) => {
        console.error("Error al crear el ejercicio:", error);
      });
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  return (
    // <div className="flex flex-row justify-between w-full bg-slate-300">
      <form
        action="api.php"
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="flex md:w-full justify-evenly md:items-center flex-col md:flex-row gap-4 mx-auto"
        >
        <h2
          className=""
        >Crear Ejercicio</h2>
        <div
            className="flex flex-col md:flex-row items-start md:items-center"
        >
          <label htmlFor="nombre">Nombre</label>
          <input
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div
        className="flex flex-col md:flex-row items-start md:items-center"
        >
          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1 py-2"
          />
        </div>
        <div
        className="flex flex-col md:flex-row items-start md:items-center"
        >
          <label htmlFor="foto">Foto</label>
          <input
            className="md:ml-2 w-60 h-8"
            type="file"
            id="foto"
            name="exercisePhoto"
            onChange={handleFileChange}
            required
          />
        </div>
        <div
        className="flex flex-col md:flex-row items-start md:items-center"
        >
          <label htmlFor="musculos">Músculos</label>
          <input
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
            type="text"
            id="musculos"
            value={musculos}
            onChange={(e) => setMusculos(e.target.value)}
            required
          />
        </div>
        <div
        className="flex flex-col md:flex-row items-start md:items-center"
        >
          <label htmlFor="equipamiento">Equipamiento</label>
          <input
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
            type="text"
            id="equipamiento"
            value={equipamiento}
            onChange={(e) => setEquipamiento(e.target.value)}
            required
          />
        </div>
        <SelectorGrupos grupo={grupo} setGrupo={setGrupo} variant="d" />{" "}
        {/* Pasar grupo y setGrupo como props */}
        <button
          type="submit"
          className="border-2 border-blue-400 bg-blue-400 py-1 rounded text-gray-50 hover:bg-blue-300 px-1 text-base"
        >
          Crear Ejercicio
        </button>
      </form>
    // </div>
  );
}
