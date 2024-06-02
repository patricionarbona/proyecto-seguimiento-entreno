import { useEffect, useState } from "react";
import SelectorGrupos from "../components/Selectores/SelectorGrupos";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { crearEntreno, recuperarEjerciciosGrupo } from "../utils/Peticiones";
import toast from "react-hot-toast";
import CardEjercicio from "../components/CardEjercicio/CardEjercicio";

export default function MakeTrain() {
  const [entreno, setEntreno] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([]);
  const [grupo, setGrupo] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await recuperarEjerciciosGrupo(grupo);
        console.log(response.map((res) => [res.foto, res.ejercicio]));
        setEjercicios(response);
      } catch (err) {
        console.error("Error al recuperar los grupos:", err);
      }
    };
    fetchCategories();
  }, [grupo]);

  const handleClick = (index) => {
    console.log("antes: ", ejerciciosSeleccionados);
    setEjerciciosSeleccionados((prevSeleccionados) => {
      if (
        !prevSeleccionados.find((ejercicio) => ejercicio === ejercicios[index])
      ) {
        toast.success("ejercicio añadido");
        return [...prevSeleccionados, ejercicios[index]];
      }
      toast.error("el ejercicio ya esta seleccionado");
      return prevSeleccionados;
    });
    console.log("despues: ", ejerciciosSeleccionados);
  };

  const handleClickEliminar = (index) => {
    const newEjerciciosSeleccionados = ejerciciosSeleccionados.filter(
      (ejercicio, i) => i !== index
    );
    setEjerciciosSeleccionados(newEjerciciosSeleccionados);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email') || sessionStorage.getItem('email')
    const data = {
      email: email,
      entreno: entreno,
      ejerciciosId: ejerciciosSeleccionados.map((ejer) => ejer.id)
    }
    console.log(data)
    const responseCreate = await crearEntreno(data);
    const mensaje = responseCreate.message
    if (mensaje === "1") {
      toast.success("Creado el entreno")
    } else if (mensaje === "0") {
      toast.error("Hubo un error durante la creación del entreno")
    } else if (mensaje === "2") {
      toast.error("Ese entreno ya existe")
    }
  };

  return (
    <div>
      <form action="#" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="entreno">Nombre del entreno</label>
          <input
            type="text"
            id="entreno"
            value={entreno}
            onChange={(e) => setEntreno(e.target.value)}
            required
          />
        </div>
        <SelectorGrupos grupo={grupo} setGrupo={setGrupo} />
        {/* Slider superior */}
        <div
          className="bg-teal-500 w-11/12 flex justify-evenly gap-5 flex-wrap mx-auto"
        >
            {ejercicios.map((ejercicio, index) => (
                <CardEjercicio
                  datosEjercicio={ejercicio}
                  key={`c-ejer-${ejercicio.id}`}
                  onClick={() => handleClick(index)}
                />
            ))}
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {ejerciciosSeleccionados.length > 0
              ? ejerciciosSeleccionados.map((ejercicio, index) => (
                  <SwiperSlide
                    key={`slc-${ejercicio.id}`}
                    // onClick={() => handleClickEliminar(index)}
                  >
                    <CardEjercicio
                      datosEjercicio={ejercicio}
                      key={`c-slc-${ejercicio.id}`}
                      onClick={() => handleClickEliminar(index)}
                      variant="delete"
                    />
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
        <div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Crear Entreno
          </button>
        </div>
      </form>
    </div>
  );
}
