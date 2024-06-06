import { useContext, useEffect, useState } from "react";
import NavDesktop from "../components/NavDesktop/NavDesktop";
import getUsuarios, { borrarUsuario, editarUsuario } from "../utils/Peticiones";
import MainContext from "../context/MainContext";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const { emailUser } = useContext(MainContext);
  const [usuarios, setUsuarios] = useState([]);
  const [isEditId, setIsEditId] = useState(null);
  const [changeUsuario, setChangeUsuario] = useState({
    id: null,
    nombre: null,
    email: null,
    cargo: null,
  });

  const handleClickDelete = (usuarioId) => {
    console.log(usuarioId);
    const deleteUsuario = async (usuarioId) => {
      try {
        const response = await borrarUsuario(usuarioId);
        response.message === "Eliminado el usuario"
          ? toast.success("Eliminado el usuario")
          : toast.error("No se pudo eliminar el usuario");
        console.log(response);
      } catch (err) {
        console.error("Error al recuperar los ejercicios:", err);
      }
    };

    deleteUsuario(usuarioId);
  };

  const handleClickEdit = (usuarioId) => {
    const usuario = usuarios.find((usuario) => usuario.id === usuarioId);
    if (usuario) {
      setIsEditId(usuarioId);
    }
  };

  const handleCancelEdit = () => {
    setIsEditId(null);
    setChangeUsuario({
      id: null,
      nombre: null,
      email: null,
      cargo: null,
    });
  };

  const handleConfirmEdit = async (usuarioId) => {
    const miCargo = usuarios.find((usuario) => usuario.id === usuarioId).cargo;

    const updatedChangeUsuario = {
      ...changeUsuario,
      cargo: changeUsuario.cargo === null ? miCargo : changeUsuario.cargo,
      id: usuarioId
    };

    setChangeUsuario(updatedChangeUsuario);

    // Log the updated changeUsuario
    console.log(updatedChangeUsuario);
    try {
      const response = await editarUsuario(updatedChangeUsuario);
      if(response.message === "editado el usuario") {
        toast.success("Editado el usuario");
      setIsEditId(null);
      setChangeUsuario({
        id: null,
        nombre: null,
        email: null,
        cargo: null,
      })} else {
        toast.error("No se pudo editar el usuario")
      }
    } catch (err) {
      console.error("Error al recuperar los ejercicios:", err);
    }

    
  };

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await getUsuarios(emailUser);
        setUsuarios(response);
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
        <table>
          <thead>
            <th>Nombre</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            {usuarios.map((usuario) => {
              console.log(usuario);
              return (
                <tr key={`usr-${usuario.id}`}>
                  <td>
                    {isEditId === usuario.id ? (
                      <input
                        type="text"
                        placeholder={usuario.nombre}
                        value={changeUsuario.nombre || ""}
                        onChange={(e) =>
                          setChangeUsuario((prev) => ({
                            ...prev,
                            nombre: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      usuario.nombre
                    )}
                  </td>
                  <td>
                    {isEditId === usuario.id ? (
                      <input
                        type="text"
                        placeholder={usuario.email}
                        value={changeUsuario.email || ""}
                        onChange={(e) =>
                          setChangeUsuario((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      usuario.email
                    )}
                  </td>
                  <td>
                    {isEditId === usuario.id ? (
                      <select
                        onChange={(e) => {
                          const cargo = e.target.value === "0" ? 0 : 1;
                          console.log(cargo);
                          setChangeUsuario((prev) => ({
                            ...prev,
                            cargo: cargo,
                          }));
                        }}
                      >
                        <option selected={usuario.cargo === 0} value="0">
                          Usuario
                        </option>
                        <option selected={usuario.cargo === 1} value="1">
                          Administrador
                        </option>
                      </select>
                    ) : usuario.cargo === 0 ? (
                      "Usuario"
                    ) : (
                      "Administrador"
                    )}
                  </td>
                  <td>
                    {isEditId === usuario.id ? (
                      <>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                        <button onClick={() => handleConfirmEdit(usuario.id)}>
                          Guardar
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleClickDelete(usuario.id)}>
                          Eliminar
                        </button>
                        <button onClick={() => handleClickEdit(usuario.id)}>
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
