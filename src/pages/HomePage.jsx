import NavDesktop from "../components/NavDesktop/NavDesktop"
import ApiEjercicio from "../utils/ApiEjercicio"

export default function HomePage() {
    ApiEjercicio("waist")
    return (
        <div>
            <NavDesktop/>
            Soy Home
        </div>
    )
}