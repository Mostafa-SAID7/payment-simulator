'use client';

import { useEffect, useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in bytes
  resetSignal?: number;
}

export function FileUpload({ onFileSelect, accept = '.csv', maxSize = 5242880, resetSignal = 0 }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [resetSignal]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);

    if (file.size > maxSize) {
      setError(`File size exceeds ${(maxSize / 1024 / 1024).toFixed(0)}MB limit`);
      return;
    }

    const validExtensions = accept.split(',').map((ext) => ext.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setError(`Invalid file type. Accepted types: ${accept}`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'batch-dropzone relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed px-6 py-9 transition-colors',
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border bg-secondary/30 hover:bg-secondary/50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          aria-hidden="true"
        />

        <div className="text-center">
          <Upload className="mx-auto h-8 w-8 text-primary/50" />
          <p className="mt-2 text-xs font-medium text-foreground">Drag and drop your file</p>
          <p className="text-sm text-muted-foreground">or click to select</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {accept === '.csv' ? 'CSV files up to 5MB' : `${accept} files up to ${(maxSize / 1024 / 1024).toFixed(0)}MB`}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {selectedFile && (
        <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
          <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
