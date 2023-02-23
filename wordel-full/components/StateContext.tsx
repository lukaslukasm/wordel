import { createContext } from "react";
import { state } from "../types/types";

const StateContext = createContext<
	[state, React.Dispatch<React.SetStateAction<state>>]
>([{} as state, () => undefined]);

export default StateContext;
