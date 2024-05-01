import InputNum from "../InputNum/InputNum"


function CartaEjercicio() {

    const rutaImg = "https://v2.exercisedb.io/image/I4XMjCBFhqaGoJ"
    const nombreEjercicio = "alternate lateral pulldown"

    return(
        <>
            <div className="relative bg-slate-200 h-96 w-80 flex flex-col items-center justify-center rounded-2xl">
                <h2>alternate lateral pulldown</h2>
                <img className="h-5 w-5" src={rutaImg} alt={"un hombre haciendo " + nombreEjercicio}/>
                <h3>Observaciones del ejercicio</h3>
                <p>Hacerlo con cariño</p>
                <div>
                    <InputNum id={"inputPeso"} nombre={"Peso"} />
                </div>
                <h3>Observaciones del entreno</h3>
                    <textarea name="" id="" cols="10" rows="4"></textarea>
                <button>Hecho</button>
            </div>
        </>
    )
}
export default CartaEjercicio