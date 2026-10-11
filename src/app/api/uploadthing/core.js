import { createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getAuth } from '@/lib/session';

const f = createUploadthing();

const authMiddleware = async () => {
    const auth = await getAuth();
    const user = auth?.user;

    if (!user) {
        throw new UploadThingError('Unauthorized');
    }

    return { userId: user._id?.toString() || user.id };
};

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: '4MB' } })
        .middleware(authMiddleware)
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, url: file.url };
        }),

    pdfUploader: f({ pdf: { maxFileSize: '16MB' } })
        .middleware(authMiddleware)
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, url: file.url };
        }),
};
