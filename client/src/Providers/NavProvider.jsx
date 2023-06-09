import { useContext, createContext, useState } from "react";

export const NavContext = createContext();

export const NavContextProviders = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);
  return <NavContext.Provider value={{ openNav, setOpenNav }}>{children}</NavContext.Provider>;
};
