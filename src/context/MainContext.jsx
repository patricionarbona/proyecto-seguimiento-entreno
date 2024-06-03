import { createContext, useState } from "react";

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [emailUser, setEmailUser] = useState("");

  return (
    <MainContext.Provider value={{ emailUser, setEmailUser }}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
