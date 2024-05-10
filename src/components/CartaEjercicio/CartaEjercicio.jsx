import InputNum from "../InputNum/InputNum"


function CartaEjercicio({estilo =""}) {
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
    return (
        <div className="flex min-h-screen flex-col justify-center bg-slate-100">
            <div className="group h-96 w-96 [perspective:1000px]">
                <div className="relative h-full w-full rounded-xl shadow-xl [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="absolute inset-0">
                        A
                    </div>
                    <div className="absolute inset-0 h-full w-full rounded-xl shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        B
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartaEjercicio