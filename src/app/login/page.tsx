
'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentLoginForm } from './student-login-form';
import { ManagerLoginForm } from './manager-login-form';
import { OwnerLoginForm } from './owner-login-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Login</CardTitle>
            <CardDescription>Select your role to sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="manager">Manager</TabsTrigger>
                <TabsTrigger value="owner">Owner</TabsTrigger>
              </TabsList>
              <TabsContent value="student" className="mt-4">
                <StudentLoginForm />
              </TabsContent>
              <TabsContent value="manager" className="mt-4">
                <ManagerLoginForm />
              </TabsContent>
              <TabsContent value="owner" className="mt-4">
                <OwnerLoginForm />
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline hover:text-primary">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
