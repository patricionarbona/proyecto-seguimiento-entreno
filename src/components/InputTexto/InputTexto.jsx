
function InputTexto({estilo, nombre, id}) {
    return(
        <>
            <div className="flex flex-col">
                <label htmlFor={id || nombre}>{nombre}</label>
                <input type="text" className={estilo} id={id || nombre} />
            </div>
        </>
    )
}
export default InputTexto