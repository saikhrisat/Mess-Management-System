
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check } from 'lucide-react';

interface CopyableTextProps {
  text: string;
  label: string;
}

export function CopyableText({ text, label }: CopyableTextProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      description: `${label} copied to clipboard.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between space-x-2 rounded-md border bg-muted/50 p-3">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-muted-foreground">{label}</span>
        <span className="font-mono text-base sm:text-lg">{text}</span>
      </div>
      <Button variant="ghost" size="icon" onClick={onCopy} className="shrink-0">
        {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
        <span className="sr-only">Copy {label}</span>
      </Button>
    </div>
  );
}
