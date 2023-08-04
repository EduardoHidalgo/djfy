export async function generateUrlAuthCodeFlow({
  clientId,
  redirectUri,
}: {
  clientId: string;
  redirectUri: string;
}): Promise<{
  url: string;
  codeVerifier: string;
}> {
  const codeVerifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("code_challenge", challenge);
  params.append("code_challenge_method", "S256");
  params.append("redirect_uri", redirectUri);
  params.append("response_type", "code");
  params.append("scope", "user-read-private user-read-email user-library-read");

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return {
    url,
    codeVerifier,
  };
}

export async function getAccessToken({
  clientId,
  code,
  codeVerifier,
  redirectUri,
}: {
  clientId: string;
  code: string;
  codeVerifier: string;
  redirectUri: string;
}) {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("code", code);
  params.append("code_verifier", codeVerifier);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", redirectUri);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

function generateCodeVerifier(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
