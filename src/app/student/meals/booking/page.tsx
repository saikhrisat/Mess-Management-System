
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Utensils, CalendarDays, ThumbsUp } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

// Mock Data
const menu = {
  monday: { breakfast: 'Aloo Paratha', lunch: 'Rajma Chawal', dinner: 'Shahi Paneer' },
  tuesday: { breakfast: 'Poha', lunch: 'Kadhi Pakoda', dinner: 'Mix Veg' },
  wednesday: { breakfast: 'Upma', lunch: 'Chole Bhature', dinner: 'Dal Makhani' },
  thursday: { breakfast: 'Idli Sambar', lunch: 'Veg Biryani', dinner: 'Matar Paneer' },
  friday: { breakfast: 'Dosa', lunch: 'Dal Fry', dinner: 'Aloo Gobi' },
  saturday: { breakfast: 'Oats', lunch: 'Masala Dosa', dinner: 'Paneer Butter Masala' },
  sunday: { breakfast: 'Pancakes', lunch: 'Special Thali', dinner: 'Pasta' },
};

const todaysSpecial = {
  name: 'Special Veg Thali',
  description: 'A delightful assortment of seasonal vegetables, dal, rice, roti, and a sweet dish.',
  availability: 'Available for Lunch',
};

// Types
type Meal = 'breakfast' | 'lunch' | 'dinner';
interface CancelledMeal {
  date: Date;
  meals: Meal[];
}

// --- Loading Skeleton ---
const LoadingSkeleton = () => (
    <div className="space-y-8 animate-pulse">
        <div className="space-y-2">
            <div className="h-8 w-1/2 rounded-lg bg-muted"></div>
            <div className="h-5 w-2/3 rounded-lg bg-muted"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 h-96 bg-muted"></Card>
            <div className="lg:col-span-1 space-y-8">
                <Card className="h-48 bg-muted"></Card>
                <Card className="h-64 bg-muted"></Card>
            </div>
        </div>
    </div>
);

export default function MealBookingPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [mealsToCancel, setMealsToCancel] = useState<Meal[]>([]);
  const [cancelledMeals, setCancelledMeals] = useState<CancelledMeal[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const today = new Date();

  const handleDaySelect = (range: DateRange | undefined) => {
    // Prevent selecting past dates other than today
    if (range?.from && range.from < new Date(today.setHours(0, 0, 0, 0))) {
      return; 
    }
    setSelectedRange(range);
  };

  const handleCheckboxChange = (meal: Meal, checked: boolean) => {
    setMealsToCancel(prev =>
      checked ? [...prev, meal] : prev.filter(m => m !== meal)
    );
  };

  const handleAllCheckboxChange = (checked: boolean) => {
    setMealsToCancel(checked ? ['breakfast', 'lunch', 'dinner'] : []);
  };

  const handleConfirmCancellation = () => {
    if (!selectedRange?.from || mealsToCancel.length === 0) return;

    const newCancellations: CancelledMeal[] = [];
    let loopDate = new Date(selectedRange.from);
    const endDate = selectedRange.to ? new Date(selectedRange.to) : loopDate;

    while (loopDate <= endDate) {
      const currentDate = new Date(loopDate);
      const existingIndex = cancelledMeals.findIndex(c => isSameDay(c.date, currentDate));
      
      if (existingIndex > -1) {
        const updatedMeals = [...new Set([...cancelledMeals[existingIndex].meals, ...mealsToCancel])];
        cancelledMeals[existingIndex].meals = updatedMeals;
      } else {
        newCancellations.push({ date: currentDate, meals: [...mealsToCancel] });
      }
      loopDate.setDate(loopDate.getDate() + 1);
    }

    setCancelledMeals(prev => [...prev, ...newCancellations]);
    setSelectedRange(undefined);
    setMealsToCancel([]);
    setIsAlertOpen(false);
  };

  const cancelledDates = useMemo(() => {
    return cancelledMeals
      .filter(c => c.meals.length === 3) // Only mark fully cancelled days
      .map(c => c.date);
  }, [cancelledMeals]);

  const defaultDay = isClient ? format(today, 'eeee').toLowerCase() : 'monday';

  if (!isClient) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Meals & Menu</h1>
        <p className="text-muted-foreground">Manage your meal schedule and view the weekly menu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Cancellation Card */}
        <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline">
              <CalendarDays className="h-6 w-6 text-primary" /> Meal Cancellation
            </CardTitle>
            <CardDescription>
              Select a date or range to cancel meals. Fully cancelled days will be marked in red.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center items-center">
              <Calendar
                mode="range"
                selected={selectedRange}
                onSelect={handleDaySelect}
                numberOfMonths={1}
                disabled={{ before: today }}
                modifiers={{ canceled: cancelledDates }}
                modifiersStyles={{
                  canceled: {
                    color: 'hsl(var(--destructive-foreground))',
                    backgroundColor: 'hsl(var(--destructive))',
                    opacity: 0.8,
                  },
                }}
                className="rounded-md border p-3 bg-background/50 self-start"
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold font-headline">
                {selectedRange?.from 
                    ? `Editing for: ${format(selectedRange.from, 'do MMM')}${selectedRange.to ? ` to ${format(selectedRange.to, 'do MMM')}` : ''}` 
                    : 'Select dates to begin'}
              </h3>
              
              <div className="space-y-3 flex-grow">
                <div className="flex items-center space-x-3 p-3 rounded-md bg-muted/50">
                  <Checkbox
                    id="all"
                    onCheckedChange={(checked) => handleAllCheckboxChange(!!checked)}
                    checked={mealsToCancel.length === 3}
                    disabled={!selectedRange?.from}
                  />
                  <label htmlFor="all" className="text-sm font-bold leading-none cursor-pointer">Cancel All Meals</label>
                </div>
                <div className="space-y-2 pl-4 border-l-2 border-primary/50 ml-2">
                  {(['breakfast', 'lunch', 'dinner'] as Meal[]).map(meal => (
                    <div key={meal} className="flex items-center space-x-3">
                      <Checkbox
                        id={meal}
                        onCheckedChange={(checked) => handleCheckboxChange(meal, !!checked)}
                        checked={mealsToCancel.includes(meal)}
                        disabled={!selectedRange?.from}
                      />
                      <label htmlFor={meal} className="text-sm font-medium leading-none capitalize cursor-pointer">{meal}</label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-auto" variant="destructive" disabled={!selectedRange?.from || mealsToCancel.length === 0} onClick={() => setIsAlertOpen(true)}>
                Confirm Cancellation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                <Utensils className="h-6 w-6 text-primary" /> Today's Special
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <div className="p-4 bg-primary/10 rounded-lg">
                    <h3 className="text-xl font-bold font-headline text-primary">{todaysSpecial.name}</h3>
               </div>
              <p className="text-muted-foreground text-sm">{todaysSpecial.description}</p>
              <div className="flex justify-between items-center pt-2">
                 <Badge>{todaysSpecial.availability}</Badge>
                 <Button variant="secondary" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" /> Rate Meal
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Weekly Menu</CardTitle>
              <CardDescription>Plan your meals for the week.</CardDescription>
            </CardHeader>
            <CardContent>
               <Tabs defaultValue={defaultDay} className="w-full">
                <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7 mb-4">
                  {Object.keys(menu).map(day => (
                    <TabsTrigger key={day} value={day} className="capitalize text-xs sm:text-sm">{day.slice(0, 3)}</TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(menu).map(([day, meals]) => (
                  <TabsContent key={day} value={day} className="mt-0">
                    <Table>
                      <TableBody>
                        <TableRow className="border-0 hover:bg-primary/5">
                          <TableCell className="font-medium">Breakfast</TableCell>
                          <TableCell className="text-right text-muted-foreground">{meals.breakfast}</TableCell>
                        </TableRow>
                        <TableRow className="border-0 hover:bg-primary/5">
                          <TableCell className="font-medium">Lunch</TableCell>
                          <TableCell className="text-right text-muted-foreground">{meals.lunch}</TableCell>
                        </TableRow>
                        <TableRow className="border-0 hover:bg-primary/5">
                          <TableCell className="font-medium">Dinner</TableCell>
                          <TableCell className="text-right text-muted-foreground">{meals.dinner}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel <span className="font-semibold capitalize">{mealsToCancel.join(', ')}</span> for the selected dates. This action might not be reversible depending on mess policy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancellation}>
              Yes, Cancel Meals
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
