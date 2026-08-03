'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Award,
    CalendarDays,
    Images,
    Building2,
    Megaphone,
    Library,
    FileText,
    Trophy,
    Newspaper,
    UsersRound,
    ShieldCheck,
    Save,
    Send,
    LogOut,
    PanelLeftClose,
    PanelLeft,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export const SIDEBAR_LINKS = [
    {
        group: 'Content',
        items: [
            {
                label: 'Employees',
                href: '/admin/faculty/edit',
                icon: Users,
                id: 'faculty',
            },
            {
                label: 'Students',
                href: '/admin/student/edit',
                icon: GraduationCap,
                id: 'student',
            },
            {
                label: 'Courses',
                href: '/admin/course/edit',
                icon: BookOpen,
                id: 'course',
            },
            {
                label: 'Certificates',
                href: '/admin/certificate/edit',
                icon: Award,
                id: 'certificate',
            },
            {
                label: 'Events',
                href: '/admin/event/edit',
                icon: CalendarDays,
                id: 'event',
            },
            {
                label: 'Gallery',
                href: '/admin/gallery/edit',
                icon: Images,
                id: 'gallery',
            },
            {
                label: 'Recruiter',
                href: '/admin/recruiter/edit',
                icon: Building2,
                id: 'recruiter',
            },
            {
                label: 'Poster',
                href: '/admin/poster/edit',
                icon: Megaphone,
                id: 'poster',
            },
            {
                label: 'Subjects',
                href: '/admin/subject/edit',
                icon: Library,
                id: 'subject',
            },
            {
                label: 'Syllabus',
                href: '/admin/syllabus/edit',
                icon: FileText,
                id: 'syllabus',
            },
            {
                label: 'Toppers',
                href: '/admin/toppers/edit',
                icon: Trophy,
                id: 'toppers',
            },
            {
                label: 'Blogs',
                href: '/admin/blog/edit',
                icon: Newspaper,
                id: 'blog',
            },
            {
                label: 'Association Members',
                href: '/admin/associationmembers/edit',
                icon: UsersRound,
                id: 'associationmembers',
            },
            {
                label: 'Advisor Board',
                href: '/admin/advisorbound/edit',
                icon: ShieldCheck,
                id: 'advisorbound',
            },
        ],
    },
    {
        group: 'Workflow',
        items: [
            {
                label: 'Saved',
                href: '/admin/saved',
                icon: Save,
                match: (pathname) => pathname === '/admin/saved',
            },
            {
                label: 'Request Status',
                href: '/admin/request-status',
                icon: Send,
                match: (pathname) => pathname === '/admin/request-status',
            },
        ],
    },
];

export function getPageTitle(pathname) {
    if (pathname === '/admin' || pathname === '/admin/faculty/edit') {
        return 'Employees';
    }
    if (pathname === '/admin/saved') return 'Saved Requests';
    if (pathname === '/admin/request-status') return 'Request Status';
    if (pathname.includes('/faculty/update/')) return 'Edit Employee';
    if (pathname === '/admin/facility/edit') return 'Facilities';
    if (pathname === '/admin/student/edit') return 'Students';
    if (pathname === '/admin/studentgroup/edit') return 'Student Groups';
    if (pathname === '/admin/accredition/edit') return 'Accredition';

    const segment = pathname.split('/')[2];
    const map = {
        course: 'Courses',
        certificate: 'Certificates',
        event: 'Events',
        gallery: 'Gallery',
        recruiter: 'Recruiters',
        poster: 'Posters',
        subject: 'Subjects',
        syllabus: 'Syllabus',
        toppers: 'Toppers',
        blog: 'Blogs',
        associationmembers: 'Association Members',
        advisorbound: 'Advisor Board',
    };
    return map[segment] || 'Dashboard';
}

export function isActiveLink(item, pathname) {
    if (item.match) return item.match(pathname);
    return pathname.includes(item.id);
}

export function SidebarContent({ email, collapsed = false, onNavigate }) {
    const pathname = usePathname();
    return (
        <div className="flex h-full flex-col">
            <div
                className={cn(
                    'flex items-center gap-2 px-4 py-5',
                    collapsed ? 'justify-center px-2' : ''
                )}
            >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <BookOpen className="h-4 w-4" />
                </div>
                {!collapsed && (
                    <div className="leading-tight">
                        <p className="text-sm font-semibold">CSE Admin</p>
                        <p className="text-xs text-muted-foreground">
                            Department Console
                        </p>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-2">
                {SIDEBAR_LINKS.map((section, idx) => {
                    if (section.group) {
                        return (
                            <div key={section.group} className="mb-4">
                                {!collapsed && (
                                    <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        {section.group}
                                    </p>
                                )}
                                <ul className="space-y-0.5">
                                    {section.items.map((item) => {
                                        const active = isActiveLink(
                                            item,
                                            pathname
                                        );
                                        const Icon = item.icon;
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    onClick={onNavigate}
                                                    aria-label={item.label}
                                                    className={cn(
                                                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                                                        collapsed &&
                                                            'px-0 justify-center',
                                                        active
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                                    )}
                                                >
                                                    <Icon className="h-4 w-4 shrink-0" />
                                                    {!collapsed && item.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    }
                    return (
                        <div key={section.label} className="mb-4">
                            <ul className="space-y-0.5">
                                {[section].map((item) => {
                                    const active = isActiveLink(item, pathname);
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={onNavigate}
                                                aria-label={item.label}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                                                    collapsed &&
                                                        'px-0 justify-center',
                                                    active
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                                )}
                                            >
                                                <Icon className="h-4 w-4 shrink-0" />
                                                {!collapsed && item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>

            <div className="border-t p-3">
                <div className="mb-2 flex items-center gap-3 rounded-md px-2 py-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {(email || 'A').charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="min-w-0 leading-tight">
                            <p className="truncate text-sm font-medium">
                                {email || 'Admin'}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                Administrator
                            </p>
                        </div>
                    )}
                </div>
                <Link
                    href="/api/logout"
                    aria-label="Logout"
                    className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive',
                        collapsed && 'justify-center px-0'
                    )}
                >
                    <LogOut className="h-4 w-4 shrink-0" />
                    {!collapsed && 'Logout'}
                </Link>
            </div>
        </div>
    );
}

export default function Sidebar({ email, collapsed, onToggleCollapse }) {
    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-40 hidden flex-col border-r bg-background transition-all duration-200 lg:flex',
                collapsed ? 'w-16' : 'w-64'
            )}
        >
            <SidebarContent email={email} collapsed={collapsed} />
            <button
                type="button"
                onClick={onToggleCollapse}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className={cn(
                    'absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground'
                )}
            >
                {collapsed ? (
                    <PanelLeft className="h-3.5 w-3.5" />
                ) : (
                    <PanelLeftClose className="h-3.5 w-3.5" />
                )}
            </button>
        </aside>
    );
}
