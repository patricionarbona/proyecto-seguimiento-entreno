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
        <div className="h-96 w-96 relative [perspective:1000px] ">
            <div className={"absolute h-full w-full [transition:1s] [transform-style:preserve-3d]" + (isVolteado? " [transform:rotateY(-180deg)]":"")}>
                <div className="absolute h-full w-full rounded-xl shadow-xl [z-index:2] [backface-visibility:hidden] flex flex-col justify-center">
                    <button
                        onClick={handleVoltear} 
                    className={"absolute top-0 right-0 " + (isVolteado? "invisible":"visible")}>
                        A
                    </button>
                    <div className="">
                        <h3>{nombreEjercicio}</h3>
                        <img
                            className="h-20 w-20" 
                            src={rutaImg} alt="" />
                        <button>
                            Añadir
                        </button>
                    </div>
                </div>
                <div className="absolute h-full w-full rounded-xl shadow-xl [z-index:2] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <button
                    onClick={handleVoltear}
                     className={"absolute top-0 right-0 " + (isVolteado? "visible":"invisible")}>
                        B
                    </button>
                    <h3>Instrucciones</h3>
                    <p>{recomendacion.join(' ')}</p>
                </div>
            </div>
        </div>
    )
}