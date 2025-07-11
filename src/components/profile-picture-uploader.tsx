
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, X, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ProfilePictureUploaderProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUploadComplete: () => void;
}

export function ProfilePictureUploader({ isOpen, onOpenChange, onUploadComplete }: ProfilePictureUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [existingAvatar, setExistingAvatar] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setExistingAvatar(localStorage.getItem('studentAvatar'));
    }
  }, [isOpen]);


  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
        toast({
            title: 'File Rejected',
            description: fileRejections[0].errors[0].message,
            variant: 'destructive',
        });
        return;
    }
    
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleSave = () => {
    if (!preview) return;
    setIsLoading(true);

    // Simulate upload progress
    const interval = setInterval(() => {
        setUploadProgress(prev => {
            if (prev >= 95) return prev;
            return prev + 10;
        });
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        localStorage.setItem('studentAvatar', preview);
        window.dispatchEvent(new Event('storage'));
        toast({
            title: 'Success!',
            description: 'Your profile picture has been updated.',
        });
        setIsLoading(false);
        onUploadComplete();
        resetState();
    }, 1500);
  };
  
  const handleRemove = () => {
    setIsLoading(true);
    setTimeout(() => {
        localStorage.removeItem('studentAvatar');
        window.dispatchEvent(new Event('storage'));
        toast({
            title: 'Photo Removed',
            description: 'Your profile picture has been removed.',
        });
        setIsLoading(false);
        onUploadComplete();
        resetState();
    }, 500);
  }

  const resetState = () => {
    setFile(null);
    setPreview(null);
    setIsLoading(false);
    setUploadProgress(0);
    setExistingAvatar(null);
  };
  
  const handleClose = () => {
    if (isLoading) return;
    resetState();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] bg-card/80 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            Choose a new photo, or remove your current one.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!preview ? (
            <div
              {...getRootProps()}
              className={cn(
                'flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
                isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
              )}
            >
              <input {...getInputProps()} />
              <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="font-semibold">
                {isDragActive ? 'Drop the file here...' : 'Drag & drop a file or click to upload'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB</p>
            </div>
          ) : (
            <div className="relative w-full aspect-square max-h-[300px] mx-auto">
              <Image
                src={preview}
                alt="Image preview"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
               <Button
                variant="destructive"
                size="icon"
                className="absolute -top-3 -right-3 rounded-full h-8 w-8 z-10"
                onClick={() => { setFile(null); setPreview(null); }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          {isLoading && file && (
            <div className="mt-4 space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-center text-sm text-muted-foreground">Uploading...</p>
            </div>
          )}
        </div>
        <DialogFooter>
           {existingAvatar && !file && (
              <Button
                variant="destructive"
                className="mr-auto"
                onClick={handleRemove}
                disabled={isLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Photo
              </Button>
            )}
          <Button variant="ghost" onClick={handleClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSave} disabled={!file || isLoading}>
            {isLoading && file ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading && file ? 'Saving...' : 'Save Photo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
