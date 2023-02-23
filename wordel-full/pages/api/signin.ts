import prisma from "@/db";
import { createJWT, hashPassw } from "@/modules/auth";
import { Data } from "@/types/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function signin(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(401);
		res.json({ message: "Invalid method" });
		return res;
	}

	try {
		const user = await prisma.user.create({
			data: {
				name: req.body.name,
				password: await hashPassw(req.body.password),
				email: req.body.email,
				icon: req.body.icon,
			},
		});
		const token = createJWT(user);
		res.status(200);
		res.json({ token, user });
		return res;
	} catch (error: any) {
		res.status(400);
		error.type = "input"; //def err status je 500
		error.message = error.message;
		res.json({ message: "Tento email už je registrovaný.", type: "email" });
		return res;
	}
}
