import express from "express";
import ejs from "ejs";
import { signWithScopeSecret } from "./crypto.js";
import * as dotenv from "dotenv";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from "fs";

dotenv.config();

const app = express();
app.use(bodyParser.json({ type: 'application/json'}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.set("trust proxy", 1);

const expo = "Event1";

const SCOPE = process.env.SCOPE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const signature = await signWithScopeSecret({ expo }, PRIVATE_KEY);

app.use(express.static("public"));

app.get("/designer", (req, res) => {
	res.render("pages/designer", {
		signature,
		SCOPE,
		expo,
		page_name: "designer"
	});
});

app.get("/sendData", (req, res) => {
	const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
	res.render("pages/sendData", {
		signature,
		SCOPE,
		expo,
		data,
		page_name: "send-data"
	});
});

app.get("/", (req, res) => {
	res.render("pages/index", {
		signature,
		SCOPE,
		expo,
		page_name: "dashboard"
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
