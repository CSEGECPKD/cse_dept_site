import React from 'react';

import SavedList from '@/components/admin/saved/SavedList';
import PageHeader from '@/components/admin/ui/PageHeader';
import SectionCard from '@/components/admin/ui/SectionCard';
import SubmitAllButton from './SubmitAllButton';

const SavedPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Saved Requests"
                description="Requests saved as drafts."
                actions={<SubmitAllButton />}
            />
            <SectionCard title="Drafts" description="Saved but not submitted.">
                <SavedList />
            </SectionCard>
        </div>
    );
};

export default SavedPage;
