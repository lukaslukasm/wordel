enum Lang {
	en = "en",
	sk = "sk",
}

type formErr = {
	message: string;
	type: string;
};

type user = {
	id: string;
	createdAt: Date;
	email: string;
	name: string;
	password: string;
	language: Lang;
	nOfGames: number;
	nOfWins: number;
	winsDistribution: winsDistribution;
	icon: icon;
};

type icon = [
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string
];

type reducerAction = {
	type: string;
	value?: string | string[] | alert | user | null;
	try?: number;
};

type alert = {
	message: string;
	permanent?: boolean;
	instant?: boolean;
};

interface lastUpdated extends Object {
	name?: string;
	password?: string;
	language?: Lang;
	nOfGames?: number;
	nOfWins?: number;
	winsDistribution?: winsDistribution;
	icon?: icon;
}

type winsDistribution = [number, number, number, number, number, number];

type state = {
	language: Lang;
	user: null | user;
	isStatsOpen: boolean;
	isHelpOpen: boolean;
	restart: boolean;
	alert: alert;
	lastUpdated: lastUpdated;
};

export type {
	Lang,
	user,
	alert,
	icon,
	winsDistribution,
	lastUpdated,
	state,
	formErr,
	reducerAction,
};
