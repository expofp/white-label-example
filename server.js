import express from "express";
import ejs from "ejs";
import { signWithScopeSecret } from "./crypto.js";
import * as dotenv from "dotenv";
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from "fs";

dotenv.config();

const app = express();
app.use(bodyParser.json({ type: 'application/json'}));
app.use(cookieParser());

app.use(session({
	secret: 'white-label-example',
	resave: false,
	saveUninitialized: false
}));

app.set('view engine', 'ejs');

app.set("trust proxy", 1);

const expo = "Event1";

const SCOPE = process.env.SCOPE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const signature = await signWithScopeSecret({ expo }, PRIVATE_KEY);

app.use(express.static("public"));

// app.use(requireAuthentication);

app.get("/login", (req, res) => {
	const protocol = req.protocol;
	const host = req.get("host");

	res.render("pages/login", {
		current_domain: `${protocol}://${host}`
	});
});

app.post('/login', (req, res) => {
	const { username, password } = req.body;
	if (username === process.env.APP_USERNAME && password === process.env.APP_PASSWORD) {
		req.session.authenticated = true;
		res.redirect('/');
	} else {
		res.status(401).send('Incorrect username or password');
	}
});

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

function requireAuthentication(req, res, next) {
	if (req.session.authenticated || req.path === '/login') {
		next();
	} else {
		res.redirect('/login');
	}
}
