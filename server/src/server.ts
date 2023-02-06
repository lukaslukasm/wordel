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
	// console.log("Hello from express!");
	// res.status(500);
	// res.json({ message: "hello" });
	throw new Error("vsetko je v poriadku, len skusame ci funguju erore");
});

app.use("/api", protect, router);
app.post("/signin", createUser);
app.post("/login", logIn);

// this how handel errors. must go posledne!

app.use((err, req, res, next) => {
	switch (err.type) {
		case "input":
			res.status(400).json({ message: "Invalid input." });
			break;
		case "auth":
			res.status(401).json({ message: "Auth error." });
			break;
		default:
			res.status(500).json({ message: "Oops that's on us." });
			break;
	}
});

export default app;
