import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProviders = ({ children }) => {
  const [category, setCategory] = useState("");
  return <CategoryContext.Provider value={{ setCategory, category }}>{children}</CategoryContext.Provider>;
};
