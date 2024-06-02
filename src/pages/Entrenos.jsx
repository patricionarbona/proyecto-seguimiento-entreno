import { useEffect, useState } from "react";
import SelectorEntrenos from "../components/Selectores/SelectorEntrenos";
import { guardarEjercicioEntreno, recuperarEjerciciosEntreno } from "../utils/Peticiones";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import CardSaveEjercicio from "../components/CartaEjercicio/CardSaveExercise";

export default function Entrenos () {
    const [entreno, setEntreno] = useState('');
    const [ejerciciosEntreno, setEjerciciosEntreno] = useState([]);
    const [peso, setPeso] = useState('');
    const [series, setSeries] = useState('');
    const [repeticiones, setRepeticiones] = useState('');
    const [observacion, setObservacion] = useState('');

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

    const handleSubmit = async (e, ejercicio) => {
        // e.preventDefault();
        console.log(entreno);

        const formData = new FormData();
        formData.append('idEntreno', entreno);
        formData.append('ejercicioId', ejercicio.id );
        formData.append('peso', peso);
        formData.append('series', series);
        formData.append('repeticiones', repeticiones);
        formData.append('observacion', observacion);

        try {
            const response = await guardarEjercicioEntreno(formData);
            console.log("Respuesta del servidor:", response);
        } catch (err) {
            console.error("Error al guardar el ejercicio en el entreno:", err);
        }
    };

    return (
        <div>
            <SelectorEntrenos entreno={entreno} setEntreno={setEntreno} />

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
                    {ejerciciosEntreno.length > 0 &&
                        ejerciciosEntreno.map((ejercicio) => (
                            <SwiperSlide key={`slc-${ejercicio.id}`}>
                                <CardSaveEjercicio
                                    datosEjercicio={ejercicio}
                                    onClick={(e) => handleSubmit(e, ejercicio)}
                                    setPeso={setPeso}
                                    setSeries={setSeries}
                                    setRepeticiones={setRepeticiones}
                                    setObservacion={setObservacion}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
}
