
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Utensils className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-foreground">MessMate</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link href="#about" className="relative group transition-colors hover:text-primary">
            <span>About</span>
            <span className="absolute bottom-[-2px] left-0 h-0.5 bg-primary w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </Link>
          <Link href="#reviews" className="relative group transition-colors hover:text-primary">
            <span>Reviews</span>
            <span className="absolute bottom-[-2px] left-0 h-0.5 bg-primary w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </Link>
          <Link href="#contact" className="relative group transition-colors hover:text-primary">
            <span>Contact</span>
            <span className="absolute bottom-[-2px] left-0 h-0.5 bg-primary w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="text-lg hover:bg-primary/10 transition-colors duration-300">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="font-bold text-lg rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
