'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/batch/file-upload';
import { BatchProgress } from '@/components/batch/batch-progress';
import { BatchResults } from '@/components/batch/batch-results';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface BatchResult {
  id: string;
  recipient: string;
  amount: number;
  status: 'success' | 'failed';
  message?: string;
}

export default function BatchPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ total: 0, processed: 0, successful: 0, failed: 0 });
  const [results, setResults] = useState<BatchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setShowResults(false);
    setResults([]);
  };

  const handleProcessBatch = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress({ total: 10, processed: 0, successful: 0, failed: 0 });

    // Simulate reading CSV and processing
    const mockResults: BatchResult[] = [
      { id: 'TRX-001', recipient: 'Acme Corp', amount: 25000, status: 'success' },
      { id: 'TRX-002', recipient: 'Tech Inc', amount: 50000, status: 'success' },
      { id: 'TRX-003', recipient: 'Global Ent', amount: 75000, status: 'success' },
      { id: 'TRX-004', recipient: 'Local LLC', amount: 15000, status: 'failed', message: 'Invalid account number' },
      { id: 'TRX-005', recipient: 'Startup Co', amount: 30000, status: 'success' },
      { id: 'TRX-006', recipient: 'Enterprise X', amount: 100000, status: 'failed', message: 'Insufficient balance' },
      { id: 'TRX-007', recipient: 'Business Y', amount: 45000, status: 'success' },
      { id: 'TRX-008', recipient: 'Company Z', amount: 60000, status: 'success' },
      { id: 'TRX-009', recipient: 'Service Pro', amount: 22000, status: 'failed', message: 'Bank code invalid' },
      { id: 'TRX-010', recipient: 'Solutions Ltd', amount: 55000, status: 'success' },
    ];

    // Simulate processing with progress updates
    for (let i = 0; i < mockResults.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = mockResults[i];
      const successful = result.status === 'success' ? 1 : 0;

      setProgress((prev) => ({
        total: mockResults.length,
        processed: i + 1,
        successful: prev.successful + successful,
        failed: prev.failed + (1 - successful),
      }));
    }

    setResults(mockResults);
    setShowResults(true);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setProgress({ total: 0, processed: 0, successful: 0, failed: 0 });
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Batch Processing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Process multiple payments at once with CSV file upload
        </p>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
        <div>
          <p className="font-medium text-yellow-900 dark:text-yellow-200">CSV Format Required</p>
          <p className="mt-1 text-sm text-yellow-800 dark:text-yellow-300">
            Your CSV file should contain columns: recipient_name, account_number, bank_code, amount, description
          </p>
        </div>
      </div>

      {!showResults ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Upload Batch File</CardTitle>
                <CardDescription>
                  Upload a CSV file containing payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FileUpload onFileSelect={handleFileSelect} accept=".csv" maxSize={5242880} />

                {selectedFile && (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleProcessBatch}
                      disabled={isProcessing}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {isProcessing ? 'Processing...' : 'Process Batch'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFile(null)}
                      disabled={isProcessing}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progress Section */}
          {isProcessing && (
            <div className="lg:col-span-1">
              <BatchProgress
                total={progress.total}
                processed={progress.processed}
                successful={progress.successful}
                failed={progress.failed}
                status={isProcessing ? 'processing' : 'idle'}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <BatchProgress
            total={progress.total}
            processed={progress.processed}
            successful={progress.successful}
            failed={progress.failed}
            status="completed"
          />

          <BatchResults results={results} batchName={selectedFile?.name || 'batch'} />

          <div className="flex gap-3">
            <Button onClick={handleReset} className="bg-primary hover:bg-primary/90">
              Process Another Batch
            </Button>
            <Button variant="outline">View Audit Log</Button>
          </div>
        </div>
      )}
    </div>
  );
}
