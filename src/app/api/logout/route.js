import { invalidateCurrentSession } from '@/lib/session';

export async function POST() {
    await invalidateCurrentSession();

    return new Response(null, {
        status: 302,
        headers: {
            Location: '/',
        },
    });
}

export async function GET() {
    return new Response(null, {
        status: 302,
        headers: {
            Location: '/',
        },
    });
}
