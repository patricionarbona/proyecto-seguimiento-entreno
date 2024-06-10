import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import Registrar from "./Registrar";
import Button from "../components/ui/button/Button";
import MainContext from "../context/MainContext";

const bodyStyle = {
  backgroundImage: 'url("../../img/home2.jpg")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100vh",
  margin: 0,
};

export default function Home() {
  const [view, setView] = useState("initial");

  const {
    setEmailUser,
    setUserCargo,
  } = useContext(MainContext)

  const renderContent = () => {
    switch (view) {
      case "login":
        return <Login />;
      case "register":
        return <Registrar />;
      default:
        return (
          <div className="flex flex-col items-center justify-evenly  h-full">
            <h1 className="text-3xl">Bienvenido a Gym Plan</h1>
            <p className="text-base">
            Gym Plan es una aplicación que da al usuario la libertad de crear su propio entrenamiento
             con una lista de ejercicios y consejos de ejecución, además de ofrecer un historial para ver su evolución.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <div
        style={bodyStyle}
        className="flex justify-center md:justify-end items-center"
      >
        <div className="flex flex-col items-center justify-center w-96 md:w-1/3 lg:w-1/5 h-1/2 sm:mr-10 rounded-xl shadow-xl bg-slate-400">
          <div className="flex flex-col items-center justify-between w-4/5 gap-8 bg-red-400 h-full">
            <div className="h-full bg-teal-200 w-full">
            {renderContent()}
            </div>
            <div className="flex justify-between mx-auto gap-8 mb-8">
              {view === "initial" && (
                <>
                  <Button
                    text="Iniciar sesión"
                    onClick={() => setView("login")}
                  />
                  <Button
                    text="Registrar"
                    variant="white"
                    onClick={() => setView("register")}
                  />
                </>
              )}
              {view === "register" && (
                <>
                <Button
                  text="Iniciar sesión"
                  onClick={() => setView("login")}
                />
                <Button
                  text="Registrar"
                  variant="white"
                  onClick={() => setView("register")}
                />
              </>
                
              )}
              {view === "login" && (
                <>
                <Button
                  text="Iniciar sesión"
                  onClick={() => setView("login")}
                />
                <Button
                  text="Registrar"
                  variant="white"
                  onClick={() => setView("register")}
                />
              </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
