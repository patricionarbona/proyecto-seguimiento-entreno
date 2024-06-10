import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../utils/Peticiones";
import { toast } from 'react-hot-toast';
import Button from "../components/ui/button/Button";
import MainContext from "../context/MainContext";

export default function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [password, setPassword] = useState("");
  const [holdSesion, setHoldSesion] = useState(false)
  const navigate = useNavigate();
  const {
    setEmailUser,
    setUserCargo,
  } = useContext(MainContext)


  useEffect(() => {
    const dataUsuario = JSON.parse(localStorage.getItem("dataUser")) || JSON.parse(sessionStorage.getItem("dataUser"))
    console.log(dataUsuario)
    if(dataUsuario) {
      setEmailUser(dataUsuario.email)
      setUserCargo(dataUsuario.admin)
      navigate("/front-page")
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await iniciarSesion({ email:emailLogin, password });
    console.log(response);
    if (response.message === "sesion iniciada") {
      setEmailUser(emailLogin)
      console.log(holdSesion)
      holdSesion ? localStorage.setItem('dataUser', JSON.stringify({email: emailLogin, admin: response.admin})) : sessionStorage.setItem("dataUser", JSON.stringify({email: emailLogin, admin: response.admin}))
      setUserCargo(response.admin)
      navigate("/front-page");
    } else {
      toast.error('Datos de usuario erróneos');
    }
  };

  return (
    <div
      className="flex flex-col items-center gap-8 h-full justify-evenly"

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
        <div>
          <input
            type="checkbox"
            id="holdSesion"
            value={holdSesion}
            onChange={() => setHoldSesion(!holdSesion)}
          />
          <label htmlFor="holdSesion">Mantener sesion iniciada</label>
          </div>
          <Button text={"Iniciar Sesión"} type={"submit"} />
      </form>
    </div>
  );
}
