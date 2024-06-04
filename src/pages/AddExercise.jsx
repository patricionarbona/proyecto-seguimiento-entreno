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
    <div className="flex flex-row w-full">
      <h2>Crear Ejercicio</h2>
      <form
        action="api.php"
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="flex"
      >
        <div
            className="flex"
        >
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div
        className="flex"
        >
          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <div
        className="flex"
        >
          <label htmlFor="foto">Foto</label>
          <input
            type="file"
            id="foto"
            name="exercisePhoto"
            onChange={handleFileChange}
            required
          />
        </div>
        <div
        className="flex"
        >
          <label htmlFor="musculos">Músculos</label>
          <input
            type="text"
            id="musculos"
            value={musculos}
            onChange={(e) => setMusculos(e.target.value)}
            required
          />
        </div>
        <div
        className="flex"
        >
          <label htmlFor="equipamiento">Equipamiento</label>
          <input
            type="text"
            id="equipamiento"
            value={equipamiento}
            onChange={(e) => setEquipamiento(e.target.value)}
            required
          />
        </div>
        <SelectorGrupos grupo={grupo} setGrupo={setGrupo} />{" "}
        {/* Pasar grupo y setGrupo como props */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Crear Ejercicio
        </button>
      </form>
    </div>
  );
}
