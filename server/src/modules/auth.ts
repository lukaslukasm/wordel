import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type user = { id: String; name: String; email: String };

export const hashPassw = (passw: String) => {
	return bcrypt.hash(passw, 2);
};

export const comparePassws = (passw: String, hash: String) => {
	return bcrypt.compare(passw, hash);
};

export const createJWT = (user: user) => {
	const token = jwt.sign(
		{
			name: user.name,
			id: user.id,
			email: user.email,
		},
		process.env.JWT_SECRET
	);
	return token;
};

export const protect = (req, res, next) => {
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
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		res.status(401);
		res.json({ message: "no" });
	}
};
