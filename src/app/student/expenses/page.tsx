
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  IndianRupee,
  Download,
  Wifi,
  Droplets,
  Flame,
  ShoppingCart,
  ConciergeBell,
  Home,
  Bolt,
  Sparkles,
  Utensils,
  User,
  History,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// --- Types ---
interface ExpenseHistoryRecord {
    month: string;
    amount: number;
    status: 'Paid' | 'Unpaid';
}
interface ExpenseItem {
    name: string;
    icon: React.ElementType;
    currentMonthCost: number;
    description: string;
    color: string;
    history: ExpenseHistoryRecord[];
}

// --- Dummy Data ---
const utilitiesData: ExpenseItem[] = [
  { name: 'Groceries & Food', icon: ShoppingCart, currentMonthCost: 45000, description: 'Raw materials, vegetables, spices, etc.', color: 'hsl(var(--chart-1))', history: [
    { month: 'June 2024', amount: 43500, status: 'Paid' },
    { month: 'May 2024', amount: 44000, status: 'Paid' },
    { month: 'April 2024', amount: 42000, status: 'Paid' },
  ]},
  { name: 'Cooking Gas (LPG)', icon: Flame, currentMonthCost: 6000, description: 'Cylinder refills for the kitchen.', color: 'hsl(var(--chart-2))', history: [
    { month: 'June 2024', amount: 6200, status: 'Paid' },
    { month: 'May 2024', amount: 6100, status: 'Paid' },
    { month: 'April 2024', amount: 6300, status: 'Unpaid' },
  ]},
  { name: 'Maid & Cook Salary', icon: ConciergeBell, currentMonthCost: 18000, description: 'Monthly salaries for kitchen and cleaning staff.', color: 'hsl(var(--chart-3))', history: [
    { month: 'June 2024', amount: 18000, status: 'Paid' },
    { month: 'May 2024', amount: 18000, status: 'Paid' },
    { month: 'April 2024', amount: 17500, status: 'Paid' },
  ]},
  { name: 'Drinking Water', icon: Droplets, currentMonthCost: 3000, description: 'Purified water cans and RO maintenance.', color: 'hsl(var(--chart-4))', history: [
    { month: 'June 2024', amount: 2800, status: 'Paid' },
    { month: 'May 2024', amount: 2900, status: 'Paid' },
    { month: 'April 2024', amount: 2700, status: 'Paid' },
  ]},
  { name: 'Wi-Fi Charges', icon: Wifi, currentMonthCost: 1500, description: 'High-speed internet for students.', color: 'hsl(var(--chart-5))', history: [
    { month: 'June 2024', amount: 1500, status: 'Paid' },
    { month: 'May 2024', amount: 1500, status: 'Paid' },
    { month: 'April 2024', amount: 1500, status: 'Paid' },
  ]},
];

const infrastructureData: ExpenseItem[] = [
  { name: 'Mess Rent', icon: Home, currentMonthCost: 25000, description: 'Monthly rent for the mess premises.', color: 'hsl(340, 80%, 60%)', history: [
    { month: 'June 2024', amount: 25000, status: 'Paid' },
    { month: 'May 2024', amount: 25000, status: 'Paid' },
    { month: 'April 2024', amount: 25000, status: 'Paid' },
  ]},
  { name: 'Electricity Bill', icon: Bolt, currentMonthCost: 8000, description: 'Covers lighting, fans, refrigerators, etc.', color: 'hsl(200, 80%, 60%)', history: [
    { month: 'June 2024', amount: 8500, status: 'Paid' },
    { month: 'May 2024', amount: 9200, status: 'Paid' },
    { month: 'April 2024', amount: 7800, status: 'Paid' },
  ]},
  { name: 'Cleaning Supplies', icon: Sparkles, currentMonthCost: 2000, description: 'Detergents, soaps, and other cleaning materials.', color: 'hsl(100, 80%, 60%)', history: [
    { month: 'June 2024', amount: 1800, status: 'Paid' },
    { month: 'May 2024', amount: 1900, status: 'Paid' },
    { month: 'April 2024', amount: 1700, status: 'Paid' },
  ]},
];

const monthlyTrendData = [
  { month: 'Jan', cost: 98000 },
  { month: 'Feb', cost: 101000 },
  { month: 'Mar', cost: 105000 },
  { month: 'Apr', cost: 102500 },
  { month: 'May', cost: 108500 },
  { month: 'Jun', cost: 112000 },
];

const TOTAL_STUDENTS = 35;
const MEALS_PER_DAY = 3;

// --- Loading Skeleton ---
const LoadingSkeleton = () => (
    <div className="space-y-8 animate-pulse">
        <div className="h-8 w-1/2 rounded-lg bg-muted"></div>
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="h-28 bg-muted/50"></Card>
            <Card className="h-28 bg-muted/50"></Card>
            <Card className="h-28 bg-muted/50"></Card>
        </div>
        <Card className="h-96 bg-muted/50"></Card>
        <div className="space-y-4">
            <div className="h-12 w-full rounded-lg bg-muted/50"></div>
            <div className="h-12 w-full rounded-lg bg-muted/50"></div>
        </div>
    </div>
);

// --- Expense Card Component ---
const ExpenseCard = ({ item, onViewHistory }: { item: ExpenseItem; onViewHistory: (item: ExpenseItem) => void; }) => {
    const { currentMonthCost, name, icon: Icon, description } = item;

    return (
        <Card className="bg-card/50 backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-1 flex flex-col">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <CardDescription>{name}</CardDescription>
                        <CardTitle className="text-3xl font-bold font-headline">₹{currentMonthCost.toLocaleString()}</CardTitle>
                    </div>
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">{description}</p>
                <p className="text-xs font-semibold text-primary font-headline">Daily Cost: ~₹{(currentMonthCost / 30).toFixed(2)}</p>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" size="sm" className="w-full" onClick={() => onViewHistory(item)}>
                    <History className="mr-2 h-4 w-4" />
                    View History
                </Button>
            </CardFooter>
        </Card>
    );
};

// --- History Dialog Component ---
const ExpenseHistoryDialog = ({ isOpen, onOpenChange, expense }: { isOpen: boolean; onOpenChange: (open: boolean) => void; expense: ExpenseItem | null }) => {
    if (!expense) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{expense.name} - Expense History</DialogTitle>
                    <DialogDescription>
                        Showing payment history for the last 3 months.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expense.history.map((record) => (
                                <TableRow key={record.month}>
                                    <TableCell className="font-medium">{record.month}</TableCell>
                                    <TableCell>
                                        <Badge variant={record.status === 'Paid' ? 'default' : 'destructive'} className={cn(record.status === 'Paid' && 'bg-green-500/20 text-green-700 border-green-400')}>
                                            {record.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">₹{record.amount.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// --- Main Page Component ---
export default function MessExpensesPage() {
    const [isClient, setIsClient] = useState(false);
    const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(null);

    useEffect(() => { setIsClient(true) }, []);
    
    const { totalMonthlyCost, yourShare, costPerMeal, allExpenses, chartConfig, totalUtilities, totalInfrastructure } = useMemo(() => {
        const all = [...utilitiesData, ...infrastructureData];
        const total = all.reduce((acc, item) => acc + item.currentMonthCost, 0);
        const share = total / TOTAL_STUDENTS;
        const perMeal = total / (TOTAL_STUDENTS * MEALS_PER_DAY * 30);
        
        const utilitiesTotal = utilitiesData.reduce((sum, item) => sum + item.currentMonthCost, 0);
        const infrastructureTotal = infrastructureData.reduce((sum, item) => sum + item.currentMonthCost, 0);

        const config: ChartConfig = {};
        all.forEach(item => {
            config[item.name] = { label: item.name, color: item.color };
        });
        config['cost'] = { label: 'Monthly Cost', color: 'hsl(var(--primary))' };
        
        return {
            totalMonthlyCost: total,
            yourShare: share,
            costPerMeal: perMeal,
            allExpenses: all,
            chartConfig: config,
            totalUtilities: utilitiesTotal,
            totalInfrastructure: infrastructureTotal,
        };
    }, []);

    const handleViewHistory = (item: ExpenseItem) => {
        setSelectedExpense(item);
        setIsHistoryDialogOpen(true);
    };

    if (!isClient) return <LoadingSkeleton />;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Mess Expenses</h1>
                    <p className="text-muted-foreground">A transparent breakdown of where your money goes.</p>
                </div>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download Report</Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Monthly Expenses</CardTitle>
                        <IndianRupee className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">₹{totalMonthlyCost.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Combined cost for current month</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Your Monthly Share</CardTitle>
                        <User className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">₹{yourShare.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Based on {TOTAL_STUDENTS} students</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Cost Per Meal</CardTitle>
                        <Utensils className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">₹{costPerMeal.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Calculated over 30 days</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Expense Analytics</CardTitle>
                        <CardDescription>Visualize the expense data for the current month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="distribution">
                            <TabsList>
                                <TabsTrigger value="distribution">Distribution</TabsTrigger>
                                <TabsTrigger value="trend">6-Month Trend</TabsTrigger>
                            </TabsList>
                            <TabsContent value="distribution" className="h-[24rem] w-full pt-4">
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                                            <Pie 
                                                data={allExpenses} 
                                                dataKey="currentMonthCost" 
                                                nameKey="name" 
                                                cx="50%" 
                                                cy="50%" 
                                                innerRadius={60} 
                                                strokeWidth={2}
                                            >
                                                {allExpenses.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </TabsContent>
                            <TabsContent value="trend" className="h-[24rem] w-full pt-4">
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <BarChart data={monthlyTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                                        <Tooltip cursor={{fill: 'hsla(var(--muted), 0.5)'}} content={<ChartTooltipContent />} />
                                        <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Accordion type="multiple" defaultValue={['utilities', 'infrastructure']} className="w-full space-y-4">
                    <AccordionItem value="utilities" className="bg-card/80 backdrop-blur-sm shadow-xl border-0 rounded-lg">
                        <AccordionTrigger className="p-6 text-2xl font-headline hover:no-underline">
                            <div className="flex justify-between w-full pr-4 items-center">
                                <span>Utilities Breakdown</span>
                                <span className="text-lg font-semibold text-primary font-headline">Total: ₹{totalUtilities.toLocaleString()}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {utilitiesData.map(item => (
                                    <ExpenseCard key={item.name} item={item} onViewHistory={handleViewHistory} />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="infrastructure" className="bg-card/80 backdrop-blur-sm shadow-xl border-0 rounded-lg">
                        <AccordionTrigger className="p-6 text-2xl font-headline hover:no-underline">
                            <div className="flex justify-between w-full pr-4 items-center">
                            <span>Rent & Infrastructure</span>
                            <span className="text-lg font-semibold text-primary font-headline">Total: ₹{totalInfrastructure.toLocaleString()}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {infrastructureData.map(item => (
                                    <ExpenseCard key={item.name} item={item} onViewHistory={handleViewHistory} />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            
            <ExpenseHistoryDialog 
                isOpen={isHistoryDialogOpen} 
                onOpenChange={setIsHistoryDialogOpen} 
                expense={selectedExpense} 
            />
        </div>
    );
}
