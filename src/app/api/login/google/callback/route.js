// app/login/google/callback/route.ts
import {
    generateSessionToken,
    createSession,
    setSessionTokenCookie,
} from '@/lib/session';
import { google } from '@/lib/auth';
import { cookies } from 'next/headers';
import User from '@/lib/models/User';
import dbConnect from '@/lib/db';
import { generateRandomString, alphabet } from 'oslo/crypto';
import { NextResponse } from 'next/server';

const emails = [
    'mohdhashique10@gmail.com',
    'viswajithviswa715@gmail.com',
    'jeraldjoyson21@gmail.com',
    'sabarisanthosh45@gmail.com',
    'mofahadkundupuzhakkal@gmail.com',
];

export async function GET(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = cookies().get('google_oauth_state')?.value ?? null;
    const codeVerifier = cookies().get('google_code_verifier')?.value ?? null;
    if (
        code === null ||
        state === null ||
        storedState === null ||
        codeVerifier === null
    ) {
        return new Response(null, {
            status: 400,
        });
    }
    if (state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    let tokens;
    try {
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch (e) {
        // Invalid code or client credentials
        return new Response(null, {
            status: 400,
        });
    }
    const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        }
    );
    const claims = await response.json();
    const email = claims.email;

    if (!emails.includes(email)) {
        return new Response(
            `<html><body>This email ${email} is not authorized <a href="/">Go To Home</a></body></html>`,
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            }
        );
    }

    await dbConnect();

    // TODO: Replace this with your own DB query.
    const existingUser = await User.findOne({
        email: email,
    });

    if (existingUser !== null) {
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, existingUser._id);
        setSessionTokenCookie(sessionToken, session.expiresAt);
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/admin',
            },
        });
    }

    const userId = generateRandomString(10, alphabet('a-z', '0-9'));

    const user = await User.create({
        _id: userId,
        email: email,
    });

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user._id);
    setSessionTokenCookie(sessionToken, session.expiresAt);
    return new Response(null, {
        status: 302,
        headers: {
            Location: '/admin',
        },
    });
}
