import { redirect } from 'next/navigation';
import React from 'react';

const AdminPage = async () => {
    return redirect('/admin/faculty/edit');
};

export default AdminPage;
