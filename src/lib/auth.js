import { Google } from 'arctic';
import { getAuth } from './session';

export async function isAuthenticated() {
    try {
        const auth = await getAuth();

        if (auth?.user) {
            return true;
        }

        return false;
    } catch (e) {
        if (
            e.digest?.startsWith('NEXT_') ||
            e.digest === 'DYNAMIC_SERVER_USAGE'
        ) {
            throw e;
        }
        console.error('isAuthenticated error:', e.message);
        return false;
    }
}

const hostName = (
    process.env.HOST_NAME ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:3000'
).replace(/\/$/, '');

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID || 'your_google_client_id_here',
    process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret_here',
    `${hostName}/api/login/google/callback`
);
