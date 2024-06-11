import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../utils/Peticiones";
import { toast } from "react-hot-toast";
import Button from "../components/ui/button/Button";
import MainContext from "../context/MainContext";

export default function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [password, setPassword] = useState("");
  const [holdSesion, setHoldSesion] = useState(false);
  const navigate = useNavigate();
  const { setEmailUser, setUserCargo, setView } = useContext(MainContext);

  useEffect(() => {
    const dataUsuario =
      JSON.parse(localStorage.getItem("dataUser")) ||
      JSON.parse(sessionStorage.getItem("dataUser"));
    console.log(dataUsuario);
    if (dataUsuario) {
      setEmailUser(dataUsuario.email);
      setUserCargo(dataUsuario.admin);
      navigate("/front-page");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await iniciarSesion({ email: emailLogin, password });
    console.log(response);
    if (response.message === "sesion iniciada") {
      setEmailUser(emailLogin);
      console.log(holdSesion);
      holdSesion
        ? localStorage.setItem(
            "dataUser",
            JSON.stringify({ email: emailLogin, admin: response.admin })
          )
        : sessionStorage.setItem(
            "dataUser",
            JSON.stringify({ email: emailLogin, admin: response.admin })
          );
      setUserCargo(response.admin);
      navigate("/front-page");
    } else {
      toast.error("Datos de usuario erróneos");
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 h-full justify-center">
      <img src="/img/logo.png" alt="" className="h-28" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-evenly gap-3 relative h-96"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
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
          <label htmlFor="holdSesion" className="ml-2">
            Mantener sesion iniciada
          </label>
        </div>
        <div className="flex flex-col gap-3 bottom-0">
          <Button text={"Iniciar Sesión"} type={"submit"} />
          <Button
            text="Registrar"
            variant="white"
            onClick={() => setView("register")}
          />
        </div>
      </form>
    </div>
  );
}
