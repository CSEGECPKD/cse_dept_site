import React from 'react';
import Gallery from '@/components/Gallery';

export const metadata = {
    title: 'Gallery',
    description:
        'Explore photos and visual highlights of departmental events, academic seminars, computing labs, workshops, and campus celebrations at CSE GEC Palakkad.',
};

const GalleryPage = () => {
    return (
        <div className="">
            <Gallery />
        </div>
    );
};

export default GalleryPage;
