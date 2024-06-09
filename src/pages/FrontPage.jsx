import NavDesktop from "../components/NavDesktop/NavDesktop"

export default function FrontPage() {
    return(
        <>
            <NavDesktop />
            <div className="mt-16 flex flex-col">
                <div className="h-[47vh] flex flex-col sm:flex-row justify-between mt-4 w-11/12 mx-auto ">
                    <div className="bg-slate-300 h-full w-3/12 rounded-2xl shadow-sm ">EJERCICIO</div>
                    <div className="bg-slate-300 h-full w-7/12 rounded-2xl shadow-sm ">GRAFICA</div>
                </div>
                <div className="bg-slate-300 flex h-[45vh] w-11/12 items-center justify-center my-4 mx-auto rounded-2xl shadow-sm">
                    <p>ENTRENO</p>
                </div>
            </div>
        </>
    )
}