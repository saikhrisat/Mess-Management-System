
'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Cake,
  GraduationCap,
  KeyRound,
  Bell,
  Upload,
  Edit2,
  Building,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfilePictureUploader } from '@/components/profile-picture-uploader';

const InfoField = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex flex-col space-y-1">
    <Label className="text-sm text-muted-foreground flex items-center">
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </Label>
    <p className="text-base text-foreground">{value}</p>
  </div>
);

const ProfileSkeleton = () => (
    <div className="space-y-8 animate-pulse">
        <div>
            <Skeleton className="h-9 w-1/3 mb-2" />
            <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
                <Card className="bg-card/80">
                    <CardHeader className="items-center text-center">
                        <Skeleton className="h-28 w-28 rounded-full" />
                        <Skeleton className="h-7 w-32 mt-2" />
                        <Skeleton className="h-5 w-40 mt-1" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-full" />
                        <Separator className="my-6" />
                        <Skeleton className="h-24 w-full" />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-8">
                <Card className="bg-card/80 h-64" />
                <Card className="bg-card/80 h-64" />
            </div>
        </div>
    </div>
)

export default function ProfilePage() {
  const [student, setStudent] = useState<{name: string | null, email: string | null, avatar: string | null}>({ name: null, email: null, avatar: null });
  const [isClient, setIsClient] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const updateStudentData = () => {
    const name = localStorage.getItem('studentName');
    const email = localStorage.getItem('studentEmail');
    const avatar = localStorage.getItem('studentAvatar');
    setStudent({ name, email, avatar });
  };

  useEffect(() => {
    setIsClient(true);
    updateStudentData();

    window.addEventListener('storage', updateStudentData);

    return () => {
        window.removeEventListener('storage', updateStudentData);
    };
  }, []);


  const profileCompletion = 85;

  if (!isClient || !student.name || !student.email) {
    return <ProfileSkeleton />;
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                <CardHeader className="items-center text-center">
                    <div className="relative group">
                        <Avatar className="h-28 w-28 border-4 border-primary/50 shadow-lg">
                            <AvatarImage src={student.avatar || `https://placehold.co/112x112.png?text=${getInitials(student.name)}`} alt={student.name} data-ai-hint="person portrait"/>
                            <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                         <Button size="icon" onClick={() => setIsUploaderOpen(true)} className="absolute bottom-1 right-1 rounded-full h-8 w-8 group-hover:bg-primary transition-colors">
                            <Upload className="h-4 w-4" />
                            <span className="sr-only">Upload new photo</span>
                        </Button>
                    </div>
                    <CardTitle className="text-2xl pt-2 font-headline">{student.name}</CardTitle>
                    <CardDescription>{student.email}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="space-y-2">
                        <Label htmlFor="profile-completion">Profile Completion</Label>
                        <Progress id="profile-completion" value={profileCompletion} className="w-full h-2" />
                        <p className="text-xs text-muted-foreground">{profileCompletion}% complete</p>
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-4 text-left">
                        <h4 className="font-semibold text-lg font-headline">Registration Details</h4>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center"><Building className="h-4 w-4 mr-2" /> Mess Name</span>
                            <span className="font-medium">Sunrise Mess</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center"><Calendar className="h-4 w-4 mr-2" /> Joining Date</span>
                            <span className="font-medium">July 15, 2023</span>
                        </div>
                         <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center"><CheckCircle className="h-4 w-4 mr-2" /> Plan Status</span>
                            <Badge>Active</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column - Details Cards */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-headline">Personal Information</CardTitle>
              <Button variant="outline" size="sm"><Edit2 className="mr-2 h-4 w-4" /> Edit</Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
              <InfoField icon={User} label="Full Name" value={student.name} />
              <InfoField icon={User} label="Student ID" value="STU-12345" />
              <InfoField icon={Cake} label="Date of Birth" value="August 22, 2002" />
              <InfoField icon={User} label="Gender" value="Female" />
              <InfoField icon={GraduationCap} label="Course" value="B.Tech in Computer Science" />
              <InfoField icon={Calendar} label="Year/Semester" value="3rd Year / 6th Semester" />
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-headline">Contact Information</CardTitle>
               <Button variant="outline" size="sm"><Edit2 className="mr-2 h-4 w-4" /> Edit</Button>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                    <InfoField icon={Phone} label="Phone Number" value="+91 98765 43210" />
                    <InfoField icon={Mail} label="Email Address" value={student.email} />
                </div>
                <div className="space-y-4">
                     <h4 className="font-semibold text-muted-foreground">Emergency Contact</h4>
                     <div className="p-4 bg-muted/50 rounded-lg grid sm:grid-cols-2 gap-x-6 gap-y-4">
                        <InfoField icon={User} label="Contact Name" value="Rajesh Sharma" />
                        <InfoField icon={Phone} label="Contact Phone" value="+91 98765 11223" />
                     </div>
                </div>
            </CardContent>
          </Card>

           <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Account & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <Button variant="secondary" className="w-full sm:w-auto"><KeyRound className="mr-2 h-4 w-4" /> Change Password</Button>
                <Separator />
                <div className="space-y-4">
                    <h4 className="font-semibold text-muted-foreground">Notification Settings</h4>
                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                        <Label htmlFor="email-notifications" className="flex items-center gap-2 text-base">
                            <Bell className="h-4 w-4"/> Email Notifications
                        </Label>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                        <Label htmlFor="sms-notifications" className="flex items-center gap-2 text-base">
                            <Bell className="h-4 w-4"/> SMS Notifications
                        </Label>
                        <Switch id="sms-notifications" />
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ProfilePictureUploader 
        isOpen={isUploaderOpen}
        onOpenChange={setIsUploaderOpen}
        onUploadComplete={() => {
            updateStudentData();
            setIsUploaderOpen(false);
        }}
      />
    </div>
  );
}
