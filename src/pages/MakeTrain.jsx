import { useEffect, useState, useMemo, useContext } from "react";
import SelectorGrupos from "../components/Selectores/SelectorGrupos";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import { crearEntreno, recuperarEjercicios } from "../utils/Peticiones";
import toast from "react-hot-toast";
import CardEjercicio from "../components/CardEjercicio/CardEjercicio";
import NavDesktop from "../components/NavDesktop/NavDesktop";
import MainContext from "../context/MainContext";
import Button from "../components/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function MakeTrain() {
  const [entreno, setEntreno] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([]);
  const [grupo, setGrupo] = useState("");
  const { emailUser } = useContext(MainContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!emailUser) navigate("/");
  }, []);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await recuperarEjercicios();
        setEjercicios(response);
      } catch (err) {
        toast.error("Error al recuperar los ejercicios:", err);
      }
    };

    fetchEjercicios();
  }, []);

  const ejerciciosFiltrados = useMemo(() => {
    if (!grupo) return ejercicios;
    return ejercicios.filter((ejercicio) => ejercicio.grupo === grupo);
  }, [grupo, ejercicios]);

  const handleClick = (index) => {
    setEjerciciosSeleccionados((prevSeleccionados) => {
      if (
        !prevSeleccionados.find(
          (ejercicio) => ejercicio === ejerciciosFiltrados[index]
        )
      ) {
        toast.success("Ejercicio añadido");
        return [...prevSeleccionados, ejerciciosFiltrados[index]];
      }
      toast.error("El ejercicio ya está seleccionado");
      return prevSeleccionados;
    });
  };

  const handleClickEliminar = (index) => {
    const newEjerciciosSeleccionados = ejerciciosSeleccionados.filter(
      (ejercicio, i) => i !== index
    );
    setEjerciciosSeleccionados(newEjerciciosSeleccionados);
    toast.success("Ejercicio deseleccionado");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (entreno.trim() === "" || ejerciciosSeleccionados.length === 0) return;

    const email = emailUser;
    const data = {
      email: email,
      entreno: entreno,
      ejerciciosId: ejerciciosSeleccionados.map((ejer) => ejer.id),
    };
    const responseCreate = await crearEntreno(data);
    const mensaje = responseCreate.message;
    if (mensaje === "1") {
      toast.success("Creado el entreno");
      setEjerciciosSeleccionados([]);
    } else if (mensaje === "0") {
      toast.error("Hubo un error durante la creación del entreno");
    } else if (mensaje === "2") {
      toast.error("Ese entreno ya existe");
    }
  };

  return (
    <>
      <NavDesktop />
      <div className="flex gap-6 p-6 mt-24">
        {/* Sección de ejercicios disponibles */}
        <div className="">
          <SelectorGrupos grupo={grupo} setGrupo={setGrupo} />
          <div className="w-full flex flex-wrap gap-4 p-4 rounded mt-4">
            {ejerciciosFiltrados.map((ejercicio, index) => (
              <CardEjercicio
                datosEjercicio={ejercicio}
                key={`c-ejer-${ejercicio.id}`}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Sección de ejercicios seleccionados */}
        <div className="">
          {" "}
          {/* Ajusta el ancho según sea necesario */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className="flex flex-col h-full mr-2"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
              <label htmlFor="entreno" className="font-bold w-40">
                Nombre del entreno
              </label>
              <input
                type="text"
                id="entreno"
                value={entreno}
                onChange={(e) => setEntreno(e.target.value)}
                required
                className="md:ml-2 w-52 md:w-60 h-8 border border-gray-300 rounded-md shadow-xs px-1 mr-1"
              />
            </div>
            <Button type={"submit"} text={"Crear Entreno"} />
            <div className="flex-1 overflow-y-auto items-center mt-4">
              <Swiper
                direction={"vertical"}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                autoHeight={true}
                slidesPerView={3}
                className="md:h-[80vh] h-screen"
                loop={true}
              >
                {ejerciciosSeleccionados.length > 0 ? (
                  ejerciciosSeleccionados.map((ejercicio, index) => (
                    <SwiperSlide
                      key={`slc-${ejercicio.id}`}
                      className="flex justify-center"
                    >
                      <CardEjercicio
                        datosEjercicio={ejercicio}
                        key={`c-slc-${ejercicio.id}`}
                        onClick={() => handleClickEliminar(index)}
                        variant="delete"
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <p className="text-center">No hay ejercicios seleccionados</p>
                )}
              </Swiper>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
