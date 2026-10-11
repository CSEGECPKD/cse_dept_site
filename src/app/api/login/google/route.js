import { generateState, generateCodeVerifier } from 'arctic';
import { google, isAuthenticated } from '@/lib/auth';
import { cookies } from 'next/headers';
import {
    deleteSessionTokenCookie,
    getSessionToken,
} from '@/lib/session';

export async function GET() {
    if (await isAuthenticated()) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/admin',
            },
        });
    }

    const staleToken = await getSessionToken();
    if (staleToken) {
        await deleteSessionTokenCookie();
    }

    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ['profile', 'email'],
    });

    const cookieStore = await cookies();

    cookieStore.set('google_oauth_state', state, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10, // 10 minutes
        sameSite: 'lax',
    });
    cookieStore.set('google_code_verifier', codeVerifier, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10, // 10 minutes
        sameSite: 'lax',
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString(),
        },
    });
}
