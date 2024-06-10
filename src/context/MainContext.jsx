import { createContext, useEffect, useState } from "react";

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [emailUser, setEmailUser] = useState("");
  const [userCargo, setUserCargo] = useState(false);

  useEffect(() => {
    const dataUsuario = JSON.parse(localStorage.getItem("dataUser")) || JSON.parse(sessionStorage.getItem("dataUser"))
    console.log(JSON.parse(sessionStorage.getItem("dataUser")))
    if(dataUsuario) {
      setEmailUser(dataUsuario.email)
      setUserCargo(dataUsuario.admin)
    }
  },[])

  return (
    <MainContext.Provider value={{ 
        emailUser, 
        setEmailUser,
        userCargo,
        setUserCargo,
         }}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
