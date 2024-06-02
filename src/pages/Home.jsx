import { useState } from "react";
import Login from "./Login";
import Registrar from "./Registrar";

const bodyStyle = {
    backgroundImage: 'url("../../public/img/home2.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    margin: 0
};

export default function Home() {
    const [view, setView] = useState("initial");

    const renderContent = () => {
        switch (view) {
            case "login":
                return <Login />;
            case "register":
                return <Registrar />;
            default:
                return <p>Bienvenido a nuestra aplicación. Por favor, elige una opción para continuar.</p>;
        }
    };

    return (
        <>
            <div style={bodyStyle}
                className="flex justify-center md:justify-end items-center"
            >
                <div className="flex flex-col justify-center w-96 md:w-1/3 lg:w-1/4 h-1/2 sm:mr-10 rounded-xl shadow-xl bg-slate-300 p-0">
                    {renderContent()}
                    {view === "initial" && (
                        <p>Bienvenido a nuestra aplicacion</p>
                    )}
                    <div className="flex flex-col">
                        <button 
                            onClick={() => setView("login")}
                            className={view === "login" ? "hidden" : ""}
                        >
                            Iniciar sesión
                        </button>
                        <button 
                            onClick={() => setView("register")}
                            className={view === "register" ? "hidden" : ""}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
