import NavDesktop from "../components/NavDesktop/NavDesktop"
import Entrenos from "./Entrenos"

export default function FrontPage() {
    return(
        <>
            <NavDesktop />
            <div className="mt-16 flex flex-col">
                <div className="h-[47vh] flex flex-col sm:flex-row justify-between mt-4 w-11/12 mx-auto ">
                    <div className="bg-slate-100 h-full w-3/12 rounded-2xl shadow-sm ">EJERCICIO</div>
                    <div className="bg-slate-100 h-full w-7/12 rounded-2xl shadow-sm ">GRAFICA</div>
                </div>
                <div className="bg-slate-100 flex h-full w-11/12 items-center justify-center my-4 mx-auto rounded-2xl shadow-sm pt-4 pb-8">
                    <Entrenos variant="front"/>
                </div>
            </div>
        </>
    )
}