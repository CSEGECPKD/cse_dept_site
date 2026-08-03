import { redirect } from 'next/navigation';
import React from 'react';

const AdminPage = async () => {
    return redirect('/admin/student/edit');
};

export default AdminPage;
