import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../utils/Peticiones";
import { toast } from 'react-hot-toast';
import Button from "../components/ui/button/Button";
import MainContext from "../context/MainContext";

export default function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    setEmailUser,
    setUserCargo,
  } = useContext(MainContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await iniciarSesion({ email:emailLogin, password });
    console.log(response);
    if (response.message === "sesion iniciada") {
      setEmailUser(emailLogin)
      console.log(response.admin === "0" ? false : true )
      setUserCargo(response.admin)
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
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
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
