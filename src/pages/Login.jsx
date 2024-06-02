import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../utils/Peticiones";
import { toast } from 'react-hot-toast';
import Button from "../components/ui/button/Button";

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
      className="flex flex-col items-center gap-8"

    >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
          <Button text={"Iniciar Sesión"} type={"submit"} />
      </form>
    </div>
  );
}
