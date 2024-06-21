import { type NewUserPayload } from "./types";

interface SilentLoginResult {
  id_token: string;
  access_token: string;
}

export const silentLogin = async ({
  email,
  password,
}: NewUserPayload): Promise<SilentLoginResult> => {
  const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      audience: process.env.AUTH0_AUDIENCE,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      grant_type: "password",
      scope: "openid profile email",
      username: email,
      password,
    }),
  });

  return await response.json();
};
