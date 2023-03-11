import { createContext, Dispatch, SetStateAction } from "react";

const DarkModeContext = createContext<Theme>("light");
const setDarkModeContext = createContext<Dispatch<SetStateAction<Theme>>>(
  (value) => console.log("Default function", value)
);
