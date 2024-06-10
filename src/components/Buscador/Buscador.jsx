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
        <div
        className="flex flex-col ml-6 md:flex-row items-start md:items-center"
        >
      <label htmlFor="inputSearch" className="">Buscar:</label>
      <input
        id="inputSearch"
        onChange={debounceHandleChange}
        className="md:ml-2 w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1"
        type="text"
      />

        </div>
      <button
        onClick={handleClick}
        className=""
      >
        <svg
          className=" w-5 mt-6 md:mt-0"
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
