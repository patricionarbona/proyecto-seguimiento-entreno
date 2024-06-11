import { useContext, useState } from "react";
import { comprobarEmail, crearUsuario } from "../utils/Peticiones";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext";
import Button from "../components/ui/button/Button";
import toast from "react-hot-toast";

export default function Registrar() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setView } = useContext(MainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar los datos a un servidor
    const response = await comprobarEmail(email);
    console.log(response);
    if (response.message === "no existe") {
      const responseCreate = await crearUsuario({
        email: email,
        nombre: username,
        password: password,
      });
      console.log(responseCreate);
      if (responseCreate.message === "añadido usuario") {
        setView("login")
        toast('Registro completado')
      }
    } else {
      console.log("ya existe un usario con ese correo");
    }
    console.log("Datos de registro:", { username, email, password });
  };

  return (
    <div className="flex flex-col items-center gap-0 md:gap-8 h-full justify-center">
            <img src="/img/logo.png" alt="" className="h-28" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-evenly md:gap-4 relative h-96"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label className="md:w-32" htmlFor="username">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label className="md:w-32" htmlFor="email">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label className="w-32" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div className="flex flex-col gap-3 bottom-0">
          <Button text={"Iniciar Sesión"} onClick={() => setView("login")} type={"button"}/>
          <Button
            text="Registrar"
            variant="white"
            onClick={handleSubmit}
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
}
