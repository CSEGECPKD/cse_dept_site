import {
    generateSessionToken,
    createSession,
    setSessionTokenCookie,
} from '@/lib/session';
import { google } from '@/lib/auth';
import { cookies } from 'next/headers';
import User from '@/lib/models/User';
import dbConnect from '@/lib/db';
import crypto from 'crypto';

const emails =
    process.env.AUTHORIZED_EMAILS?.split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean) ?? [];

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function unauthorizedResponse(email) {
    const shown = email ? escapeHtml(email) : 'this Google account';
    return new Response(
        `<html><body>This email ${shown} is not authorized. <a href="/">Go To Home</a></body></html>`,
        {
            status: 403,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        }
    );
}

export async function GET(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const cookieStore = await cookies();
    const storedState = cookieStore.get('google_oauth_state')?.value ?? null;
    const codeVerifier = cookieStore.get('google_code_verifier')?.value ?? null;
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
    if (!response.ok) {
        return new Response(null, {
            status: 400,
        });
    }
    const claims = await response.json();
    const email = claims.email?.toLowerCase();

    if (
        !email ||
        claims.email_verified !== true ||
        !emails.includes(email)
    ) {
        return unauthorizedResponse(email);
    }

    await dbConnect();

    const existingUser = await User.findOne({
        email: email,
    });

    if (existingUser !== null) {
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, existingUser._id);
        await setSessionTokenCookie(sessionToken, session.expiresAt);
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/admin',
            },
        });
    }

    const userId = crypto.randomBytes(5).toString('hex');

    const user = await User.create({
        _id: userId,
        email: email,
    });

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user._id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);
    return new Response(null, {
        status: 302,
        headers: {
            Location: '/admin',
        },
    });
}
