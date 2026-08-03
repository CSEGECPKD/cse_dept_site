import React from 'react';
import Cardpeople from '@/components/Cardpeople';
import ColoredSection from '@/components/ColoredSection';

function page() {
    return (
        <ColoredSection color="BLACK">
            <div>
                <div className="bg-[#e9e8e9]">
                    <div className="container mx-auto w-full h-[250px] md:h-[350px] flex justify-start items-end pb-8 px-4 md:px-8">
                        <span className="w-3 h-3 bg-black mb-5 mr-3"></span>
                        <h1 className="uppercase text-[32px] md:text-[48px] font-bold">
                            People
                        </h1>
                    </div>
                </div>
                <div className="bg-white container mx-auto">
                    <Cardpeople />
                </div>
            </div>
        </ColoredSection>
    );
}
export default page;
