import prisma from "@/db";
import { Data } from "@/types/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
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
	} else if (req.method === "PUT") {
		try {
			const updated = await prisma.user.update({
				where: {
					id: req.query.id as string,
				},
				data: { ...req.body },
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
