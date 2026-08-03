import AdminShell from '@/components/admin/AdminShell';
import { isAuthenticated } from '@/lib/auth';
import { getAuth } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminLayout = async ({ children }) => {
    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
        return redirect('/api/login/google');
    }

    const auth = await getAuth();

    return <AdminShell email={auth?.user?.email}>{children}</AdminShell>;
};

export default AdminLayout;
