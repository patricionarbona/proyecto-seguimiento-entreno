import { useContext, useEffect, useState } from "react";
import NavDesktop from "../components/NavDesktop/NavDesktop";
import getUsuarios, { borrarUsuario } from "../utils/Peticiones";
import MainContext from "../context/MainContext";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const { emailUser } = useContext(MainContext);
  const [usuarios, setUsuarios] = useState([]);

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
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.cargo === 0 ? "Usuario" : "Administrador"}</td>
                  <td>
                    <button onClick={() => handleClickDelete(usuario.id)}>
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
