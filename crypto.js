import { subtle } from "node:crypto";

export async function signWithScopeSecret(data, scopeKey) {
	const [scope, privateKey, publicKey, publicKeySignature] = scopeKey.split(":");
	const signature = await sign(data, privateKey);
	return btoa([signature, scope, publicKey, publicKeySignature].join(":"));
}

async function sign(data, privateKey) {
	const signature = await subtle.sign(
		{
			name: "RSA-PSS",
			saltLength: 32,
		},
		await stringToPrivateKey(privateKey),
		Buffer.from(JSON.stringify(data))
	);

	return Buffer.from(signature).toString("base64");
}

async function stringToPrivateKey(key) {
	return subtle.importKey(
		"pkcs8",
		Buffer.from(key, "base64"),
		{
			name: "RSA-PSS",
			hash: "SHA-256",
		},
		true,
		["sign"]
	);
}
