const express = require("express");
const path = require("path");
const ejs = require("ejs");
const { signWithScopeSecret } = require("./crypto");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.engine('html', ejs.renderFile);

const expo = "22";

const SCOPE = process.env.SCOPE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const signature = signWithScopeSecret({ expo }, PRIVATE_KEY);

app.get("/designer", async (req, res) => {
	return res.render(path.join(__dirname, "designer.html"), { signature: await signature, SCOPE, expo });
})

app.get("/", (req, res) => {
	return res.send("<a href='/designer'>Designer</a>");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
