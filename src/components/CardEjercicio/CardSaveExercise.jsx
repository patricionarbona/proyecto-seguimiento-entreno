import { useState } from "react";
import Button from "../ui/button/Button";

export default function CardSaveEjercicio({
  datosEjercicio,
  onClick,
  setPeso,
  setSeries,
  setRepeticiones,
  setObservacion,
}) {
  const [isVolteado, setVolteado] = useState(false);
  const ejercicio = datosEjercicio;
  console.log(ejercicio);

  const nombreEjercicio = datosEjercicio.ejercicio;
  const rutaImg = `http://localhost/upload/${datosEjercicio.foto}`;
  const musculo = datosEjercicio?.musculos;
  const recomendacion = datosEjercicio.descripcion;

  const handleVoltear = () => {
    setVolteado(!isVolteado);
    console.log(isVolteado);
  };

  return (
    <div className="relative h-80 w-52  [perspective:1000px] ">
      <div
        className={
          "absolute h-full w-full [transition:1s] [transform-style:preserve-3d] " +
          (isVolteado ? " [transform:rotateY(-180deg)]" : "")
        }
      >
        <div className="absolute bg-white h-full w-full rounded-xl shadow-xl [z-index:2] [backface-visibility:hidden] flex flex-col justify-center">
          <button
            onClick={handleVoltear}
            className={
              "absolute top-2 right-3 " + (isVolteado ? "invisible" : "visible")
            }
            type="button"
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
          <div className="h-5/6 mb-5 flex flex-col items-center ">
            <h3>{nombreEjercicio}</h3>
            <img className="h-14 w-14" src={rutaImg} alt="" />
            {/* <h4>Músculos implicados</h4>
            <p>{musculo}</p> */}
            <label htmlFor="inputPeso">Peso</label>
            <input
              id="inputPeso"
              type="number"
              className="ml-1 w-44 h-8 border border-gray-300 rounded-md shadow-xs px-1"
              onChange={(e) => setPeso(parseFloat(e.target.value))}
              required
            />
            <label htmlFor="inputSeries">Series</label>
            <input
              id="inputSeries"
              type="number"
              className="ml-1 w-44 h-8 border border-gray-300 rounded-md shadow-xs px-1"
              onChange={(e) => setSeries(parseInt(e.target.value))}
              required
            />
            <label htmlFor="inputRepeticiones">Repeticiones</label>
            <input
              id="inputRepeticiones"
              type="number"
              className="ml-1 w-44 h-8 border border-gray-300 rounded-md shadow-xs px-1"
              onChange={(e) => setRepeticiones(parseInt(e.target.value))}
              required
            />
            <label htmlFor="inputObservaciones">Observaciones</label>
            <textarea
              id="inputObservaciones"
              className="ml-1 w-44 h-8 border border-gray-300 rounded-md shadow-xs px-1"
              onChange={(e) => setObservacion(e.target.value)}
            />
          </div>
          <Button text={"Hecho"} onClick={onClick} />
        </div>
        <div className="absolute bg-white h-full w-full rounded-xl shadow-xl [z-index:2] [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col ">
          <button
            onClick={handleVoltear}
            className={
              "absolute top-2 right-3 " + (isVolteado ? "visible" : "invisible")
            }
            type="button"
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
          <h3 className="mx-2">Instrucciones</h3>
          <p className="mx-2 leading-8 text-ellipsis overflow-hidden overflow-y-scroll h-5/6">
            {recomendacion}
          </p>
          {/* <button onClick={onClick} type="button">
            Hecho
          </button> */}
          <Button text={"Hecho"} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
