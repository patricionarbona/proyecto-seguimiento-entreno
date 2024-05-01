
function InputNum({estilo, nombre, id}) {
    return(
        <>
            <div className="flex flex-col">
                <label htmlFor={id || nombre}>{nombre}</label>
                <input type="number" className={estilo} id={id || nombre} />
            </div>
        </>
    )
}
export default InputNum