import { createContext, useState } from "react";

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [emailUser, setEmailUser] = useState("");
  const [userCargo, setUserCargo] = useState(false);

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
