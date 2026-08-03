import ListItem from '@/components/admin/ListItem';
import SavedList from '@/components/admin/saved/SavedList';
import React from 'react';
import SubmitAllButton from './SubmitAllButton';

const SavedPage = () => {
    return (
        <div className="py-20 px-20 space-y-2.5">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-medium">SAVED REQUESTS</h1>
                <SubmitAllButton />
            </div>
            <SavedList />
        </div>
    );
};

export default SavedPage;
