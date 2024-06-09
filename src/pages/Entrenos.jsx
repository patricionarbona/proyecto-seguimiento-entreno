import { useEffect, useState } from "react";
import SelectorEntrenos from "../components/Selectores/SelectorEntrenos";
import {
  guardarEjercicioEntreno,
  recuperarEjerciciosEntreno,
} from "../utils/Peticiones";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import CardSaveEjercicio from "../components/CardEjercicio/CardSaveExercise";
import NavDesktop from "../components/NavDesktop/NavDesktop";

export default function Entrenos() {
  const [entreno, setEntreno] = useState("");
  const [ejerciciosEntreno, setEjerciciosEntreno] = useState([]);
  const [peso, setPeso] = useState(0);
  const [series, setSeries] = useState(0);
  const [repeticiones, setRepeticiones] = useState(0);
  const [observacion, setObservacion] = useState("");

  useEffect(() => {
    const fetchEjercicios = async (entrenoId) => {
      if (!entrenoId) return;
      try {
        console.log(entrenoId);
        const response = await recuperarEjerciciosEntreno(entrenoId);
        console.log(response);
        setEjerciciosEntreno(response);
      } catch (err) {
        console.error("Error al recuperar los ejercicios del entreno:", err);
      }
    };
    fetchEjercicios(entreno);
  }, [entreno]);

  const handleSubmit = async (e, ejercicioId) => {
    // e.preventDefault();
    console.log(entreno);
    console.log(ejercicioId)
    console.log(e)
    console.log(peso)
    console.log(typeof(peso))
    const datosEjercicio = {
        id: ejercicioId,
        idEntreno: entreno,
        peso: peso,
        series: series,
        repeticiones: repeticiones,
        observacion: observacion
    }
    console.log(datosEjercicio)

    try {
      const response = await guardarEjercicioEntreno(datosEjercicio);
      console.log("Respuesta del servidor:", response);
    } catch (err) {
      console.error("Error al guardar el ejercicio en el entreno:", err);
    }
  };

  return (
    <>
    <NavDesktop />
    <div className="mt-16">
      <SelectorEntrenos entreno={entreno} setEntreno={setEntreno} />

      <div className="flex flex-wrap gap-16">
        {/* <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                > */}
        {ejerciciosEntreno.length > 0 &&
          ejerciciosEntreno.map((ejercicio) => (
            // <SwiperSlide key={`slc-${ejercicio.id}`}>
            <CardSaveEjercicio
              key={`slc-${ejercicio.id}`}
              datosEjercicio={ejercicio}
              onClick={(e) => handleSubmit(e, ejercicio.id)}
              setPeso={setPeso}
              setSeries={setSeries}
              setRepeticiones={setRepeticiones}
              setObservacion={setObservacion}
            />
            // </SwiperSlide>
          ))}
        {/* </Swiper> */}
      </div>
    </div>
    </>
  );
}
