import prisma from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const iconExists = await prisma.user.findUnique({
		where: {
			icon: req.body.icon,
		},
	});

	if (iconExists) {
		res.status(200).json({ isIconUnique: true });
	} else {
		res.status(400).json({ isIconUnique: false });
	}
};

export default handler;
