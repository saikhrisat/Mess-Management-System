
'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Users,
  IndianRupee,
  Plus,
  ClipboardList,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { ChartTooltipContent, ChartContainer, ChartConfig } from '@/components/ui/chart';


export default function ManagerDashboardPage() {
    const [chartData, setChartData] = React.useState([]);

    React.useEffect(() => {
        const data = [
            { name: 'Mon', total: Math.floor(Math.random() * 100) + 50 },
            { name: 'Tue', total: Math.floor(Math.random() * 100) + 50 },
            { name: 'Wed', total: Math.floor(Math.random() * 100) + 50 },
            { name: 'Thu', total: Math.floor(Math.random() * 100) + 50 },
            { name: 'Fri', total: Math.floor(Math.random() * 100) + 50 },
            { name: 'Sat', total: Math.floor(Math.random() * 100) + 50 },
            { name: 'Sun', total: Math.floor(Math.random() * 100) + 50 },
        ];
        // @ts-ignore
        setChartData(data);
    }, []);
    
    const recentStudents = [
        { name: 'Priya Sharma', email: 'priya@example.com', date: '2024-07-01' },
        { name: 'Rajesh Kumar', email: 'rajesh@example.com', date: '2024-07-01' },
        { name: 'Anjali Desai', email: 'anjali@example.com', date: '2024-06-30' },
        { name: 'Amit Singh', email: 'amit@example.com', date: '2024-06-29' },
        { name: 'Sneha Patil', email: 'sneha@example.com', date: '2024-06-28' },
    ];
    
    const chartConfig = {
      total: {
        label: 'Attendance',
        color: 'hsl(var(--primary))',
      },
    } satisfies ChartConfig;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Manager Dashboard</h1>
         <Button size="lg" className="font-bold">
            <Plus className="mr-2 h-5 w-5" /> Post Announcement
        </Button>
      </div>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+5 since last month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
                <UserCheck className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98</div>
                <p className="text-xs text-muted-foreground">Lunch count</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Students with dues</p>
              </CardContent>
            </Card>
             <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <IndianRupee className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">₹4,850</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-card/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Daily Attendance Trend</CardTitle>
            <CardDescription>Attendance for the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip cursor={{fill: 'hsla(var(--muted), 0.5)'}} content={<ChartTooltipContent />} />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
         <Card className="lg:col-span-3 bg-card/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Recent Registrations</CardTitle>
            <CardDescription>
              New students who joined this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student, index) => (
                    <TableRow key={index} className="hover:bg-primary/5">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                              <AvatarImage src={`https://placehold.co/40x40.png?text=${student.name.charAt(0)}`} alt="Avatar" data-ai-hint="person portrait" />
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-0.5">
                              <p className="text-sm font-medium leading-none">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">{student.date}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
