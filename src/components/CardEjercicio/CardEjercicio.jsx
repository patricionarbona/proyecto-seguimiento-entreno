import { useState } from "react";
import Button from "../ui/button/Button";

export default function CardEjercicio({
  datosEjercicio,
  onClick,
  variant = "add",
}) {
  const [isVolteado, setVolteado] = useState(false);

  const nombreEjercicio = datosEjercicio.ejercicio;
  const rutaImg = `http://localhost/upload/${datosEjercicio.foto}`;
  const musculo = datosEjercicio.musculos;
  const recomendacion = datosEjercicio.descripcion;

  const variantText = {
    delete: "Eliminar",
    add: "Añadir",
  };

  const handleVoltear = (e) => {
    setVolteado(!isVolteado);
    console.log(isVolteado);
  };

  return (
    <div className="relative h-72 w-48  [perspective:1000px] ">
      <div
        className={
          "absolute h-full w-full [transition:1s] [transform-style:preserve-3d] " +
          (isVolteado ? " [transform:rotateY(-180deg)]" : "")
        }
      >
        <div className="absolute h-full w-full rounded-xl shadow-xl [z-index:2] [backface-visibility:hidden] flex flex-col justify-center bg-slate-300">
          <button
            onClick={handleVoltear}
            className={
              "absolute top-2 right-3 " + (isVolteado ? "invisible" : "visible")
            }
            type="button" // Aquí especificamos el tipo de botón
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
              />
            </svg>
          </button>
          <div className="h-5/6 mt-9">
            <h3>{nombreEjercicio}</h3>
            <img className="h-20 w-20" src={rutaImg} alt="" />
            <h4>Músculos implicados</h4>
            <p>{musculo}</p>
          </div>
          <Button text={variantText[variant]} onClick={onClick} />
        </div>
        <div className="absolute h-full w-full rounded-xl shadow-xl [z-index:2] [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col bg-slate-300">
          <button
            onClick={handleVoltear}
            className={
              "absolute top-2 right-3 " + (isVolteado ? "visible" : "invisible")
            }
            type="button" // Aquí también
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
              />
            </svg>
          </button>
          <h3>Instrucciones</h3>
          <p className="leading-8 text-ellipsis overflow-hidden overflow-y-scroll h-5/6">
            {recomendacion}
          </p>
          <Button text={variantText[variant]} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
