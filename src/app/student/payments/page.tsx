
'use client';

import React, { useState, useEffect } from 'react';
import {
  IndianRupee,
  Clock,
  Download,
  Info,
  CreditCard,
  Wallet,
  MoreHorizontal,
  FileText,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

// --- Data Types ---
type PaymentStatus = 'Paid' | 'Pending' | 'Failed';
interface PaymentRecord {
  id: string;
  date: Date;
  amount: number;
  status: PaymentStatus;
  description: string;
}
interface BillItem {
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

// --- Dummy Data ---
const currentBill = {
  month: 'July 2024',
  dueDate: new Date(2024, 7, 10), // Note: Month is 0-indexed
  baseFee: 3500,
  items: [
    { description: 'Meal Cancellations (5 meals)', amount: 250, type: 'credit' as const },
    { description: 'Late Fee (June)', amount: 100, type: 'debit' as const },
    { description: 'Extra Item (Special Dinner)', amount: 150, type: 'debit' as const },
  ],
  pendingDues: 250.0,
};

const paymentHistory: PaymentRecord[] = [
  { id: 'TXN746352', date: new Date(2024, 5, 5), amount: 3500.0, status: 'Paid', description: 'Mess Fee - June' },
  { id: 'TXN635241', date: new Date(2024, 4, 8), amount: 3650.0, status: 'Paid', description: 'Mess Fee - May' },
  { id: 'TXN524130', date: new Date(2024, 3, 4), amount: 3500.0, status: 'Paid', description: 'Mess Fee - April' },
  { id: 'TXN413019', date: new Date(2024, 2, 6), amount: 3200.0, status: 'Paid', description: 'Mess Fee - March' },
];

const calculateTotal = () => {
  const credits = currentBill.items.filter(i => i.type === 'credit').reduce((sum, i) => sum + i.amount, 0);
  const debits = currentBill.items.filter(i => i.type === 'debit').reduce((sum, i) => sum + i.amount, 0);
  return currentBill.baseFee - credits + debits;
};

// --- Countdown Component ---
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const timer = setInterval(() => {
            const now = new Date();
            const days = differenceInDays(targetDate, now);
            const hours = differenceInHours(targetDate, now) % 24;
            const minutes = differenceInMinutes(targetDate, now) % 60;
            setTimeLeft({
                days: Math.max(0, days),
                hours: Math.max(0, hours),
                minutes: Math.max(0, minutes)
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);
    
    if (!isClient) {
        return <div className="h-12 w-full animate-pulse rounded-md bg-muted/50" />;
    }

    return (
        <div className="flex justify-around text-center">
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{timeLeft.days}</p>
                <p className="text-xs text-muted-foreground">Days</p>
            </div>
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{timeLeft.hours}</p>
                <p className="text-xs text-muted-foreground">Hours</p>
            </div>
            <div>
                <p className="text-3xl font-bold font-headline text-primary">{timeLeft.minutes}</p>
                <p className="text-xs text-muted-foreground">Mins</p>
            </div>
        </div>
    );
};

export default function PaymentsPage() {
    const totalAmount = calculateTotal();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHistory = paymentHistory.filter(p =>
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Payments & Billing</h1>
        <p className="text-muted-foreground">Manage your mess bills and view transaction history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content: Bill & History */}
        <div className="lg:col-span-2 space-y-8">
            {/* Current Bill Card */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-headline">Bill for {currentBill.month}</CardTitle>
                            <CardDescription>Due by {format(currentBill.dueDate, 'do MMMM, yyyy')}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download Bill</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="p-6 rounded-lg bg-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-primary font-semibold">TOTAL AMOUNT DUE</p>
                            <p className="text-5xl font-bold font-headline text-primary">₹{totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <Button size="lg" className="font-bold shadow-lg hover:shadow-xl w-full">Pay Now</Button>
                            <div className="flex items-center justify-center gap-4 mt-2">
                                <p className="text-xs text-muted-foreground">Pay with:</p>
                                <img src="https://www.vectorlogo.zone/logos/upi/upi-ar21.svg" alt="UPI" className="h-5" data-ai-hint="payment logo"/>
                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                                <Wallet className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full mt-6">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-semibold text-base">View Bill Breakdown</AccordionTrigger>
                            <AccordionContent>
                                <Table>
                                    <TableBody>
                                        <TableRow className="hover:bg-muted/30">
                                            <TableCell>Base Fee for {currentBill.month}</TableCell>
                                            <TableCell className="text-right font-medium font-headline">₹{currentBill.baseFee.toFixed(2)}</TableCell>
                                        </TableRow>
                                        {currentBill.items.map((item, index) => (
                                            <TableRow key={index} className="hover:bg-muted/30">
                                                <TableCell>{item.description}</TableCell>
                                                <TableCell className={`text-right font-medium font-headline ${item.type === 'credit' ? 'text-green-500' : 'text-destructive'}`}>
                                                    {item.type === 'credit' ? '-' : '+'} ₹{item.amount.toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Payment History Card */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 overflow-hidden h-full">
              <CardHeader>
                  <CardTitle className="text-2xl font-headline">Payment History</CardTitle>
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                          placeholder="Search by description or ID..." 
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Description</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {filteredHistory.map((p) => (
                              <TableRow key={p.id}>
                                  <TableCell>
                                      <p className="font-medium">{p.description}</p>
                                      <p className="text-xs text-muted-foreground">{format(p.date, 'do MMM, yyyy')} | {p.id}</p>
                                  </TableCell>
                                  <TableCell>
                                      <Badge variant={p.status === 'Paid' ? 'default' : p.status === 'Failed' ? 'destructive' : 'secondary'}
                                       className={p.status === 'Paid' ? 'bg-green-500/20 text-green-700 border-green-400' : ''}
                                      >
                                          {p.status}
                                      </Badge>
                                  </TableCell>
                                  <TableCell className="text-right font-medium font-headline">₹{p.amount.toFixed(2)}</TableCell>
                                  <TableCell className="text-right">
                                      <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                              <Button variant="ghost" size="icon">
                                                  <MoreHorizontal className="h-4 w-4" />
                                              </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent>
                                              <DropdownMenuItem><FileText className="mr-2 h-4 w-4"/> View Receipt</DropdownMenuItem>
                                              <DropdownMenuItem><Download className="mr-2 h-4 w-4"/> Download</DropdownMenuItem>
                                          </DropdownMenuContent>
                                      </DropdownMenu>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </CardContent>
            </Card>
        </div>

        {/* Right Sidebar with Summary Cards */}
        <div className="lg:col-span-1 space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                        <span>Pending Dues</span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground"/></TooltipTrigger>
                                <TooltipContent>From previous billing cycles.</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold font-headline text-destructive">₹{currentBill.pendingDues.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Overdue from previous months.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" className="w-full">Pay Overdue Amount</Button>
                </CardFooter>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                        <span>Next Bill In</span>
                         <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CountdownTimer targetDate={currentBill.dueDate} />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
