
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Home,
  Utensils,
  IndianRupee,
  Receipt,
  MessageSquare,
  User,
  LogOut,
  CalendarCheck,
  UserCheck,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Link from 'next/link';
import { UserNav } from '@/components/user-nav';

const navItems = [
  { label: 'Dashboard', href: '/student/dashboard', icon: Home },
  {
    label: 'Meals & Menu',
    icon: Utensils,
    basePath: '/student/meals',
    subItems: [
      {
        label: 'Menu & Cancellation',
        href: '/student/meals/booking',
        icon: CalendarCheck,
      },
      {
        label: 'Attendance',
        href: '/student/meals/attendance',
        icon: UserCheck,
      },
    ],
  },
  {
    label: 'Payments & Billing',
    href: '/student/payments',
    icon: IndianRupee,
  },
  { label: 'Mess Expenses', href: '/student/expenses', icon: Receipt },
  { label: 'Profile', href: '/student/profile', icon: User },
  { label: 'Feedback & Support', href: '/student/feedback', icon: MessageSquare },
];

const StudentLayoutSkeleton = () => {
    return (
      <div className="flex min-h-screen w-full bg-background/60">
        <aside className="hidden w-[280px] border-r bg-muted/40 md:flex flex-col gap-2 p-4">
            <div className="h-14 mb-4">
                <Skeleton className="h-8 w-32" />
            </div>
            <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-full" />
                ))}
            </div>
            <div className="mt-auto">
                <Skeleton className="h-9 w-full" />
            </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg lg:h-[60px] lg:px-6">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="flex-1" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-transparent">
             <div className="space-y-8 animate-pulse">
                <div className="h-8 w-1/2 rounded-lg bg-muted"></div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="h-28 rounded-lg bg-muted"></div>
                    <div className="h-28 rounded-lg bg-muted"></div>
                    <div className="h-28 rounded-lg bg-muted"></div>
                    <div className="h-28 rounded-lg bg-muted"></div>
                </div>
                 <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-7">
                    <div className="lg:col-span-4 h-96 rounded-lg bg-muted"></div>
                    <div className="lg:col-span-3 h-96 rounded-lg bg-muted"></div>
                </div>
            </div>
          </main>
        </div>
      </div>
    );
};


function StudentLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile, state } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <div className="flex min-h-screen w-full bg-background/60">
      <TooltipProvider>
      <Sidebar collapsible="icon" className="hidden md:flex">
        <SidebarHeader className="p-0 border-b">
            <Link href="/student/dashboard" className={cn('flex h-14 items-center gap-2 justify-start px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 lg:h-[60px] lg:px-6')}>
                <Utensils className="size-6 text-primary" />
                <span className="font-semibold group-data-[collapsible=icon]:hidden">MessMate</span>
            </Link>
        </SidebarHeader>

        <SidebarContent className="flex-1 p-2 lg:p-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                {item.subItems ? (
                  <Collapsible
                    className="w-full"
                    defaultOpen={item.basePath && pathname.startsWith(item.basePath)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className="w-full justify-between"
                        isActive={false}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon />
                          <span className="truncate group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </div>
                        <ChevronDown className="size-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180 group-data-[collapsible=icon]:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.label}>
                            <SidebarMenuSubButton
                              isActive={pathname === subItem.href}
                              asChild
                            >
                              <Link href={subItem.href}>
                                <subItem.icon />
                                {subItem.label}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : state === 'collapsed' && !isMobile ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <SidebarMenuButton asChild isActive={pathname === item.href}>
                            <Link href={item.href!}>
                                <item.icon />
                                <span className="sr-only">{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">{item.label}</TooltipContent>
                  </Tooltip>
                ) : (
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                        <Link href={item.href!}>
                            <item.icon />
                            <span className="truncate group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="mt-auto p-4">
          <Button asChild className="w-full justify-start">
            <Link href="/">
              <LogOut className="mr-2" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
      </TooltipProvider>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg lg:h-[60px] lg:px-6">
          <SidebarTrigger />
          <div className="flex-1" />
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}


export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <StudentLayoutSkeleton />;
  }

  return (
    <SidebarProvider>
      <StudentLayoutContent>{children}</StudentLayoutContent>
    </SidebarProvider>
  );
}
