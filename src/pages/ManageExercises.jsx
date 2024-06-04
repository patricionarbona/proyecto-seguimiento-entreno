import { useContext, useEffect, useState } from "react";
import NavDesktop from "../components/NavDesktop/NavDesktop";
import { borrarEjercicio, recuperarEjercicios } from "../utils/Peticiones";
import MainContext from "../context/MainContext";
import toast from "react-hot-toast";
import AddExercise from "./AddExercise.jsx";

export default function ManageUsers() {
  const [ejercicios, setEjercicios] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [changeEjercicio, setChangeEjercicio] = useState({
    id: null,
    ejercicio: null,
    equipamiento: null,
    grupo: null,
    musculos: null,
  });

  const handleClickDelete = (ejercicioId) => {
    console.log(ejercicioId);
    const deleteUsuario = async (ejercicioId) => {
      try {
        const response = await borrarEjercicio(ejercicioId);
        if (response.message === "Eliminado el ejercicio") {
          toast.success("Eliminado el ejercicio");
          setEjercicios((prevEjercicios) =>
            prevEjercicios.filter((ejercicio) => ejercicio.id !== ejercicioId)
          );
        } else {
          toast.error("No se pudo eliminar el usuario");
        }
        console.log(response);
      } catch (err) {
        console.error("Error al recuperar los ejercicios:", err);
      }
    };

    deleteUsuario(ejercicioId);
  };

  const handleClickEdit = (ejercicioId) => {
    console.log("Editar", ejercicioId);
    const ejercicio = ejercicios.find((ej) => ej.id === ejercicioId);
    if (ejercicio) {
      setIsEdit(ejercicioId);
    }
  };

  const handleCancelEdit = () => {
    setIsEdit(null);
    setChangeEjercicio({
      id: null,
      ejercicio: null,
      equipamiento: null,
      grupo: null,
      musculos: null,
    });
  };

  const handleConfirmEdit = (ejercicioId) => {
    setChangeEjercicio((prev) => ({
      ...prev,
      id: ejercicioId,
    }))
    console.log(changeEjercicio)
  }

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await recuperarEjercicios();
        setEjercicios(response);
        console.log(response);
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
        <table className="table-auto">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Equipamiento</th>
              <th>Ejecución</th>
              <th>Foto</th>
              <th>Grupo muscular principal</th>
              <th>Musculos secundarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ejercicios.map((ejercicio) => {
              return (
                <tr key={`exc-${ejercicio.id}`}>
                  <td>
                    {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.ejercicio}
                        value={changeEjercicio.ejercicio || ""}
                        onChange={(e) =>
                          setChangeEjercicio((prev) => ({
                            ...prev,
                            ejercicio: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      ejercicio.ejercicio
                    )}
                  </td>
                  <td>
                  {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.equipamiento}
                        value={changeEjercicio.equipamiento || ""}
                        onChange={(e) =>
                          setChangeEjercicio((prev) => ({
                            ...prev,
                            equipamiento: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      ejercicio.equipamiento
                    )}
                  </td>
                  <td>
                  {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.descripcion}
                        value={changeEjercicio.descripcion || ""}
                        onChange={(e) =>
                          setChangeEjercicio((prev) => ({
                            ...prev,
                            descripcion: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      ejercicio.descripcion
                    )}
                  </td>
                  <td>
                    <img
                      src={`http://localhost/upload/${ejercicio.foto}`}
                      alt=""
                    />
                  </td>
                  <td>
                  {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.grupo}
                        value={changeEjercicio.grupo || ""}
                        onChange={(e) =>
                          setChangeEjercicio((prev) => ({
                            ...prev,
                            grupo: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      ejercicio.grupo
                    )}
                    </td>
                  <td>
                  {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.musculos}
                        value={changeEjercicio.musculos || ""}
                        onChange={(e) =>
                          setChangeEjercicio((prev) => ({
                            ...prev,
                            musculos: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      ejercicio.musculos
                    )}
                  </td>
                  <td>
                    {isEdit === ejercicio.id ? (
                      <>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                        <button onClick={() => handleConfirmEdit(ejercicio.id)}>
                          Guardar
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleClickDelete(ejercicio.id)}>
                          Eliminar
                        </button>
                        <button onClick={() => handleClickEdit(ejercicio.id)}>
                          Editar
                        </button>
                      </>
                    )}
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
