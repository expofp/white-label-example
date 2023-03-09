const express = require("express");
const path = require("path");
const ejs = require("ejs");
const { signWithScopeSecret } = require("./crypto");

const app = express();

app.engine('html', ejs.renderFile);

const expo = "22";


const SCOPE = "testScope";

const PRIVATE_KEY = "testScope:MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALsJeKmh4EpDB+2sk4VO8CuLeCKh80VYkPK/yZCv9TZFdDD7BTg/Xuz76ZfzwrIvcJARjOFWLNVoDZdYInIPkUsCvJoZqoZONOpeA4XGazA7BW4rEY6mKppj/T6mgbDnwhAlEaSIDuuKb64PSOc90p/T51g10R8zl01w5PVqqZ2BAgMBAAECgYAX2aRWVTsJnTSUnS4OkLtVgipmmCoyTJHnMoeceKOXMRIY8NmAi6wqIhFue/n2yM/cvzAsx9VdvTAGfYme69dF9jkiozykpOamgynHK+rue+oyX5mbW7ziHBvRgfgkE8lx+HrWVVLKEwQNJFUAK8UWtaOWYb7ixzHUsdbLOsTmlQJBAPYcLzMwlLOWc2vif4o4KuEVfDcyy4sWbWdtsq8etD2hUVgZpF5jjrB3E3wHfKQBUfZMI4TtHqkPJO9kCSKit48CQQDCjZUhvhsYU+wADuEeBctWTT6SbVwrF6wsz1Yeuu7SFoV1PeFXTw2j9hZKSInagayfMp/GFJnD09sTZMTmlFHvAkA5is9yXYp3Dtc/wz5kt8s2w0o+sa6rf3vm8dwUW85ylnQpcB1hQE/NbJnupuV6hyB9wMGRQ8umZXcSTcZhBcB7AkBvNatnrFmkoGQo7Fh2Zu2CmYkI/oZPA6shuisKSeS2JrWG/SZQWBn9/W9kau6R/soD/lYiTihPLkzuWw3KmEH1AkBk+9VFBXWambuIT4C8UdLiBar2Eo0yxcJ4vbql6ntkk2dkqkPbmcp0TwLC3WT58nF+Xc3MVTSIHY05PUTxp8Sz:MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7CXipoeBKQwftrJOFTvAri3giofNFWJDyv8mQr/U2RXQw+wU4P17s++mX88KyL3CQEYzhVizVaA2XWCJyD5FLAryaGaqGTjTqXgOFxmswOwVuKxGOpiqaY/0+poGw58IQJRGkiA7rim+uD0jnPdKf0+dYNdEfM5dNcOT1aqmdgQIDAQAB:ThKAG2knNDn7uN9I8JwT+YjRobuYvObynp0zN7KQCWZmFPyl4I7o9xYWXP8WZI6bNHnBj++SVCP4zY48CIe//lTgCwYKktHCygsXKo0IDBHumwVwg6Tbn9ULb05+vzJ8CzFJyfX8LElkvryz8LSZXdJF+RAGin+rLjv2q9FxnN0=";

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
