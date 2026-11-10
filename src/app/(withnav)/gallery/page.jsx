import React from 'react';
import Gallery from '@/components/Gallery';
import { getGalleries } from '@/actions/gallery.action';

export const revalidate = 3600;

export const metadata = {
    title: 'Gallery',
    description:
        'Explore photos and visual highlights of departmental events, academic seminars, computing labs, workshops, and campus celebrations at CSE GEC Palakkad.',
};

export default async function GalleryPage() {
    let images = [];
    try {
        images = await getGalleries();
    } catch {
        // fallback handled inside Gallery component
    }

    return (
        <div>
            <Gallery images={images} />
        </div>
    );
}
