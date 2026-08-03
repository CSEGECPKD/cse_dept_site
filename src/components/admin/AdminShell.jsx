'use client';

import { useEffect, useState } from 'react';

import Header from './Header';
import Sidebar, { SidebarContent } from './Sidebar';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from '@/components/ui/sheet';

const COLLAPSE_KEY = 'admin-sidebar-collapsed';

export default function AdminShell({ email, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(COLLAPSE_KEY);
        if (saved === 'true') setCollapsed(true);
    }, []);

    const toggleCollapse = () => {
        setCollapsed((prev) => {
            const next = !prev;
            localStorage.setItem(COLLAPSE_KEY, String(next));
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <Sidebar
                email={email}
                collapsed={collapsed}
                onToggleCollapse={toggleCollapse}
            />

            <div
                className={
                    collapsed
                        ? 'transition-all duration-200 lg:pl-16'
                        : 'transition-all duration-200 lg:pl-64'
                }
            >
                <Header
                    email={email}
                    onOpenMobile={() => setMobileOpen(true)}
                />
                <main className="mx-auto w-full max-w-[1500px] px-4 py-6 md:px-6 md:py-8">
                    {children}
                </main>
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="left" className="w-72 p-0">
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <SheetDescription className="sr-only">
                        Admin navigation menu
                    </SheetDescription>
                    <SidebarContent
                        email={email}
                        onNavigate={() => setMobileOpen(false)}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}
