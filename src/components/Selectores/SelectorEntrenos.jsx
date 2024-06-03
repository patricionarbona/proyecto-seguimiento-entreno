import { useState, useEffect, useContext } from "react";
import { recuperarEntrenos } from "../../utils/Peticiones";
import MainContext from "../../context/MainContext";

export default function SelectorEntrenos({ entreno, setEntreno }) {
  const [entrenos, setEntrenos] = useState([]);
  const {
    emailUser
  } = useContext(MainContext)

  useEffect(() => {
    const fetchEntrenos = async () => {
      try {
        const usuarioEmail = emailUser
        const response = await recuperarEntrenos(usuarioEmail);
        console.log(response)
        setEntrenos(response);
      } catch (err) {
        console.error("Error al recuperar los entrenos:", err);
      }
    };
    fetchEntrenos();
  }, []);

  return (
    <div>
      <label htmlFor="train">Entrenos:</label>
      <select
        id="train"
        value={entreno}
        onChange={(e) => setEntreno(e.target.value)}
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
