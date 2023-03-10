import { user } from "@/types/types";

async function getUserInfo(jwt: string | null) {
	if (!jwt) return;
	const [, details] = jwt.split(".");
	const id = JSON.parse(Buffer.from(details, "base64").toString("ascii")).id;
	let res;
	try {
		const req = await fetch(`/api/user/${id}`, {
			method: "GET",
			mode: "cors",
			credentials: "same-origin",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
		res = await req.json();
		if (req.status !== 200) throw new Error("error getting user from database");
		return res.data as user;
	} catch (error: any) {
		throw new Error(error);
	}
}
export default getUserInfo;
