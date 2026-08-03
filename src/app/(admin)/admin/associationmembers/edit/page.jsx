'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getAssociationMembers } from '@/actions/associationmembers.action';
import AssociationMemberForm from '@/components/admin/associationmembers/AssociationMemberForm';
import AssociationMemberList from '@/components/admin/associationmembers/AssociationMemberList';

const EditAccreditionPage = () => {
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
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <AssociationMemberForm
                    refreshAssociationMembers={fetchAssociationMembers}
                />
            </div>
            <div className="py-20 px-10">
                <AssociationMemberList
                    associationMemberList={associationMemberList}
                    loading={loading}
                    refresh={fetchAssociationMembers}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
