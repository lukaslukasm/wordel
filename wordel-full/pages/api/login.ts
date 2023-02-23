import prisma from "@/db";
import { comparePassws, createJWT } from "@/modules/auth";
import { Data } from "@/types/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.status(401);
		res.json({ message: "Invalid method" });
		return res;
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});
		if (!user) throw new Error();
		const isValid = await comparePassws(req.body.password, user.password);
		if (!isValid) {
			const err = { message: "Zlé heslo.", type: "password" };
			throw err;
		}

		const token = createJWT(user);
		res.status(200);
		res.json({ token, user });
	} catch (error: any) {
		if (!error.type) {
			error.type = "email";
			error.message = "Tento email nie je registrovaný.";
		}
		res.status(400);
		res.json({ ...error });
	}
}
