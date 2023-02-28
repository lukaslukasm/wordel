import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

type user = { id: string; name: string; email: string };

export const hashPassw = async (passw: string) => {
	return await bcrypt.hash(passw, 2);
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
		throw new Error("not authorized");
	}

	const [, token] = bearer.split(" ");

	if (!token) {
		throw new Error("not valid token");
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET as Secret);
		console.log(user);
		return user;
	} catch (error: any) {
		throw new Error(error);
	}
};
