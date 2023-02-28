import { icon } from "@/types/types";

const generateUniqueIcon = async () => {
	let uniqueIcon: icon = generateIcon();

	while (!(await isIconUnique(uniqueIcon))) uniqueIcon = generateIcon();

	return uniqueIcon;
};

const generateIcon = (): icon => {
	const colors = ["green", "yellow", "neutral"];
	let arr = [];

	for (let i = 0; i < 9; i++) {
		arr.push(colors[Math.floor(Math.random() * 3)]);
	}
	return arr as icon;
};

const isIconUnique = async (generatedIcon: icon) => {
	try {
		const req = await fetch(`/api/icon`, {
			method: "GET",
			mode: "cors",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				icon: generatedIcon,
			}),
		});
		const res = await req.json();
		if (res.statusCode === 200) return res.isIconUnique;
		throw new Error("problem with creating icon");
	} catch (error: any) {
		console.log(error);
	}
};

export { generateUniqueIcon, generateIcon };
