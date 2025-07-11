
'use client';

import type { Metadata } from "next";
import { usePathname } from 'next/navigation';
import {
  Home,
  Utensils,
  Users,
  MessageSquare,
  BarChart,
  LogOut,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Manager Dashboard",
  description: "Your MessMate management dashboard.",
};

export default function ManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems = [
    { label: "Dashboard", href: "/manager/dashboard", icon: Home },
    { label: "Manage Menu", href: "/manager/menu", icon: Utensils },
    { label: "Manage Students", href: "/manager/students", icon: Users },
    { label: "Feedback", href: "/manager/feedback", icon: MessageSquare },
    { label: "Reports", href: "/manager/reports", icon: BarChart },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/manager/dashboard" className="flex items-center gap-2 font-semibold">
              <Utensils className="h-6 w-6 text-primary" />
              <span className="">MessMate</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-primary/10 text-primary font-semibold"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
             <Button size="sm" className="w-full" asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Link>
             </Button>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/manager/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Utensils className="h-6 w-6 text-primary" />
                  <span className="sr-only">MessMate</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                      pathname === item.href && "bg-primary/10 text-primary"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
               <div className="mt-auto">
                 <Button size="sm" className="w-full" asChild>
                    <Link href="/">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Link>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add a search bar here later */}
          </div>
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="person portrait" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
