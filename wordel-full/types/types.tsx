enum Lang {
	en = "en",
	sk = "sk",
}

type Data = {
	name: string;
};

type formErr = {
	message: string;
	type: string;
};

type user = {
	id: string;
	createdAt: Date;
	name: string;
	email: string;
	password: string;
	language: Lang;
	nOfGames: number;
	nOfWins: number;
	winsDistribution: number[];
	icon: string[];
};

type state = {
	language: Lang;
	user: null | user;
	isStatsOpen: boolean;
	isHelpOpen: boolean;
	restart: boolean;
};

export type { Lang, user, Data, state, formErr };
