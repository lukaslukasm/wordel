import * as types from "@/types/types";
import getUserInfo from "./getUserInfo";

const fetchUser = async () => {
	if (
		localStorage.getItem("jwt") !== null ||
		sessionStorage.getItem("jwt") !== null
	) {
		let user: types.user | undefined;
		if (localStorage.getItem("jwt") !== null)
			user = await getUserInfo(localStorage.getItem("jwt"));
		else user = await getUserInfo(sessionStorage.getItem("jwt"));
		if (user) return user;
	}
	return null;
};

export default fetchUser;
