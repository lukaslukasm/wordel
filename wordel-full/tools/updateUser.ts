import { hashPassw } from "@/modules/auth";
import * as types from "@/types/types";

const updateUser = async (
	prevUser: types.user,
	state: types.state,
	stateDispatch: Function
) => {
	if (!prevUser) return;
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
			body: JSON.stringify(state.lastUpdated),
		});

		if (!req.ok) throw new Error("Error updating the user.");
		stateDispatch({ type: "cleanLastUpdated" });
	} catch (error: any) {
		console.log(error.message);
	}
};

export default updateUser;
