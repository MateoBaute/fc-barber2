'use client'

import { createContext, useState, ReactNode, useContext } from "react";

interface contextAppType {
  isLogged: boolean;
  setIsLogged: (logged: boolean) => void;
  logout: () => void; 
}

export const MyAppContext = createContext<contextAppType | undefined>(undefined);

export function MyAppContextProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);

  const logout = () => {
    setIsLogged(false);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <MyAppContext.Provider value={{ isLogged, setIsLogged, logout }}>
      {children}
    </MyAppContext.Provider>
  );
}

export function useMyApp() {
  const context = useContext(MyAppContext);
  if (!context) {
    throw new Error("useMyApp debe ser usado dentro de un MyAppContextProvider");
  }
  return context;
}
