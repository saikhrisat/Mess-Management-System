
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { LogOut, User, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UserNav() {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [initials, setInitials] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  const updateUserDataFromStorage = () => {
    const storedName = localStorage.getItem('studentName');
    const storedEmail = localStorage.getItem('studentEmail');
    const storedAvatar = localStorage.getItem('studentAvatar');

    if (storedName && storedEmail) {
      setName(storedName);
      setEditedName(storedName);
      setEmail(storedEmail);
      setAvatar(storedAvatar);
      setInitials(
        storedName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      );
    }
  };

  useEffect(() => {
    updateUserDataFromStorage();

    const handleStorageChange = (event: StorageEvent) => {
      updateUserDataFromStorage();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('studentAvatar');
    window.dispatchEvent(new Event('storage'));
    setOpen(false);
    router.push('/');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const handleSave = () => {
    if (editedName.trim() === '') {
        toast({
            title: 'Error',
            description: 'Name cannot be empty.',
            variant: 'destructive'
        });
        return;
    }
    localStorage.setItem('studentName', editedName);
    window.dispatchEvent(new Event('storage'));
    setIsEditing(false);
    toast({
        title: 'Success',
        description: 'Your name has been updated.',
    });
  }

  const handleCancel = () => {
    setEditedName(name);
    setIsEditing(false);
  }

  const handleSelectProfile = () => {
    router.push('/student/profile');
    setOpen(false);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar || `https://placehold.co/40x40.png?text=${initials}`} alt={name} data-ai-hint="person portrait"/>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-card/80 backdrop-blur-sm relative" align="end" forceMount>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 z-10"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2 p-2 items-center">
            <Avatar className="h-20 w-20 mb-2">
                <AvatarImage src={avatar || `https://placehold.co/80x80.png?text=${initials}`} alt={name} data-ai-hint="person portrait"/>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {isEditing ? (
              <div className="flex items-center gap-2 w-full">
                <Input 
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="h-8"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave}><Save className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCancel}><X className="h-4 w-4"/></Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium leading-none">{name || 'Student'}</p>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4"/>
                </Button>
              </div>
            )}
            <p className="text-sm leading-none text-muted-foreground">
              {email || 'student@example.com'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSelectProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
