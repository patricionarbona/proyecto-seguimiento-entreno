import InputTexto from "../InputTexto/InputTexto.jsx"

function Login() {
    return(
        <>
            <div className="absolute bg-slate-200 h-96 w-72 xl:w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8 rounded-2xl">
                <InputTexto estilo={"w-52 rounded-md ring-1 ring-gray-200"} nombre={"Email"} id={"inputEmail"}/>
                <InputTexto estilo={"w-52 rounded-md ring-1 ring-gray-200"} nombre={"Contraseña"} id={"inputContraseña"}/>
                <button className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg text-center hover:bg-gray-700 ring-1 ring-gray-500 mt-10">
                    Iniciar Sesión
                </button>
            </div>
        </>
    )
}
export default Login