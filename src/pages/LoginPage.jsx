import InputTexto from "../components/InputTexto/InputTexto";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../utils/Peticiones";

export default function LoginPage() {

    const navigate = useNavigate();

    const handleButtonClick = (e) => {
        e.preventDefault();
        navigate('/registrar');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const datos = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        try {
            console.log("paso: ",datos)
            let response = await iniciarSesion(datos)
            console.log("respuesta ", response)
            if (response.message === "sesion iniciada") {
                navigate('/');
            } else {
                console.log("No se inicio sesion")
            }
            
          } catch (error) {
            console.error("Error de red:", error);
          }
    };

    return (
        <div>
            <div className="absolute bg-slate-200 h-96 w-72 xl:w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8 rounded-2xl">
                <form onSubmit={handleLogin}>
                    <InputTexto estilo={"w-52 rounded-md ring-1 ring-gray-200"} nombre={"Email"} id={"inputEmail"} name="email" />
                    <InputTexto estilo={"w-52 rounded-md ring-1 ring-gray-200"} nombre={"Contraseña"} id={"inputContraseña"} name="password" />
                    <div>
                        <button className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg text-center hover:bg-gray-700 ring-1 ring-gray-500 mt-10"
                                type="submit">
                            Iniciar Sesión
                        </button>
                        <button className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg text-center hover:bg-gray-700 ring-1 ring-gray-500 mt-10"
                                onClick={handleButtonClick}>
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
