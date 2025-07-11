
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import {
  Bell,
  Cookie,
  IndianRupee,
  CalendarDays,
  Utensils,
  PieChart as PieChartIcon,
  BookUser,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// --- Data & Calculation Constants ---
const utilitiesData = [
  { name: 'Groceries & Food', value: 45000, color: 'hsl(var(--chart-1))' },
  { name: 'Cooking Gas (LPG)', value: 6000, color: 'hsl(var(--chart-2))' },
  { name: 'Maid & Cook Salary', value: 18000, color: 'hsl(var(--chart-3))' },
  { name: 'Drinking Water', value: 3000, color: 'hsl(var(--chart-4))' },
  { name: 'Wi-Fi Charges', value: 1500, color: 'hsl(var(--chart-5))' },
];
const infrastructureData = [
  { name: 'Mess Rent', value: 25000, color: 'hsl(340, 80%, 60%)' },
  { name: 'Electricity Bill', value: 8000, color: 'hsl(200, 80%, 60%)' },
  { name: 'Cleaning Supplies', value: 2000, color: 'hsl(100, 80%, 60%)' },
];
const allExpenses = [...utilitiesData, ...infrastructureData];

const TOTAL_STUDENTS = 35;
const MEALS_PER_DAY = 3;

const chartConfig = {} satisfies ChartConfig;
allExpenses.forEach(item => {
    chartConfig[item.name] = { label: item.name, color: item.color };
});


// --- Loading Skeleton ---
const DashboardSkeleton = () => (
    <div className="space-y-8 animate-pulse">
        <div className="flex items-center justify-between space-y-2">
            <Skeleton className="h-10 w-1/2 rounded-lg" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            <Skeleton className="lg:col-span-2 h-96 rounded-lg" />
            <Skeleton className="lg:col-span-1 h-96 rounded-lg" />
        </div>
    </div>
);

// --- Reusable StatCard Component ---
const StatCard = ({ icon: Icon, title, value, description }: { icon: React.ElementType, title: string, value: string, description: string }) => (
    <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold font-headline">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

// --- Main Dashboard Page Component ---
export default function StudentDashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [studentName, setStudentName] = useState('Student');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
    const updateStudentName = () => {
      const name = localStorage.getItem('studentName');
      if (name) {
          setStudentName(name);
      }
    };
    updateStudentName();

    window.addEventListener('storageChange', updateStudentName);
    
    return () => {
        window.removeEventListener('storageChange', updateStudentName);
    };
  }, []);

  const dashboardData = useMemo(() => {
    if (!isClient) return null;

    const totalMonthlyCost = allExpenses.reduce((acc, item) => acc + item.value, 0);
    const yourShare = totalMonthlyCost / TOTAL_STUDENTS;
    const costPerMeal = totalMonthlyCost / (TOTAL_STUDENTS * MEALS_PER_DAY * 30);

    const totalMealsTaken = Math.floor(Math.random() * 60) + 15;
    const consumptionPercentage = (totalMealsTaken / (MEALS_PER_DAY * 30)) * 100;

    return {
      yourShare,
      costPerMeal,
      totalMealsTaken,
      consumptionPercentage,
    };
  }, [isClient]);

  const announcements = [
    { title: "Mess fees due for July", description: "Please pay your mess fees by the 10th of July.", date: "July 1, 2024" },
    { title: "Special Dinner on Sunday", description: "Join us for a special dinner this Sunday to celebrate the festival.", date: "June 28, 2024" },
    { title: "New water cooler installed", description: "A new water cooler has been installed near the dining hall.", date: "June 25, 2024" },
  ];
  
  if (!isClient || !dashboardData) {
      return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Welcome, {studentName}!</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          icon={IndianRupee} 
          title="Pending Dues" 
          value={`₹${dashboardData.yourShare.toFixed(2)}`}
          description="This month's total share" 
        />
        <StatCard 
          icon={Cookie} 
          title="Today's Special" 
          value="Special Thali" 
          description="Available for lunch" 
        />
        <StatCard
          icon={Utensils}
          title="Average Cost Per Meal"
          value={`₹${dashboardData.costPerMeal.toFixed(2)}`}
          description="Based on monthly expenses"
        />
        <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-center">
            <CardContent className="pt-6">
                <Button className="w-full font-bold">
                    <CalendarDays className="mr-2 h-4 w-4" /> Apply for Leave
                </Button>
            </CardContent>
        </Card>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 h-full">
              <CardHeader>
                  <CardTitle className="text-2xl font-headline">This Month's Analytics</CardTitle>
                  <CardDescription>An overview of your meal consumption and mess expenses.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                      <h3 className="text-lg font-semibold font-headline flex items-center gap-2 mb-2">
                          <BookUser className="h-5 w-5 text-primary" />
                          Meal Consumption
                      </h3>
                      <div className="text-center">
                          <span className="text-5xl font-bold font-headline text-primary">{dashboardData.totalMealsTaken}</span>
                          <span className="text-lg text-muted-foreground"> / 90 meals</span>
                      </div>
                      <Progress value={dashboardData.consumptionPercentage} className="h-3 mt-2" />
                      <p className="text-center text-xs text-muted-foreground mt-2">You have consumed {dashboardData.consumptionPercentage.toFixed(0)}% of your meals this month.</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                      <h3 className="text-lg font-semibold font-headline flex items-center gap-2 mb-2">
                          <PieChartIcon className="h-5 w-5 text-primary" />
                          Expense Distribution
                      </h3>
                      <div className="h-[20rem] w-full">
                          <ChartContainer config={chartConfig} className="w-full h-full">
                              <ResponsiveContainer>
                                  <PieChart>
                                      <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                                      <Pie 
                                          data={allExpenses} 
                                          dataKey="value" 
                                          nameKey="name" 
                                          cx="50%" 
                                          cy="50%" 
                                          innerRadius={60} 
                                          strokeWidth={2}
                                          onMouseEnter={(_, index) => setActiveIndex(index)}
                                          onMouseLeave={() => setActiveIndex(null)}
                                      >
                                          {allExpenses.map((entry, index) => (
                                              <Cell 
                                                key={`cell-${entry.name}`} 
                                                fill={entry.color} 
                                                className={`recharts-sector ${activeIndex === index ? 'pie-sector-active' : ''}`}
                                              />
                                          ))}
                                      </Pie>
                                  </PieChart>
                              </ResponsiveContainer>
                          </ChartContainer>
                      </div>
                  </div>
              </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/3">
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Announcements</CardTitle>
              <CardDescription>Important updates from the mess management.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {announcements.map((ann, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Bell className="h-5 w-5" />
                      </div>
                    </div>
                    <div className={`flex-1 ${index < announcements.length - 1 ? 'border-b border-border pb-6' : ''}`}>
                      <p className="font-bold text-base">{ann.title}</p>
                      <p className="text-sm text-muted-foreground">{ann.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{ann.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
