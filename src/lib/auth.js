import { Google } from 'arctic';
import { getAuth } from './session';

export async function isAuthenticated() {
    const auth = await getAuth();

    if (auth?.user) {
        return true;
    }

    return false;
}

const hostName = (process.env.HOST_NAME ?? '').replace(/\/$/, '');

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${hostName}/api/login/google/callback`
);
