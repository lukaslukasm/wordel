import prisma from "../db";
import { comparePassws, createJWT, hashPassw } from "../modules/auth";

// handlers are final destinations, they dont do next. but if they do, it is in order to catch async errs.
export const createUser = async (req, res, next) => {
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
		return;
	} catch (error) {
		error.type = "input"; //def err status je 500
		next(error); //we have to trycatch evry single await bitch samostatne, a hocico dam ako param do next je automaticky err.
	}
};

export const logIn = async (req, res, next) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});

		const isValid = await comparePassws(req.body.password, user.password);
		if (!isValid) {
			const err = { type: "passw" };
			throw err;
		}

		const token = createJWT(user);
		res.status(200);
		res.json({ token, user });
	} catch (error) {
		if (!error.type) error.type = "email";
		next(error);
	}
};

export const getUsers = async (req, res) => {
	const users = await prisma.user.findMany({});
	res.json({ data: users });
	res.status(200);
};

export const getUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200);
		res.json({ data: user });
	} catch (error) {
		error.type = "input";
		next(error);
	}
};

export const updateUser = async (req, res) => {
	const updated = await prisma.user.update({
		where: {
			id: req.params.id,
		},
		data: { ...req.body },
	});
	res.status(200);
	res.json({ data: updated });
};
