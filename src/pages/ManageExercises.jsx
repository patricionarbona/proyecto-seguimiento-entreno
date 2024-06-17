import { useContext, useEffect, useMemo, useState } from "react";
import NavDesktop from "../components/NavDesktop/NavDesktop";
import {
  borrarEjercicio,
  editarEjercicio,
  recuperarEjercicios,
} from "../utils/Peticiones";
import toast from "react-hot-toast";
import AddExercise from "./AddExercise.jsx";
import Button from "../components/ui/button/Button.jsx";
import Buscador from "../components/Buscador/Buscador.jsx";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext.jsx";

export default function ManageExercises() {
  const { emailUser } = useContext(MainContext)
  const [ejercicios, setEjercicios] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el valor del buscador
  const [changeEjercicio, setChangeEjercicio] = useState({
    id: null,
    ejercicio: null,
    equipamiento: null,
    descripcion: null,
    grupo: null,
    musculos: null,
    foto: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(!emailUser) navigate("/")
  },[])

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
      descripcion: null,
      equipamiento: null,
      grupo: null,
      musculos: null,
      foto: null,
    });
  };

  const handleConfirmEdit = (ejercicioId) => {
    const formData = new FormData();
    formData.append("id", ejercicioId);
    formData.append(
      "nombre",
      changeEjercicio.ejercicio
        ? changeEjercicio.ejercicio
        : ejercicios.find((ej) => ej.id === ejercicioId).ejercicio
    );
    formData.append("descripcion", changeEjercicio.descripcion);
    formData.append("foto", changeEjercicio.foto);
    formData.append("musculos", changeEjercicio.musculos);
    formData.append("equipamiento", changeEjercicio.equipamiento);
    formData.append("grupo", changeEjercicio.grupo);
    console.log(changeEjercicio);
    console.log(ejercicioId);
    editarEjercicio(formData)
      .then((response) => {
        console.log("Ejercicio creado:", response);
        toast.success("Ejercicio creado");
      })
      .catch((error) => {
        console.error("Error al crear el ejercicio:", error);
      });
  };

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

  const filteredEjercicios = useMemo(() => {
    return ejercicios.filter((ejercicio) =>
      ejercicio.ejercicio.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [ejercicios, searchTerm]);

  return (
    <div className="flex flex-col h-[100vh]">
      <NavDesktop />
      <div className="md:mt-28 mt-[100px] flex flex-col gap-4 mx-4">
        <AddExercise />
        <Buscador setSearchTerm={setSearchTerm} /> {/* Pasamos la función de actualización */}
        <table className="w-full align-middle gap-4 border-separate border-spacing-y-4 bg-slate-50 ">
          <thead>
            <tr className="block md:table-row border-2 border-slate-300 p-2 my-0 md:my-4">
              <th className="block md:table-cell md:text-left border md:border-0 my-2 border-slate-500">
                Nombre
              </th>
              <th className="block md:table-cell md:text-left border md:border-0 my-2 border-slate-500">
                Equipamiento
              </th>
              <th className="block md:table-cell md:text-left border md:border-0 my-2 border-slate-500">
                Ejecución
              </th>
              <th className="block md:table-cell md:text-left border md:border-0 my-2 border-slate-500">
                Foto
              </th>
              <th className="block md:table-cell md:text-left border md:border-0 my-2 border-slate-500">
                Grupo muscular principal
              </th>
              <th className="block md:table-cell md:text-left border md:border-0 my-2 border-slate-500">
                Musculos secundarios
              </th>
              <th className="block md:table-cell md:text-left border md:border-0 my-2 border-slate-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEjercicios.map((ejercicio) => {
              return (
                <tr
                  key={`exc-${ejercicio.id}`}
                  className="block md:table-row border-2 border-slate-300 p-2 my-2 hover:bg-slate-200"
                >
                  <td className="block md:table-cell text-center md:text-left border md:border-0 my-2 border-slate-500">
                    {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.ejercicio}
                        value={changeEjercicio.ejercicio || ""}
                        className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
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
                  <td className="block md:table-cell text-center md:text-left  md:border-0 my-2 border-slate-500">
                    {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.equipamiento}
                        value={changeEjercicio.equipamiento || ""}
                        className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
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
                  <td className="block md:table-cell  md:text-left  md:border-0 my-2 border-slate-500">
                    {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.descripcion}
                        value={changeEjercicio.descripcion || ""}
                        className="md:ml-2 w-11/12 h-8 border border-gray-300 rounded-md shadow-xs px-1"
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
                  <td className={`block md:table-cell text-center md:text-left ${isEdit? "": "border"} md:border-0 my-2 border-slate-500`}>
                    {isEdit === ejercicio.id ? (
                      <input
                        type="file"
                        className="text-ellipsis w-full"
                        onChange={(e) =>
                          setChangeEjercicio((prev) => ({
                            ...prev,
                            foto: e.target.files[0],
                          }))
                        }
                      />
                    ) : (
                      <img
                        className="h-40 w-40 mx-auto"
                        src={`http://localhost/upload/${ejercicio.foto}`}
                        alt=""
                      />
                    )}
                  </td>
                  <td className="block md:table-cell text-center md:text-left  md:border-0 my-2 border-slate-500">
                    {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.grupo}
                        value={changeEjercicio.grupo || ""}
                        className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
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
                  <td className="block md:table-cell text-center md:text-left  md:border-0 my-2 border-slate-500">
                    {isEdit === ejercicio.id ? (
                      <input
                        type="text"
                        placeholder={ejercicio.musculos}
                        value={changeEjercicio.musculos || ""}
                        className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
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
                  <td className="flex flex-col md:table-cell gap-2 my-2 border-slate-500">
                    {isEdit === ejercicio.id ? (
                      <>
                        <Button
                          text={"Cancelar"}
                          variant="red"
                          onClick={() => handleCancelEdit(ejercicio.id)}
                        />
                        <Button
                          text={"Guardar"}
                          onClick={() => handleConfirmEdit(ejercicio.id)}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          text={"Eliminar"}
                          variant="red"
                          onClick={() => handleClickDelete(ejercicio.id)}
                        />
                        <Button
                          text={"Editar"}
                          onClick={() => handleClickEdit(ejercicio.id)}
                        />
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