import { Link } from "react-router-dom"

export default function NotFoundPage() {
    return(

        <div>
            404 Not Found
            <Link to={'/'}>Return to Home</Link>
        </div>
    )
}