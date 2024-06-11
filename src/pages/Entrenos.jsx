import { useEffect, useState } from "react";
import SelectorEntrenos from "../components/Selectores/SelectorEntrenos";
import {
  guardarEjercicioEntreno,
  recuperarEjerciciosEntreno,
} from "../utils/Peticiones";
import CardSaveEjercicio from "../components/CardEjercicio/CardSaveExercise";
import NavDesktop from "../components/NavDesktop/NavDesktop";

export default function Entrenos({ variant = "" }) {
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
      {variant !== "front" && <NavDesktop />}
      <div className={`h-full ${variant !== "front" ? 'md:mt-28 mt-[90px] ml-4' : 'mt-14 mx-16'}`}>
        <SelectorEntrenos entreno={entreno} setEntreno={setEntreno} />
        <div className="flex flex-wrap gap-16 mt-6 justify-center md:justify-normal">
          {ejerciciosEntreno.length > 0 &&
            ejerciciosEntreno.map((ejercicio) => (
              <CardSaveEjercicio
                key={`slc-${ejercicio.id}`}
                datosEjercicio={ejercicio}
                onClick={(e) => handleSubmit(e, ejercicio.id)}
                setPeso={setPeso}
                setSeries={setSeries}
                setRepeticiones={setRepeticiones}
                setObservacion={setObservacion}
              />
            ))}
        </div>
      </div>
    </>
  );
}
