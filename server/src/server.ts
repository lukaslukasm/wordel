import express from "express";
import { protect } from "./modules/auth";
import router from "./routes";
import morgan from "morgan";
import cors from "cors";
import { createUser, logIn } from "./handlers/user";

const app = express();
app.use(cors());
app.use(morgan("dev")); //middleware for development, len loguje pekne veci. ked pouzijem app.use bez cesty, funguje globalne. pozor, poradie zalezi.
app.use(express.json()); //allows user to send a json, this middleware translates url string to json if aplicable
app.use(express.urlencoded({ extended: true })); //puts url string into object for us

app.get("/", (req, res) => {
	console.log("Hello from Wordel-api!");
	res.status(200);
	res.json({ message: "hello" });
	// throw new Error("vsetko je v poriadku, len skusame ci funguju erore");
});

app.use("/api", protect, router);
app.post("/signin", createUser);
app.post("/login", logIn);

// this how handel errors. must go posledne!

app.use((err, req, res, next) => {
	switch (err.type) {
		case "input":
			res.status(400).json({
				message: "email už je registrovaný",
				type: "email",
			});
			break;
		case "auth":
			res.status(401).json({ message: "chyba overenia", type: err.type });
			break;
		case "email":
			res
				.status(401)
				.json({ message: "email nie je registrovaný", type: err.type });
			break;
		case "passw":
			res.status(401).json({ message: "zlé heslo", type: "password" });
			break;
		default:
			res.status(500).json({
				message:
					"Oj sorry, aj majster tesár sa sem tam utne, refrešni stránku a skús znova.",
				type: err.type,
			});
			break;
	}
});

export default app;
