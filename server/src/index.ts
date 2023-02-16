import app from "./server";
import config from "./config";

import * as dotenv from "dotenv"; //.env sa samo od seba neloadne. musi sa to robit pri spusteni servera, a to takto. dotenv trebalo npm instalovat.
dotenv.config(); // po tomto viem accessnut cely .env subor v mojom enviroente cez process.env

app.listen(config.port, () => {
	console.log("hello there");
});
