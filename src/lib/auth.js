import { Google } from "arctic";
import { getAuth, validateSessionToken } from "./session";

export async function isAuthenticated() {
  const auth = await getAuth();

  if (auth?.user) {
    return true;
  }

  return false;
}

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.HOST_NAME}/api/login/google/callback`,
);
