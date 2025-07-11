
'use client';

import React, { useState } from 'react';
import {
  MessageSquare, Star, ThumbsUp, ShieldAlert, Phone, Mail, FileUp, Paperclip, Send, Bot, User, Calendar, Clock, Utensils
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const StarRating = ({ count = 5, rating, onRatingChange, size = 'md' }: { count?: number; rating: number; onRatingChange: (r: number) => void, size?: 'sm' | 'md' }) => {
    const [hover, setHover] = useState(0);
    const starSize = size === 'md' ? 'w-7 h-7' : 'w-5 h-5';
    return (
        <div className="flex items-center gap-1">
            {[...Array(count)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        className={cn(
                            "transition-all duration-200 transform hover:scale-110",
                            ratingValue <= (hover || rating) ? "text-accent" : "text-muted-foreground/30"
                        )}
                        onClick={() => onRatingChange(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star className={cn(starSize, "fill-current")} />
                    </button>
                );
            })}
        </div>
    );
};

const FeedbackSection = () => {
    const previousFeedback = [
        { id: 'FB-001', category: 'Food Quality', status: 'Resolved', date: '2024-06-15' },
        { id: 'FB-002', category: 'Cleanliness', status: 'In Progress', date: '2024-07-01' },
        { id: 'FB-003', category: 'Staff Behavior', status: 'Submitted', date: '2024-07-10' },
    ];
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Submit New Feedback</CardTitle>
                    <CardDescription>Let us know how we can improve. Your feedback is vital for our growth.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="feedback-category">Category</Label>
                            <Select>
                                <SelectTrigger id="feedback-category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="food">Food Quality</SelectItem>
                                    <SelectItem value="service">Service Quality</SelectItem>
                                    <SelectItem value="cleanliness">Cleanliness</SelectItem>
                                    <SelectItem value="staff">Staff Behavior</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label>Urgency</Label>
                             <RadioGroup defaultValue="medium" className="flex items-center space-x-4 pt-2">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="low" id="low" /><Label htmlFor="low">Low</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="medium" id="medium" /><Label htmlFor="medium">Medium</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="high" id="high" /><Label htmlFor="high">High</Label></div>
                            </RadioGroup>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="feedback-details">Details</Label>
                        <Textarea id="feedback-details" placeholder="Please provide as much detail as possible..." rows={6}/>
                    </div>
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <Button variant="outline"><FileUp className="mr-2 h-4 w-4"/> Attach File</Button>
                        <div className="flex items-center space-x-2">
                            <Switch id="anonymous-feedback" />
                            <Label htmlFor="anonymous-feedback">Submit Anonymously</Label>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full md:w-auto">Submit Feedback</Button>
                </CardFooter>
            </Card>

             <Card className="lg:col-span-1 bg-card/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="font-headline">Feedback History</CardTitle>
                    <CardDescription>Track your past submissions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {previousFeedback.map((fb) => (
                                <TableRow key={fb.id}>
                                    <TableCell className="font-medium">{fb.id}</TableCell>
                                    <TableCell><Badge variant={fb.status === 'Resolved' ? 'default' : 'secondary'} className={fb.status === 'Resolved' ? 'bg-green-500/20 text-green-700' : ''}>{fb.status}</Badge></TableCell>
                                    <TableCell className="text-right text-xs text-muted-foreground">{fb.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

const RateMealsSection = () => {
    const [breakfastRating, setBreakfastRating] = useState(0);
    const [lunchRating, setLunchRating] = useState(0);
    const [dinnerRating, setDinnerRating] = useState(0);
    const tags = ["Tasty", "Fresh", "Hot", "Quantity", "Presentation"];

    const MealRatingCard = ({ title, meal, rating, onRatingChange }: { title: string; meal: string; rating: number; onRatingChange: (r: number) => void; }) => (
        <Card className="bg-card/50 backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-1 flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline text-xl">{title}</CardTitle>
                <CardDescription>Today's {title.toLowerCase()}: {meal}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
                <div className="flex justify-center">
                    <StarRating rating={rating} onRatingChange={onRatingChange} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Quick Tags (Optional)</Label>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <Button key={tag} variant="outline" size="sm" className="text-xs rounded-full">{tag}</Button>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button variant="secondary" className="w-full"><Paperclip className="mr-2 h-4 w-4" /> Add Photo</Button>
            </CardFooter>
        </Card>
    );

    return (
        <div className="space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Rate Today's Meals</CardTitle>
                    <CardDescription>Your ratings help us improve our menu and service.</CardDescription>
                </CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MealRatingCard title="Breakfast" meal="Aloo Paratha" rating={breakfastRating} onRatingChange={setBreakfastRating} />
                    <MealRatingCard title="Lunch" meal="Rajma Chawal" rating={lunchRating} onRatingChange={setLunchRating} />
                    <MealRatingCard title="Dinner" meal="Shahi Paneer" rating={dinnerRating} onRatingChange={setDinnerRating} />
                </CardContent>
            </Card>
        </div>
    );
};

const ComplaintSection = () => {
    const previousComplaints = [
        { id: 'CP-201', subject: 'Billing Discrepancy', status: 'Resolved', date: '2024-05-20' },
        { id: 'CP-202', subject: 'Food Quality Issue', status: 'In Progress', date: '2024-07-05' },
    ];
    return (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center gap-2"><ShieldAlert />File a Complaint</CardTitle>
                    <CardDescription>Use this for specific issues requiring immediate attention.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Quick Templates</Label>
                        <div className="flex flex-wrap gap-2">
                             <Button variant="secondary">Billing Issue</Button>
                             <Button variant="secondary">Item Missing</Button>
                             <Button variant="secondary">Cleanliness</Button>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="complaint-subject">Subject</Label>
                        <Input id="complaint-subject" placeholder="e.g., Incorrect bill for July" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="complaint-details">Details</Label>
                        <Textarea id="complaint-details" placeholder="Describe the issue in detail..." rows={5}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="lg" variant="destructive" className="w-full md:w-auto">Submit Complaint</Button>
                </CardFooter>
            </Card>

             <Card className="lg:col-span-1 bg-card/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="font-headline">Complaint History</CardTitle>
                     <CardDescription>Track your raised complaints.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {previousComplaints.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">{c.id}</TableCell>
                                    <TableCell><Badge variant={c.status === 'Resolved' ? 'default' : 'destructive'} className={c.status === 'Resolved' ? 'bg-green-500/20 text-green-700' : ''}>{c.status}</Badge></TableCell>
                                    <TableCell className="text-right text-xs text-muted-foreground">{c.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

const ContactSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
             <div className="lg:col-span-1 space-y-8">
                 <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader className="items-center">
                         <Avatar className="h-24 w-24">
                            <AvatarImage src="https://placehold.co/96x96.png" data-ai-hint="person portrait"/>
                            <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <CardTitle className="pt-2 font-headline">Rajesh Kumar</CardTitle>
                        <CardDescription>Your Mess Manager</CardDescription>
                        <Badge variant="default" className="mt-2 bg-green-500/20 text-green-700">Available</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full justify-start gap-2" asChild><a href="tel:+911234567890"><Phone /> Call Manager</a></Button>
                        <Button variant="secondary" className="w-full justify-start gap-2" asChild><a href="mailto:manager@messmate.com"><Mail /> Email Manager</a></Button>
                    </CardContent>
                </Card>
                 <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Calendar /> Book Appointment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Need to discuss something in person? Schedule a meeting.</p>
                        <Button className="w-full"><Clock className="mr-2 h-4 w-4" /> Find a Time</Button>
                    </CardContent>
                 </Card>
            </div>
            <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center gap-2"><Bot /> Frequently Asked Questions</CardTitle>
                    <CardDescription>Find quick answers to common questions below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How are meal cancellations handled for billing?</AccordionTrigger>
                            <AccordionContent>
                            Cancelled meals are credited back to your account at the end of the billing cycle. The amount per meal is calculated based on the monthly expense report.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What are the timings for meals?</AccordionTrigger>
                            <AccordionContent>
                                Breakfast: 7:30 AM - 9:30 AM <br/>
                                Lunch: 12:30 PM - 2:30 PM <br/>
                                Dinner: 7:30 PM - 9:30 PM
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I bring a guest for a meal?</AccordionTrigger>
                            <AccordionContent>
                            Yes, guest meals are available. Please inform the manager at least 3 hours in advance. Guest meal charges will be added to your next bill.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4">
                            <AccordionTrigger>What happens if I miss paying the bill on time?</AccordionTrigger>
                            <AccordionContent>
                            A late fee of ₹10 per day is applied to overdue bills. Continuous default may lead to suspension of meal services. Please contact the manager if you face any issues with payment.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
};

export default function FeedbackAndSupportPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Feedback & Support</h1>
                <p className="text-muted-foreground">We value your input! Share feedback, rate meals, or get in touch.</p>
            </div>

            <Tabs defaultValue="feedback" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    <TabsTrigger value="feedback"><MessageSquare className="mr-2 h-4 w-4"/>Feedback</TabsTrigger>
                    <TabsTrigger value="rate-meals"><Star className="mr-2 h-4 w-4"/>Rate Meals</TabsTrigger>
                    <TabsTrigger value="complaints"><ShieldAlert className="mr-2 h-4 w-4"/>Complaints</TabsTrigger>
                    <TabsTrigger value="contact"><Phone className="mr-2 h-4 w-4"/>Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="feedback" className="mt-6">
                    <FeedbackSection />
                </TabsContent>
                <TabsContent value="rate-meals" className="mt-6">
                    <RateMealsSection />
                </TabsContent>
                <TabsContent value="complaints" className="mt-6">
                    <ComplaintSection />
                </TabsContent>
                <TabsContent value="contact" className="mt-6">
                    <ContactSection />
                </TabsContent>
            </Tabs>
        </div>
    );
}
