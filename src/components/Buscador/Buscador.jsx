// Buscador Component
import { useRef, useState } from "react";

export default function Buscador({ setSearchTerm }) {
  const [busqueda, setBusqueda] = useState("pokemon");
  const previousBusqueda = useRef("");

  const handleClick = () => {
    console.log("pulsado");
    console.log(busqueda);
    console.log(previousBusqueda);

    if (busqueda !== previousBusqueda.current) {
      setSearchTerm(busqueda); // Actualizar el valor del buscador
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setBusqueda(event.target.value);
    console.log(previousBusqueda.current);
    setSearchTerm(event.target.value); // Actualizar el valor del buscador
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debounceHandleChange = debounce(handleChange, 400);

  return (
    <div className="flex gap-2 items-center">
      <span className="text-slate-200">Buscar:</span>
      <input
        onChange={debounceHandleChange}
        className="bg-slate-300 text-slate-800 w-28 md:w-56"
        type="text"
      />
      <button
        onClick={handleClick}
        className="bg-slate-300 text-slate-800 hover:bg-slate-100 w-8"
      >
        <svg
          className="mx-auto w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17.5 17.5L22 22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
