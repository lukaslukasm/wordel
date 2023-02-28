import prisma from "@/db";
import { hashPassw, protect } from "@/modules/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// GET
	if (req.method === "GET") {
		try {
			protect(req, res);
			const user = await prisma.user.findUnique({
				where: { id: req.query.id as string },
			});
			if (!user) throw { message: "User not found" };
			res.status(200);
			res.json({ data: user });
			return res;
		} catch (error: any) {
			res.status(400);
			res.json({ ...error });
		}

		// UPDATE
	} else if (req.method === "PUT") {
		try {
			protect(req, res);
			let load;
			if (req.body.password)
				load = { password: await hashPassw(req.body.password) };
			else load = { ...req.body };
			const updated = await prisma.user.update({
				where: {
					id: req.query.id as string,
				},
				data: load,
			});
			res.status(200);
			res.json({ data: updated });
		} catch (error: any) {
			res.status(400);
			res.json({ ...error });
		}
	} else {
		res.status(401);
		res.json({ message: "Invalid method" });
		return res;
	}
}
