import { getTopperList } from '@/actions/topper.action';
import TopperForm from '@/components/admin/toppers/TopperForm';
import TopperList from '@/components/admin/toppers/TopperList';
import React from 'react';

const EditAccreditionPage = async () => {
    const toppers = await getTopperList();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <TopperForm />
            </div>
            <div className="py-20 px-10">
                <TopperList topperList={toppers} />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
