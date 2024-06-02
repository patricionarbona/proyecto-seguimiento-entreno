import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../utils/Peticiones";
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos de inicio de sesión:", { email, password });
    const response = await iniciarSesion({ email, password });
    console.log(response);
    if (response.message === "sesion iniciada") {
      localStorage.setItem('email',email)
      sessionStorage.setItem('email',email)
      navigate("/front-page");
    } else {
      toast.error('Datos de usuario erróneos');
    }
  };

  const handleRegisterClick = () => {
    navigate("/registrar");
  };

  return (
    <div
    >
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
