import { useContext, useEffect } from "react";
import NavDesktop from "../components/NavDesktop/NavDesktop";
import Entrenos from "./Entrenos";
import MainContext from "../context/MainContext";
import { useNavigate } from "react-router-dom";

export default function FrontPage() {
  const { emailUser } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!emailUser) navigate("/");
  }, []);

  return (
    <>
      <NavDesktop />
      <div className="mt-24 flex flex-col  h-[94vh]">
        <div className="h-[47vh] flex flex-col sm:flex-row gap-4 justify-between mt-4 w-11/12 mx-auto ">
          <div className="bg-royal-blue-100 h-full w-full md:w-3/12 rounded-2xl shadow-sm flex items-center justify-center ">
            <img src="/img/coming_soon.jpeg" alt="" className="h-1/2" />
          </div>
          <div className="bg-royal-blue-100 h-full w-full md:w-8/12 rounded-2xl shadow-sm flex items-center justify-center">
            <img src="/img/coming_soon.jpeg" alt="" className="h-1/2" />
          </div>
        </div>
        <div className="bg-royal-blue-100 flex h-11/12 w-11/12 items-center justify-center my-4 mx-auto rounded-2xl shadow-sm pt-4 pb-8">
          <Entrenos variant="front" />
        </div>
      </div>
    </>
  );
}
