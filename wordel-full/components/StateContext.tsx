import { createContext } from "react";
import { reducerAction, state } from "../types/types";

const StateContext = createContext<[state, React.Dispatch<reducerAction>]>([
	{} as state,
	() => undefined,
]);

export default StateContext;
