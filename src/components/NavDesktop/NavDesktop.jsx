import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../context/MainContext";

export default function NavDesktop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGestionarOpen, setIsGestionarOpen] = useState(false);
  const { userCargo,setView } = useContext(MainContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleGestionar = () => {
    setIsGestionarOpen(!isGestionarOpen);
  };

  return (
    <>
      <nav className="bg-malibu-400 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/front-page"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/img/logo.png"
              className="h-16"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Gym Plan
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:px-8 md:py-3 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-seagull-700 rounded md:bg-transparent md:text-seagull-700 md:p-0 md:dark:text-seagull-500"
                  aria-current="page"
                  onClick={() => {
                    setView("initial")
                    localStorage.getItem("dataUser") ? localStorage.removeItem("dataUser") : null
                    sessionStorage.getItem("dataUser") ? sessionStorage.removeItem("dataUser") : null
                  }}
                  
                >
                  Cerrar Sesión
                </Link>
              </li>
              <li>
                <Link
                  to="/my-trains"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-seagull-100 md:hover:bg-transparent md:hover:text-seagull-700 md:p-0 md:dark:hover:text-seagull-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Entrenos
                </Link>
              </li>
              <li>
                <Link
                  to="/make-train"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-seagull-100 md:hover:bg-transparent md:hover:text-seagull-700 md:p-0 md:dark:hover:text-seagull-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Selector
                </Link>
              </li>
              <li>
                <Link
                  to="/graficos"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-seagull-100 md:hover:bg-transparent md:hover:text-seagull-700 md:p-0 md:dark:hover:text-seagull-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Gráficos
                </Link>
              </li>
              {userCargo === 1 && (
                <li className="relative">
                  <button
                    onClick={toggleGestionar}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-seagull-100 md:hover:bg-transparent md:hover:text-seagull-700 md:p-0 md:dark:hover:text-seagull-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Gestionar
                  </button>
                  {isGestionarOpen && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                      <li>
                        <Link
                          to="/manage-users"
                          className="block py-2 px-4 text-gray-900 hover:bg-seagull-100 dark:text-white dark:hover:bg-gray-700"
                        >
                          Gestionar Usuarios
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/manage-exercises"
                          className="block py-2 px-4 text-gray-900 hover:bg-seagull-100 dark:text-white dark:hover:bg-gray-700"
                        >
                          Gestionar Ejercicios
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
