import { getMagazines } from '@/actions/magazine.action';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import MagazineForm from '@/components/admin/magazine/MagazineForm';
import MagazineList from '@/components/admin/magazine/MagazineList';
import React from 'react';

const EditAccreditionPage = async () => {
    const magazines = await getMagazines();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <MagazineForm />
            </div>
            <div className="py-20 px-10">
                <MagazineList magazines={magazines} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
