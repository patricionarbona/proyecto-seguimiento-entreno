import { useEffect, useState, useMemo } from "react";
import SelectorGrupos from "../components/Selectores/SelectorGrupos";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { crearEntreno, recuperarEjercicios, recuperarEjerciciosGrupo } from "../utils/Peticiones";
import toast from "react-hot-toast";
import CardEjercicio from "../components/CardEjercicio/CardEjercicio";
import NavDesktop from "../components/NavDesktop/NavDesktop";

export default function MakeTrain() {
  const [entreno, setEntreno] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([]);
  const [grupo, setGrupo] = useState("");

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await recuperarEjercicios();
        setEjercicios(response);
      } catch (err) {
        console.error("Error al recuperar los ejercicios:", err);
      }
    };

    fetchEjercicios();
  }, []);

  const ejerciciosFiltrados = useMemo(() => {
    if (!grupo) return ejercicios;
    return ejercicios.filter(ejercicio => ejercicio.grupo === grupo);
  }, [grupo, ejercicios]);

  const handleClick = (index) => {
    setEjerciciosSeleccionados((prevSeleccionados) => {
      if (!prevSeleccionados.find((ejercicio) => ejercicio === ejerciciosFiltrados[index])) {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email') || sessionStorage.getItem('email');
    const data = {
      email: email,
      entreno: entreno,
      ejerciciosId: ejerciciosSeleccionados.map((ejer) => ejer.id)
    };
    const responseCreate = await crearEntreno(data);
    const mensaje = responseCreate.message;
    if (mensaje === "1") {
      toast.success("Creado el entreno");
    } else if (mensaje === "0") {
      toast.error("Hubo un error durante la creación del entreno");
    } else if (mensaje === "2") {
      toast.error("Ese entreno ya existe");
    }
  };

  return (
    <>
    <NavDesktop />
      <div className="flex gap-6 p-6 mt-16">
        {/* Sección de ejercicios disponibles */}
        <div className="flex-1">
          
          <SelectorGrupos grupo={grupo} setGrupo={setGrupo} />
          <div className="bg-teal-500 w-full flex flex-wrap gap-4 p-4 rounded mt-4">
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
        <div className="flex flex-col w-1/4"> {/* Ajusta el ancho según sea necesario */}
          <form action="#" onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="mb-6">
            <label htmlFor="entreno" className="block mb-2 font-bold">Nombre del entreno</label>
            <input
              type="text"
              id="entreno"
              value={entreno}
              onChange={(e) => setEntreno(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
              type="submit"
              className="mt-4 py-2 bg-green-600 text-white rounded"
            >
              Crear Entreno
            </button>
            <div className="flex-1 overflow-y-auto">
              <Swiper
                direction={'vertical'}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                autoHeight={true}
                slidesPerView={3}
                className="h-[99vh]"
                loop={true}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {ejerciciosSeleccionados.length > 0
                  ? ejerciciosSeleccionados.map((ejercicio, index) => (
                    <SwiperSlide key={`slc-${ejercicio.id}`}>
                      <CardEjercicio
                        datosEjercicio={ejercicio}
                        key={`c-slc-${ejercicio.id}`}
                        onClick={() => handleClickEliminar(index)}
                        variant="delete"
                      />
                    </SwiperSlide>
                  ))
                  : <p className="text-center">No hay ejercicios seleccionados</p>}
              </Swiper>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
