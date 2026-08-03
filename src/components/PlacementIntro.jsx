'use client';

import React from 'react';
import ColoredSection from './ColoredSection';

const HodMessage = () => {
    return (
        <ColoredSection color="BLACK">
            <div className="bg-white container mx-auto py-32 md:py-32 px-4 h-full md:min-h-[70vh]">
                <div className="w-full h-auto mb-8 md:mb-12">
                    <h1 className="text-black w-auto h-auto text-3xl md:text-4xl lg:text-5xl font-semibold font-bebasneue">
                        . TRAINING & PLACEMENT
                    </h1>
                </div>
                <div className="grid md:grid-cols-[330px_auto] grid-cols-1 gap-8 md:gap-[70px] w-full h-auto">
                    <div className="w-full flex justify-center md:justify-start">
                        <div className="w-full max-w-[250px] md:max-w-none">
                            <img
                                src="./placement-cell-logo.svg"
                                alt="placement cell logo"
                                className="w-full h-auto object-contain transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>
                    {/* message of hod */}
                    <div className="flex-auto w-full">
                        <p className="text-gray-500 text-[16px] sm:text-[17px] lg:text-[20px] xl:text-[24px] leading-[28px] md:leading-[30px] lg:leading-[185%] transition duration-300 ease-in-out">
                            Lorem ipsum dolor sit amet consectetur. Turpis
                            consequat nec et suscipit in urna rhoncus. Ut amet
                            ut arcu in ornare urna blandit. Sollicitudin sit est
                            a odio. Eros vulputate etiam euismod risus augue
                            feugiat in quis. Est molestie tristique feugiat
                            faucibus tortor.Tortor nibh nunc congue consequat.
                            Eleifend mauris magna egestas ultrices porta
                            adipiscing turpis nunc praesent. Tortor phasellus
                            diam arcu a massa. Cras lacus nec tellus nulla
                            consectetur rhoncus tristique pellentesque montes.
                            Dictumst sit vel faucibus egestas. Vehicula
                            consectetur nisl in nulla venenatis.
                        </p>
                    </div>
                </div>
            </div>
        </ColoredSection>
    );
};

export default HodMessage;
