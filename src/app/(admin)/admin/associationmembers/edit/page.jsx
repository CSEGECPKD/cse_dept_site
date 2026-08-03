'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getAssociationMembers } from '@/actions/associationmembers.action';
import AssociationMemberForm from '@/components/admin/associationmembers/AssociationMemberForm';
import AssociationMemberList from '@/components/admin/associationmembers/AssociationMemberList';
import AdminPageLayout from '@/components/admin/ui/AdminPageLayout';
import SectionCard from '@/components/admin/ui/SectionCard';

const EditAssociationMemberPage = () => {
    const [associationMemberList, setAssociationMemberList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAssociationMembers = useCallback(async () => {
        try {
            setLoading(true);
            const associationMembers = await getAssociationMembers();
            setAssociationMemberList(associationMembers);
        } catch (error) {
            console.error('Failed to fetch association members:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAssociationMembers();
    }, [fetchAssociationMembers]);

    return (
        <div className="space-y-6">
            <AdminPageLayout
                form={
                    <SectionCard
                        title="Add Member"
                        description="Create a new record."
                    >
                        <AssociationMemberForm
                            refreshAssociationMembers={fetchAssociationMembers}
                        />
                    </SectionCard>
                }
                list={
                    <SectionCard
                        title="Association Members"
                        description="Manage existing records."
                    >
                        <AssociationMemberList
                            associationMemberList={associationMemberList}
                            loading={loading}
                            refresh={fetchAssociationMembers}
                        />
                    </SectionCard>
                }
            />
        </div>
    );
};

export default EditAssociationMemberPage;
