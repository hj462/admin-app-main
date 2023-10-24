import { createContext } from "react";

export const Context = createContext({
  geography: "",
  setGeography: (value: string) => {},
});
