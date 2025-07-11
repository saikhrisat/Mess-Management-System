
'use client';

import { Utensils } from 'lucide-react';
import { DevDbViewer } from '@/components/dev-db-viewer';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background/30 backdrop-blur-sm mt-auto border-t border-white/10">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
                <Link href="/" className="flex items-center gap-2 mb-4">
                    <Utensils className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold font-headline text-foreground">MessMate</span>
                </Link>
                <p className="text-foreground/70 max-w-xs">The ultimate solution for mess management.</p>
                 <div className="mt-4">
                    <DevDbViewer />
                </div>
            </div>
            <div>
                <h4 className="font-headline font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li><Link href="#about" className="text-foreground/70 hover:text-primary transition-colors">About</Link></li>
                    <li><Link href="#reviews" className="text-foreground/70 hover:text-primary transition-colors">Reviews</Link></li>
                    <li><Link href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
                </ul>
            </div>
            <div>
                 <h4 className="font-headline font-semibold text-lg mb-4">Legal</h4>
                <ul className="space-y-2">
                    <li><Link href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
                    <li><Link href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
                </ul>
            </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-foreground/60">
            <p>&copy; {new Date().getFullYear()} MessMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
