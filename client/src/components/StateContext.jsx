import { createContext } from "react";

const StateContext = createContext([{}, () => undefined])

export default StateContext