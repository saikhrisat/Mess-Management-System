
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Utensils, UserCheck, CalendarDays } from 'lucide-react';
import { format, subDays } from 'date-fns';

// --- Types ---
type AttendanceStatus = 'present' | 'absent';
type DailyMealData = { date: Date; mealsTaken: 0 | 1 | 2 | 3 };
type DailyPresenceData = { date: Date; status: AttendanceStatus };

// --- Loading Skeleton ---
const LoadingSkeleton = () => (
    <div className="space-y-8 animate-pulse">
        <div className="space-y-2">
            <div className="h-8 w-1/2 rounded-lg bg-muted"></div>
            <div className="h-5 w-2/3 rounded-lg bg-muted"></div>
        </div>
        <Card className="h-64 bg-muted"></Card>
        <Card className="h-64 bg-muted"></Card>
    </div>
);


// --- GitHub-style Grid Component ---
interface ContributionGridProps<T> {
  data: T[];
  getColor: (item: T) => string;
  getTooltipContent: (item: T) => React.ReactNode;
}

const ContributionGrid = <T extends { date: Date }>({ data, getColor, getTooltipContent }: ContributionGridProps<T>) => {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-wrap gap-1.5 justify-start">
        {data.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className="h-5 w-5 sm:h-6 sm:w-6 rounded-sm transition-transform duration-200 hover:scale-125"
                style={{ backgroundColor: getColor(item) }}
              />
            </TooltipTrigger>
            <TooltipContent>
              {getTooltipContent(item)}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};


export default function AttendancePage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const attendanceData = useMemo(() => {
        if (!isClient) return null;

        const today = new Date();
        const dates = Array.from({ length: 30 }).map((_, i) => subDays(today, 29 - i));

        // Generate dummy meal data
        const mealData: DailyMealData[] = dates.map(date => ({
            date,
            mealsTaken: Math.floor(Math.random() * 4) as DailyMealData['mealsTaken'],
        }));
        const totalMealsTaken = mealData.reduce((sum, day) => sum + day.mealsTaken, 0);

        // Generate dummy presence data
        const presenceData: DailyPresenceData[] = dates.map(date => ({
            date,
            status: Math.random() > 0.2 ? 'present' : 'absent',
        }));
        const totalDaysPresent = presenceData.filter(d => d.status === 'present').length;
        const totalDaysAbsent = 30 - totalDaysPresent;

        // Color functions
        const getMealColor = (item: DailyMealData) => {
            const colors = [
                'hsl(var(--muted))', // 0 meals
                'hsl(var(--primary) / 0.3)', // 1 meal
                'hsl(var(--primary) / 0.6)', // 2 meals
                'hsl(var(--primary))', // 3 meals
            ];
            return colors[item.mealsTaken];
        };

        const getPresenceColor = (item: DailyPresenceData) => {
            return item.status === 'present' ? 'hsl(140, 70%, 40%)' : 'hsl(var(--destructive))';
        };
        
        // Tooltip content functions
        const getMealTooltip = (item: DailyMealData) => (
             <p>{format(item.date, 'PPP')} - {item.mealsTaken} meal(s)</p>
        );

        const getPresenceTooltip = (item: DailyPresenceData) => (
            <p>{format(item.date, 'PPP')} - <span className="capitalize">{item.status}</span></p>
        );

        return {
            mealData,
            totalMealsTaken,
            presenceData,
            totalDaysPresent,
            totalDaysAbsent,
            getMealColor,
            getPresenceColor,
            getMealTooltip,
            getPresenceTooltip,
            startDate: dates[0],
            endDate: today,
        };

    }, [isClient]);

    if (!isClient || !attendanceData) {
        return <LoadingSkeleton />;
    }

    const {
        mealData,
        totalMealsTaken,
        presenceData,
        totalDaysPresent,
        totalDaysAbsent,
        getMealColor,
        getPresenceColor,
        getMealTooltip,
        getPresenceTooltip,
        startDate,
        endDate
    } = attendanceData;


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Your 30-Day Attendance</h1>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <CalendarDays className="h-4 w-4" />
                    Showing data from {format(startDate, 'do MMM')} to {format(endDate, 'do MMM, yyyy')}
                </p>
            </div>

            {/* Meal Consumption Card */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center gap-2">
                        <Utensils className="h-6 w-6 text-primary" /> Meal Consumption
                    </CardTitle>
                    <CardDescription>Your meal activity over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-2">
                             <p className="text-sm text-muted-foreground">Total Meals Consumed</p>
                            <p className="text-5xl font-bold font-headline text-primary">{totalMealsTaken}</p>
                            <p className="text-sm text-muted-foreground">out of a possible 90 meals.</p>
                        </div>
                        <div className="w-full">
                           <Progress value={(totalMealsTaken / 90) * 100} className="h-4" />
                        </div>
                    </div>
                     <ContributionGrid data={mealData} getColor={getMealColor} getTooltipContent={getMealTooltip} />
                </CardContent>
            </Card>

            {/* Mess Presence Card */}
             <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 transform transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center gap-2">
                        <UserCheck className="h-6 w-6 text-primary" /> Mess Presence
                    </CardTitle>
                    <CardDescription>Your presence record for the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div className="p-4 rounded-lg bg-green-500/10">
                            <p className="text-4xl font-bold font-headline text-green-500">{totalDaysPresent}</p>
                            <p className="text-sm font-medium text-muted-foreground">Days Present</p>
                        </div>
                        <div className="p-4 rounded-lg bg-red-500/10">
                            <p className="text-4xl font-bold font-headline text-destructive">{totalDaysAbsent}</p>
                            <p className="text-sm font-medium text-muted-foreground">Days Absent</p>
                        </div>
                    </div>
                     <ContributionGrid data={presenceData} getColor={getPresenceColor} getTooltipContent={getPresenceTooltip} />
                </CardContent>
            </Card>
        </div>
    );
}
