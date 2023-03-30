import { subtle } from "node:crypto";

export async function signWithScopeSecret(data, scopeKey) {
	const [scope, privateKey, publicKey, publicKeySignature] = scopeKey.split(":");

	// Sign data
	const signatureBuffer = await subtle.sign(
		{
			name: "RSA-PSS",
			saltLength: 32,
		},
		await subtle.importKey(
			"pkcs8",
			Buffer.from(privateKey, "base64"),
			{
				name: "RSA-PSS",
				hash: "SHA-256",
			},
			true,
			["sign"]
		),
		Buffer.from(JSON.stringify(data))
	);

	const signature = Buffer.from(signatureBuffer).toString("base64");

	return btoa([signature, scope, publicKey, publicKeySignature].join(":"));
}
