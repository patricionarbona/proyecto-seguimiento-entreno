import InputTexto from "../InputTexto/InputTexto.jsx"

function Login() {
    return(
        <>
            <div className="bg-gym4 h-96 w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <InputTexto />
                <InputTexto />
                <button>
                    Iniciar Sesión
                </button>
            </div>
        </>
    )
}
export default Login