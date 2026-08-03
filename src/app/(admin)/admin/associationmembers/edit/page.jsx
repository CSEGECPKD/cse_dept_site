import { getAssociationMembers } from '@/actions/associationmembers.action';
import AccreditionList from '@/components/admin/accredition/AccreditionList';
import AssociationMemberForm from '@/components/admin/associationmembers/AssociationMemberForm';
import AssociationMemberList from '@/components/admin/associationmembers/AssociationMemberList';

import React from 'react';

const EditAccreditionPage = async () => {
    const associationMembers = await getAssociationMembers();
    return (
        <div className="grid grid-cols-2">
            <div className="py-20 px-20">
                <AssociationMemberForm />
            </div>
            <div className="py-20 px-10">
                <AssociationMemberList
                    associationMemberList={associationMembers}
                />
            </div>
        </div>
    );
};

export default EditAccreditionPage;
