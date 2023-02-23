import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

type user = { id: string; name: string; email: string };

export const hashPassw = (passw: string) => {
	return bcrypt.hash(passw, 2);
};

export const comparePassws = (passw: string, hash: string | null) => {
	if (!hash) return;
	return bcrypt.compare(passw, hash);
};

export const createJWT = (user: user | null) => {
	if (!user) return;
	const token = jwt.sign(
		{
			name: user.name,
			id: user.id,
			email: user.email,
		},
		process.env.JWT_SECRET as Secret
	);
	return token;
};

export const protect = (req: NextApiRequest, res: NextApiResponse) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: "not authorized" });
		return;
	}

	const [, token] = bearer.split(" ");

	if (!token) {
		res.status(401);
		res.json({ message: "not valid token" });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET as Secret);
		req.body.user = user;
		return;
	} catch (error) {
		res.status(401);
		res.json({ message: "no" });
	}
};
