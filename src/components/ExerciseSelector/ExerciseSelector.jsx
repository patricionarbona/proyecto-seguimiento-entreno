import CartaEjercicio from "../CartaEjercicio/CartaEjercicio"


function ExerciseSelector() {
    return(
        <>
            <nav>
                <button>Home</button>
                <button>Estadisticas</button>
                <button>Crear Entreno</button>
            </nav>
            <header>
                <h1>Mis entrenos</h1>
                <form action="">
                    <label htmlFor="selectTrain">Selecciona tu entreno</label>
                    <select name="" id="selectTrain">
                    <option value="" disabled selected>Selecciona tu entreno</option>
                        <option value="">Pecho</option>
                        <option value="">Espalda</option>
                        <option value="">Pierna</option>
                    </select>
                </form>
            </header>
            <main>
                <h2>Tus ejercicios</h2>
                <div className="bg-teal-800">
                    <CartaEjercicio />
                    <CartaEjercicio />
                    <CartaEjercicio />
                </div>
            </main>
        </>
    )
}
export default ExerciseSelector