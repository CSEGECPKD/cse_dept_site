'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Bell, LogOut, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getPageTitle } from './Sidebar';

export default function Header({ email, onOpenMobile }) {
    const pathname = usePathname();
    const title = getPageTitle(pathname);

    return (
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-3 px-4 md:px-6">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open navigation"
                    onClick={onOpenMobile}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="min-w-0">
                    <h1 className="truncate text-lg font-semibold md:text-xl">
                        {title}
                    </h1>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="gap-2 px-2"
                                aria-label="Account menu"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                        {(email || 'A').charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden max-w-[160px] truncate text-sm font-medium sm:inline">
                                    {email}
                                </span>
                                <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="font-normal">
                                <p className="text-sm font-semibold">Admin</p>
                                <p className="truncate text-xs font-normal text-muted-foreground">
                                    {email}
                                </p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/api/logout">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
