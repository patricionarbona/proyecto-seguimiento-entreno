import { useState, useEffect, useContext } from "react";
import { recuperarEntrenos } from "../../utils/Peticiones";
import MainContext from "../../context/MainContext";

export default function SelectorEntrenos({ entreno, setEntreno }) {
  const [entrenos, setEntrenos] = useState([]);
  const { emailUser } = useContext(MainContext);

  useEffect(() => {
    const fetchEntrenos = async () => {
      try {
        const usuarioEmail = emailUser;
        const response = await recuperarEntrenos(usuarioEmail);
        console.log(response);
        setEntrenos(response);
        if (response.length > 0) {
          setEntreno(response[0].id); // Establece el primer entreno recuperado
        }
      } catch (err) {
        console.error("Error al recuperar los entrenos:", err);
      }
    };
    fetchEntrenos();
  }, [emailUser, setEntreno]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center">
      <label htmlFor="train">Entrenos:</label>
      <select
        id="train"
        className="mt-2 md:ml-2 md:mt-0 w-60 h-8 border border-gray-300 rounded-md shadow-xs"
        value={entreno}
        onChange={(e) => setEntreno(parseInt(e.target.value))}
      >
        <option value="">Selecciona tu entreno</option>
        {entrenos.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
