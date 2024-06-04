import { useContext, useEffect, useState } from "react";
import NavDesktop from "../components/NavDesktop/NavDesktop";
import { recuperarEjercicios } from "../utils/Peticiones";
import MainContext from "../context/MainContext";
import toast from "react-hot-toast";
import AddExercise from "./AddExercise.jsx"

export default function ManageUsers() {
    const [ejercicios, setEjercicios] = useState([]);


  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await recuperarEjercicios();
        setEjercicios(response);
        console.log(response)
      } catch (err) {
        console.error("Error al recuperar los ejercicios:", err);
      }
    };

    fetchEjercicios();
  }, []);

  return (
    <div className="flex flex-col h-[100vh]">
      <NavDesktop />
      <div className="bg-teal-400 h-full mt-14">
        <AddExercise />
        <table
            className="table-auto"
        >
          <thead>
            <th>Nombre</th>
            <th>Equipamiento</th>
            <th>Ejecución</th>
            <th>Foto</th>
            <th>Grupo muscular principal</th>
            <th>Musculos secundarios</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            {ejercicios.map((ejercicio) => {
                return (
                    <tr key={`exc-${ejercicio.id}`}>
                      <td>{ejercicio.ejercicio}</td>
                      <td>{ejercicio.equipamiento}</td>
                      <td>{ejercicio.descripcion}</td>
                      <td>
                        <img src={`http://localhost/upload/${ejercicio.foto}`} alt="" />
                      </td>
                      <td>{ejercicio.grupo}</td>
                      <td>{ejercicio.musculos}</td>
                      <td>
                        <button 
                            // onClick={() => handleClickDelete(ejercicio.id)}
                            >
                          Eliminar
                        </button>
                        <button>Editar</button>
                      </td>
                    </tr>
                  );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
