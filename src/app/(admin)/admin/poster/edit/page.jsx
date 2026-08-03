import { getPosters } from '@/actions/poster.action';
import PosterForm from '@/components/admin/poster/PosterForm';
import PosterList from '@/components/admin/poster/PosterList';
import React from 'react';

const EditAccreditionPage = async () => {
    const posters = await getPosters();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <PosterForm />
            </div>
            <div className="py-20 px-10">
                <PosterList posterList={posters} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
