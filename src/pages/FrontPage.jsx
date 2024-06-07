import NavDesktop from "../components/NavDesktop/NavDesktop"

export default function FrontPage() {
    return(
        <>
            <NavDesktop />
            <div className="mt-16">
                <div className="bg-white h-1/2 flex">
                    <div >EJERCICIO</div>
                    <div>GRAFICA</div>
                </div>
                <div className="bg-white h-1/2">
                    ENTRENO
                </div>
            </div>
        </>
    )
}