import InputTexto from "../InputTexto/InputTexto.jsx"

function Login() {
    return(
        <>
            <div className="bg-gym4 h-96 w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8">
                <InputTexto estilo={"w-52"} nombre={"Email"} id={"inputEmail"}/>
                <InputTexto estilo={"w-52"} nombre={"Contraseña"} id={"inputContraseña"}/>
                <button>
                    Iniciar Sesión
                </button>
            </div>
        </>
    )
}
export default Login