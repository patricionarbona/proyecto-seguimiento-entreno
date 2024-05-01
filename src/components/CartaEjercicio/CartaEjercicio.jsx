import InputNum from "../InputNum/InputNum"


function CartaEjercicio() {

    const rutaImg = "https://v2.exercisedb.io/image/I4XMjCBFhqaGoJ"

    return(
        <>
            <div>
                <h2>alternate lateral pulldown</h2>
                <img src={rutaImg} alt="" />
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