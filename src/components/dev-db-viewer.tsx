
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getDatabaseTables } from '@/lib/dev-actions';
import { useToast } from '@/hooks/use-toast';
import { Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


interface DbData {
  students: any[];
  managers: any[];
  owners: any[];
}

export function DevDbViewer() {
  const [data, setData] = useState<DbData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFetchData = async () => {
    setIsLoading(true);
    const result = await getDatabaseTables();
    setIsLoading(false);

    if (result.success && result.data) {
      setData(result.data);
    } else {
      toast({
        title: 'Error fetching data',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog onOpenChange={(open) => {
        if (open && !data) {
            handleFetchData();
        }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
            <Database className="mr-2 h-4 w-4" />
            View Database (Dev)
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-5/6 flex flex-col">
        <DialogHeader>
          <DialogTitle>Database Viewer</DialogTitle>
          <DialogDescription>
            Live data from the SQLite database. This is for development purposes only.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow min-h-0">
          {isLoading && <p className="text-center p-8">Loading database content...</p>}
          {data && (
            <Tabs defaultValue="students" className="h-full flex flex-col">
                <div className="flex-shrink-0">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="students">Students ({data.students.length})</TabsTrigger>
                        <TabsTrigger value="managers">Managers ({data.managers.length})</TabsTrigger>
                        <TabsTrigger value="owners">Owners ({data.owners.length})</TabsTrigger>
                    </TabsList>
                </div>
                <div className="flex-grow mt-4 min-h-0">
                    <TabsContent value="students" className="h-full m-0">
                        <ScrollArea className="h-full pr-4">
                            <pre className="text-xs bg-muted p-4 rounded-md">{JSON.stringify(data.students, null, 2)}</pre>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="managers" className="h-full m-0">
                        <ScrollArea className="h-full pr-4">
                            <pre className="text-xs bg-muted p-4 rounded-md">{JSON.stringify(data.managers, null, 2)}</pre>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="owners" className="h-full m-0">
                         <ScrollArea className="h-full pr-4">
                            <pre className="text-xs bg-muted p-4 rounded-md">{JSON.stringify(data.owners, null, 2)}</pre>
                        </ScrollArea>
                    </TabsContent>
                </div>
            </Tabs>
          )}
        </div>
        <DialogFooter className="mt-4 flex-shrink-0">
            <Button onClick={handleFetchData} disabled={isLoading} variant="secondary">
                {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
            <DialogClose asChild>
                <Button>Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
