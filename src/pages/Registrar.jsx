import { useContext, useState } from "react";
import { comprobarEmail, crearUsuario } from "../utils/Peticiones";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext";
import Button from "../components/ui/button/Button";

export default function Registrar() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setView} = useContext(MainContext)

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
        navigate("/login");
      }
    } else {
      console.log("ya existe un usario con ese correo");
    }
    console.log("Datos de registro:", { username, email, password });
  };

  return (
    <div
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <Button text={"Iniciar Sesión"} onClick={() => setView("login")}/>
        <Button
          text="Registrar"
          variant="white"
          onClick={() => setView("register")}
          type={"submit"}
        />
      </form>
    </div>
  );
}
