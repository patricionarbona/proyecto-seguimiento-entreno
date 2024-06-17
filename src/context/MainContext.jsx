import { createContext, useEffect, useState } from "react";

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [emailUser, setEmailUser] = useState(getInitialEmail());
  const [userCargo, setUserCargo] = useState(getInitialAdmin());
  const [view, setView] = useState("initial");

  function getInitialEmail() {
    const dataUsuario =
      JSON.parse(localStorage.getItem("dataUser")) ||
      JSON.parse(sessionStorage.getItem("dataUser"));
    console.log(JSON.parse(sessionStorage.getItem("dataUser")));
    if (dataUsuario) {
      return dataUsuario.email;
    }
  }

  function getInitialAdmin() {
    const dataUsuario =
      JSON.parse(localStorage.getItem("dataUser")) ||
      JSON.parse(sessionStorage.getItem("dataUser"));
    console.log(JSON.parse(sessionStorage.getItem("dataUser")));
    if (dataUsuario) {
      return dataUsuario.admin;
    }
  }

  return (
    <MainContext.Provider
      value={{
        emailUser,
        setEmailUser,
        userCargo,
        setUserCargo,
        view,
        setView,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
