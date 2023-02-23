"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { ReactNode } from "react";
import getUserInfo from "../tools/getUserInfo";
import StateContext from "./StateContext";
import usePrevious from "../hooks/usePrevious";
import * as types from "../types/types";

function StateContextProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState({
		language: "sk",
		user: null,
		isStatsOpen: false,
		isHelpOpen: false,
	} as types.state);

	const prevUser = usePrevious(state.user);

	const fetchUser = async () => {
		if (
			localStorage.getItem("jwt") !== null ||
			sessionStorage.getItem("jwt") !== null
		) {
			let user: types.user;
			if (localStorage.getItem("jwt") !== null)
				user = await getUserInfo(localStorage.getItem("jwt"));
			else user = await getUserInfo(sessionStorage.getItem("jwt"));
			setState((prev) => ({
				...prev,
				language: user.language as types.Lang,
				user,
			}));
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	useEffect(() => {
		if (state.user === null || state.user === undefined) return;
		if (prevUser === null) return;
		updateUser();
		//eslint-disable-next-line
	}, [state.user, state.language]);

	const updateUser = async () => {
		try {
			if (!state.user) throw { message: "no user" };
			let jwt = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
			const req = await fetch(`/api/user/${state.user.id}`, {
				method: "PUT",
				mode: "cors",
				credentials: "same-origin",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...state.user, language: state.language }),
			});
			if (!req.ok) throw new Error("Error updating the user.");
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<StateContext.Provider value={[state, setState]}>
			{children}
		</StateContext.Provider>
	);
}

export default StateContextProvider;
