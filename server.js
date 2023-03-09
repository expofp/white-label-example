import express from "express";
import path from "path";
import ejs from "ejs";
import { signWithScopeSecret } from "./crypto.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.engine('html', ejs.renderFile);

const expo = "22";

const SCOPE = process.env.SCOPE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const signature = await signWithScopeSecret({ expo }, PRIVATE_KEY);

app.get("/designer", async (req, res) => {
	return res.render(path.join(__dirname, "designer.html"), { signature, SCOPE, expo });
});

app.get("/", (req, res) => {
	return res.send("<a href='/designer'>Designer</a>");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
