import { createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getAuth } from '@/lib/session';

const f = createUploadthing();

const authMiddleware = async () => {
    try {
        const auth = await getAuth();
        const user = auth?.user;

        if (!user) {
            console.warn('[UploadThing] Unauthorized upload attempt: No logged-in admin session found.');
            throw new UploadThingError({
                code: 'FORBIDDEN',
                message: 'You must be logged in as an admin to upload files.',
            });
        }

        return { userId: user._id?.toString() || user.id };
    } catch (err) {
        if (err instanceof UploadThingError) {
            throw err;
        }
        console.error('[UploadThing middleware error]:', err);
        throw new UploadThingError({
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Authentication check failed',
        });
    }
};

export const ourFileRouter = {
    imageUploader: f(
        { image: { maxFileSize: '4MB' } },
        { awaitServerData: false }
    )
        .middleware(authMiddleware)
        .onUploadComplete(async ({ metadata, file }) => {
            return {
                uploadedBy: metadata.userId,
                url: file.ufsUrl || file.url,
            };
        }),

    pdfUploader: f(
        { pdf: { maxFileSize: '16MB' } },
        { awaitServerData: false }
    )
        .middleware(authMiddleware)
        .onUploadComplete(async ({ metadata, file }) => {
            return {
                uploadedBy: metadata.userId,
                url: file.ufsUrl || file.url,
            };
        }),
};
