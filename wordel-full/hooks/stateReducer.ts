import * as types from "@/types/types";

function stateReducer(
	state: types.state,
	action: types.reducerAction
): types.state {
	switch (action.type) {
		case "toggleStats":
			return {
				...state,
				isStatsOpen: !state.isStatsOpen,
			};
		case "toggleHelp":
			return {
				...state,
				isHelpOpen: !state.isHelpOpen,
			};
		case "restart":
			return {
				...state,
				alert: { message: "", permanent: false },
				restart: !state.restart,
			};
		case "alert":
			return {
				...state,
				alert: action.value as types.alert,
			};
		case "cleanLastUpdated":
			return { ...state, lastUpdated: {} as types.lastUpdated };
		// USER ALTERATION CASES
		case "user":
			let newUser = action.value as types.user;
			if (newUser)
				return {
					...state,
					restart: !state.restart,
					user: newUser,
					language: newUser.language as types.Lang,
				};
			return { ...state, user: newUser, restart: !state.restart };
		case "lang":
			let value = (state.language === "sk" ? "en" : "sk") as types.Lang;
			return {
				...state,
				lastUpdated: { language: value },
				user: {
					...state.user,
					language: value,
				} as types.user,
				language: value,
			};
		case "name":
			return {
				...state,
				lastUpdated: { name: action.value as string },
				user: { ...state.user, name: action.value as string } as types.user,
			};
		case "password":
			return {
				...state,
				lastUpdated: { password: action.value as string },
				user: {
					...state.user,
					password: action.value as string,
				} as types.user,
			};
		case "icon":
			return {
				...state,
				lastUpdated: { icon: action.value as types.icon },
				user: {
					...state.user,
					icon: action.value as types.user["icon"],
				} as types.user,
			};
		case "win":
			if (!state.user || !action.try) {
				return { ...state, alert: { message: "👏 👏🏻 👏🏾", permanent: false } };
			}
			// 6 hodin som tu zabil. PROBLEM: zober pole zo stateu a incrementi prvok arr[action.try-1]

			// Arrs & objs are REFERENCE TYPES, therefore 'newCopyOfArr = arr' NEUROBI kopiu, len vytvori novy pointer na tie iste data.
			// ked chcem urobit kopiu arru/obju treba novy arr/obj a spread operator. Taze 'newCopyOfArr = [...arr]' resp. 'newCopyOfObj = {...obj}'
			// arr/obj metody vedia byt mutable AJ immutable. Treba poriadne citat dokumentaciu, ci metoda pracuje s kopiou, alebo mutuje vstup.
			// V REDUXE / REDUCERI NIKDY NEPOUZIVAME MUTABLE METODY NA STEJTE!
			let wins = [...state.user.winsDistribution];
			wins.splice(action.try - 1, 1, wins[action.try - 1] + 1);
			return {
				...state,
				alert: { message: "👏 👏🏻 👏🏾", permanent: false },
				lastUpdated: {
					winsDistribution: wins as types.winsDistribution,
					nOfWins: state.user.nOfWins + 1,
					nOfGames: state.user.nOfGames + 1,
				},
				user: {
					...state.user,
					winsDistribution: wins as types.winsDistribution,
					nOfWins: state.user.nOfWins + 1,
					nOfGames: state.user.nOfGames + 1,
				},
			};
		case "loss":
			if (!state.user)
				return {
					...state,
					alert: { message: action.value as string, permanent: true },
				};
			return {
				...state,
				alert: { message: action.value as string, permanent: true },
				lastUpdated: { nOfGames: state.user.nOfGames + 1 },
				user: { ...state.user, nOfGames: state.user.nOfGames + 1 },
			};
		default:
			return state;
	}
}
export default stateReducer;
