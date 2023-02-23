async function getUserInfo(jwt: string | null) {
	if (!jwt) return;
	const [, details] = jwt.split(".");
	const id = JSON.parse(atob(details)).id;
	let res;
	try {
		const req = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
			{
				method: "GET",
				mode: "cors",
				credentials: "same-origin",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
			}
		);
		res = await req.json();
		if (req.status !== 200) throw new Error("error getting user from database");
		return res.data;
	} catch (error: any) {
		console.log(error.message);
	}
}
export default getUserInfo;
