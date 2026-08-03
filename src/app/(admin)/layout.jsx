import AdminNavbar from '@/components/admin/AdminNavbar';
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

    return (
        <div className="min-h-screen flex flex-col">
            <div>
                <AdminNavbar email={auth?.user?.email} />
            </div>
            <div>{children}</div>
        </div>
    );
};

export default AdminLayout;
