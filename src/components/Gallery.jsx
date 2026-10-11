'use client';
import React from 'react';
import ColoredSection from './ColoredSection';
import { ImageGallery } from 'react-image-grid-gallery';

const imagesArray = [
    {
        alt: 'Department activity — campus event',
        caption: 'Department Activity',
        src: '/gallery/1.jpg',
    },
    {
        alt: 'Students at a college event',
        caption: 'College Event',
        src: '/gallery/2.jpg',
    },
    {
        alt: 'Lab session and technical activities',
        caption: 'Lab Session',
        src: '/gallery/3.jpg',
    },
    {
        alt: 'Workshop and hands-on session',
        caption: 'Workshop',
        src: '/gallery/4.jpg',
    },
    {
        alt: 'Campus gathering and cultural activities',
        caption: 'Campus Life',
        src: '/gallery/5.jpg',
    },
    {
        alt: 'Department seminar and presentations',
        caption: 'Seminar',
        src: '/gallery/6.jpg',
    },
    {
        alt: 'Annual fest and student activities',
        caption: 'Annual Fest',
        src: '/gallery1.png',
    },
    {
        alt: 'Technical symposium and project expo',
        caption: 'Tech Symposium',
        src: '/gallery2.png',
    },
    {
        alt: 'Graduation ceremony',
        caption: 'Graduation Day',
        src: '/gallery3.png',
    },
];

const Gallery = () => {
    const [columnCount, setColumnCount] = React.useState(4);
    const [columnWidth, setColumnWidth] = React.useState(320);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setColumnCount(1);
                setColumnWidth(280);
            } else if (window.innerWidth < 768) {
                setColumnCount(2);
                setColumnWidth(280);
            } else if (window.innerWidth < 1024) {
                setColumnCount(3);
                setColumnWidth(240);
            } else {
                setColumnCount(4);
                setColumnWidth(280);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ColoredSection color="WHITE" id="gallery">
            <div className="bg-[#f5f5f5] py-12 sm:py-20 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 h-auto">
                <h1 className="text-black text-3xl md:text-4xl lg:text-[56px] font-semibold font-bebasneue mb-2">
                    .GALLERY
                </h1>
                <p className="text-gray-500 text-base mb-8">
                    A glimpse into life at the CSE Department, GEC Palakkad.
                </p>
                <div className="py-4 flex justify-center">
                    <ImageGallery
                        imagesInfoArray={imagesArray}
                        columnCount={columnCount}
                        columnWidth={columnWidth}
                        gapSize={10}
                        className="mx-auto"
                    />
                </div>
            </div>
        </ColoredSection>
    );
};

export default Gallery;
