"use client";
import { useEffect, useLayoutEffect, useReducer } from "react";
import { ReactNode } from "react";
import StateContext from "./StateContext";
import usePrevious from "../hooks/usePrevious";
import * as types from "../types/types";
import stateReducer from "@/hooks/stateReducer";
import fetchUser from "@/tools/fetchUser";
import updateUser from "@/tools/updateUser";

const initState = {
	language: "sk",
	user: null,
	isStatsOpen: false,
	isHelpOpen: false,
	restart: false,
	lastUpdated: {} as types.lastUpdated,
	alert: { message: "", permanent: false } as types.alert,
} as types.state;

function StateContextProvider({ children }: { children: ReactNode }) {
	const [state, stateDispatch] = useReducer(stateReducer, initState);

	const prevUser = usePrevious(state.user);

	useLayoutEffect(() => {
		const logInFromJWT = async () => {
			const user = await fetchUser();
			if (!user) return;
			stateDispatch({ type: "user", value: user });
			stateDispatch({
				type: "alert",
				value: { message: `Vitaj späť ${user.name}`, instant: true },
			});
		};
		if (state.user === null) logInFromJWT();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!state.user || !prevUser) return;
		updateUser(prevUser, state, stateDispatch);
		//eslint-disable-next-line
	}, [state.user]);

	return (
		<StateContext.Provider value={[state, stateDispatch]}>
			{children}
		</StateContext.Provider>
	);
}

export default StateContextProvider;
