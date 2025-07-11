
'use client';
import { Line, LineChart, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';
import {
  IndianRupee,
  Plus,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChartTooltipContent, ChartContainer, ChartConfig } from '@/components/ui/chart';

export default function OwnerDashboardPage() {
   const financialData = [
      { month: 'Jan', revenue: 4000, expense: 2400 },
      { month: 'Feb', revenue: 3000, expense: 1398 },
      { month: 'Mar', revenue: 5000, expense: 4800 },
      { month: 'Apr', revenue: 4780, expense: 3908 },
      { month: 'May', revenue: 6890, expense: 4800 },
      { month: 'Jun', revenue: 5390, expense: 3800 },
   ];
   
   const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
      expense: {
        label: "Expense",
        color: "hsl(var(--destructive))",
      },
    } satisfies ChartConfig

   const managers = [
      { name: "Rajesh Kumar", mess: "Sunrise Mess", email: "rajesh@example.com", status: "Active" },
      { name: "Suresh Gupta", mess: "Moonlight Diner", email: "suresh@example.com", status: "Active" },
      { name: "Priya Singh", mess: "City Kitchen", email: "priya.s@example.com", status: "Inactive" },
      { name: "Vikram Rathod", mess: "Star Mess", email: "vikram@example.com", status: "Active" },
   ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Owner's Dashboard</h1>
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="lg">Download Report</Button>
            <Button size="lg" className="font-bold"><Plus className="mr-2 h-5 w-5" /> Add New Mess</Button>
        </div>
      </div>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-headline">₹45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-headline">₹21,110.45</div>
                    <p className="text-xs text-muted-foreground">+18.1% from last month</p>
                </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                    <IndianRupee className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600 font-headline">₹24,121.44</div>
                    <p className="text-xs text-muted-foreground">+22.1% from last month</p>
                </CardContent>
            </Card>
      </div>

       <div className="grid grid-cols-1 gap-8 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-card/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Financial Overview</CardTitle>
            <CardDescription>
              Monthly Revenue vs. Expenses for the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <LineChart accessibilityLayer data={financialData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip cursor={{fill: 'hsla(var(--muted), 0.5)'}} content={<ChartTooltipContent indicator="line" />} />
                <Legend content={({ payload }) => (
                  <div className="flex justify-center gap-6 pt-4">
                    {payload?.map((entry) => (
                      <div key={entry.value} className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-sm text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )} />
                <Line dataKey="revenue" type="monotone" stroke="hsl(var(--chart-1))" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--card))" }} />
                <Line dataKey="expense" type="monotone" stroke="hsl(var(--destructive))" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--destructive))", strokeWidth: 2, stroke: "hsl(var(--card))" }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
         <Card className="lg:col-span-3 bg-card/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline">Mess Managers</CardTitle>
              <CardDescription>
                Manage your mess managers.
              </CardDescription>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="#">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Manager</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {managers.map(manager => (
                         <TableRow key={manager.email} className="hover:bg-primary/5">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={`https://placehold.co/40x40.png?text=${manager.name.charAt(0)}`} alt="Avatar" data-ai-hint="person portrait"/>
                                    <AvatarFallback>{manager.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <p className="text-sm font-medium leading-none">{manager.name}</p>
                                    <p className="text-xs text-muted-foreground">{manager.mess}</p>
                                </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Badge variant={manager.status === 'Active' ? 'default' : 'destructive'} className="capitalize">{manager.status}</Badge>
                            </TableCell>
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
