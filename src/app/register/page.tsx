
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentRegisterForm } from './student-register-form';
import { ManagerRegisterForm } from './manager-register-form';
import { OwnerRegisterForm } from './owner-register-form';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { CopyableText } from '@/components/ui/copyable-text';

interface GeneratedCredentials {
  ownerId: string;
  messRegistrationNo: string;
}

export default function RegisterPage() {
  const [generatedCredentials, setGeneratedCredentials] = useState<GeneratedCredentials | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleOwnerSuccess = (credentials: GeneratedCredentials) => {
    setGeneratedCredentials(credentials);
    setIsAlertOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Register</CardTitle>
            <CardDescription>Choose your role to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="manager">Manager</TabsTrigger>
                <TabsTrigger value="owner">Owner</TabsTrigger>
              </TabsList>
              <TabsContent value="student" className="mt-4">
                <StudentRegisterForm />
              </TabsContent>
              <TabsContent value="manager" className="mt-4">
                <ManagerRegisterForm />
              </TabsContent>
              <TabsContent value="owner" className="mt-4">
                <OwnerRegisterForm onSuccess={handleOwnerSuccess} />
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline hover:text-primary">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />

      {generatedCredentials && (
         <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Owner Account Created!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your account has been created successfully. Please save these credentials. You will need them to register your mess managers and for them to log in.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 my-4">
                    <CopyableText label="Owner ID" text={generatedCredentials.ownerId} />
                    <CopyableText label="Mess Registration No." text={generatedCredentials.messRegistrationNo} />
                </div>
                <AlertDialogFooter>
                    <Button onClick={() => setIsAlertOpen(false)} asChild>
                      <Link href="/login">Done</Link>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
