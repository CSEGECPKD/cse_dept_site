import React from 'react';

import RequestStatusList from '@/components/admin/request-status/RequestStatusList';
import PageHeader from '@/components/admin/ui/PageHeader';
import SectionCard from '@/components/admin/ui/SectionCard';

const RequestStatusPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Request Status"
                description="Track the status of submitted requests."
            />
            <SectionCard
                title="Requests"
                description="Latest status of each request."
            >
                <RequestStatusList />
            </SectionCard>
        </div>
    );
};

export default RequestStatusPage;
