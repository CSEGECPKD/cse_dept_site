'use client';
import React from 'react';
import ColoredSection from './ColoredSection';
import { ImageGallery } from 'react-image-grid-gallery';

const imagesArray = [
    {
        alt: "Image1's alt text",
        caption: "Image1's description",
        src: '/1.jpg',
    },
    {
        alt: "Image2's alt text",
        caption: "Image2's description",
        src: '/2.jpg',
    },
    {
        alt: "Image3's alt text",
        caption: "Image3's description",
        src: '/3.jpg',
    },
    {
        alt: "Image1's alt text",
        caption: "Image1's description",
        src: '/4.jpg',
    },
    {
        alt: "Image2's alt text",
        caption: "Image2's description",
        src: '/5.jpg',
    },
    {
        alt: "Image3's alt text",
        caption: "Image3's description",
        src: '/gallery3.jpg',
    },
    {
        alt: "Image1's alt text",
        caption: "Image1's description",
        src: '/gallery2.png',
    },
    {
        alt: "Image2's alt text",
        caption: "Image2's description",
        src: '/gallery3.png',
    },
    {
        alt: "Image3's alt text",
        caption: "Image3's description",
        src: '/gallery1.png',
    },
    {
        alt: "Image1's alt text",
        caption: "Image1's description",
        src: '/gallery2.png',
    },
    {
        alt: "Image2's alt text",
        caption: "Image2's description",
        src: '/gallery3.png',
    },
    {
        alt: "Image3's alt text",
        caption: "Image3's description",
        src: '/gallery1.png',
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
            <div className="bg-black py-12 sm:py-20 md:py-32 lg:py-56 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-96 h-auto">
                <h1 className="text-white text-3xl md:text-4xl lg:text-[56px] font-semibold font-bebasneue">
                    .GALLERY
                </h1>
                <div className="py-8 sm:py-12 md:py-16 lg:py-20 flex justify-center">
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
