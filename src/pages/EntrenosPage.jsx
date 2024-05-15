import Carousel from "../components/Carousel/Carousel.jsx"
import CardEjercicio from "../components/CardEjercicio/CardEjercicio.jsx"

const slides = [
    "../../public/imgs/edgar-chaparro-sHfo3WOgGTU-unsplash.jpg",
    "../../public/imgs/jonathan-borba-zfPOelmDc-M-unsplash.jpg",
    "../../public/imgs/karsten-winegeart-0Wra5YYVQJE-unsplash.jpg",
    "../../public/imgs/sushil-ghimire-5UbIqV58CW8-unsplash.jpg"
]

export default function EntrenosPage() {
    return (
        <>
            <div>
                Soy Entrenos
            </div>
            {/* <Carousel>
        {slides.map((s, index) => (
            <img key={index} src={s} alt={`Slide ${index}`} />
        ))}
    </Carousel> */}
            <CardEjercicio />
        </>

    )
}