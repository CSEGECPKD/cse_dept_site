import 'server-only';
import { cache } from 'react';

import {
    encodeBase32LowerCaseNoPadding,
    encodeHexLowerCase,
} from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import Session from './models/Session.js';
import dbConnect from './db.js';
import { cookies } from 'next/headers';

export function generateSessionToken() {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession(token, userId) {
    await dbConnect();
    const sessionId = encodeHexLowerCase(
        sha256(new TextEncoder().encode(token))
    );
    const session = {
        _id: sessionId,
        user: userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };
    await Session.create(session);
    return session;
}

export const getAuth = cache(async () => {
    const token = await getSessionToken();
    if (!token || token?.length === 0) {
        return { user: null, session: null };
    }

    const auth = await validateSessionToken(token);

    return auth;
});

export const validateSessionToken = async (token) => {
    await dbConnect();
    const sessionId = encodeHexLowerCase(
        sha256(new TextEncoder().encode(token))
    );
    const result = await Session.findById(sessionId).populate('user');
    if (!result) {
        return { session: null, user: null };
    }
    const user = result.user;
    const session = {
        ...JSON.parse(JSON.stringify(result)),
        user: undefined,
    };
    const time = new Date(session.expiresAt);
    if (Date.now() >= time.getTime()) {
        await Session.findByIdAndDelete(sessionId);
        return { session: null, user: null };
    }
    if (Date.now() >= time.getTime() - 1000 * 60 * 60 * 24 * 15) {
        result.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await result.save();
    }
    return { session, user };
};
const SESSION_COOKIE_NAME = 'session';

export async function setSessionTokenCookie(token, expiresAt) {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        path: '/',
    });
}

export async function deleteSessionTokenCookie() {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/',
    });
}

export async function getSessionToken() {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}
