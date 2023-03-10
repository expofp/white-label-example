import express from "express";
import path from "path";
import ejs from "ejs";
import { signWithScopeSecret } from "./crypto.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.engine('html', ejs.renderFile);

const __dirname = path.resolve();

const expo = "22";

const SCOPE = process.env.SCOPE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const signature = await signWithScopeSecret({ expo }, PRIVATE_KEY);

app.get("/designer", (req, res) => {
	res.render(path.join(__dirname, "designer.html"), { signature, SCOPE, expo });
});

app.get("/", (req, res) => {
	res.send(`
		<div>
			<a href='/designer'>Designer</a>
		</div>
		<div>
			<a href='/sendData'>Send data.js</a>
		</div>
	`);
});

app.get("/sendData", (req, res) => {
	res.render(path.join(__dirname, "sendData.html"), { signature, SCOPE, expo });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
