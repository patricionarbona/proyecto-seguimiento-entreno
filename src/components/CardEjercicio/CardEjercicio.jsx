import { useState } from "react"

export default function CardEjercicio() {

    const [isVolteado, setVolteado ] = useState(false)

    const nombreEjercicio = "jalon pecho unilateral"
    const rutaImg = "https://v2.exercisedb.io/image/I4XMjCBFhqaGoJ"
    const musculo = "espalda alta"
    const recomendacion = [
        "Start by hanging from a pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart.",
        "Engage your core and pull your shoulder blades down and back.",
        "Bend your knees and tuck them towards your chest.",
        "Slowly lift your legs up, keeping them straight, until your body is parallel to the ground.",
        "Hold this position for a few seconds, then slowly lower your legs back down to the starting position.",
        "Repeat for the desired number of repetitions."
    ]

    const handleVoltear = () => {
        setVolteado(!isVolteado)
        console.log(isVolteado)
    }

    return (
        <div
            onClick={handleVoltear} 
        className="flex min-h-screen flex-col justify-center bg-slate-100">
            <div className="group h-96 w-96 [perspective:1000px]">
                <div 
                className={"relative h-full w-full rounded-xl shadow-xl [transform-style:preserve-3d]  [backface-visibility:hidden] [transition:1s] " + (isVolteado? "[transform:rotateY(180deg)]":"")}>
                    <div className="absolute">
                        <h3>{nombreEjercicio}</h3>
                        <img
                            className="h-20 w-20" 
                            src={rutaImg} alt="" />
                        <button>
                            
                        </button>
                    </div>
                    {/* Parte de atras, tiene que tener el mismo estilo que el frontal */}
                    <div className="absolute h-full w-full rounded-xl shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <h3>Instrucciones</h3>
                        <p>{recomendacion.join(' ')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}