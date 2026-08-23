'use client';

import { useMemo, useState } from 'react';
import {
  AlertCircle,
  CircleDollarSign,
  FileCheck2,
  LoaderCircle,
  Play,
  RotateCcw,
  Rows3,
  ShieldCheck,
} from 'lucide-react';
import { FileUpload } from '@/components/batch/file-upload';
import { BatchPreview, type BatchPreviewRow } from '@/components/batch/batch-preview';
import { BatchProgress } from '@/components/batch/batch-progress';
import { BatchResults } from '@/components/batch/batch-results';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';

interface BatchResult {
  id: string;
  recipient: string;
  amount: number;
  status: 'success' | 'failed';
  message?: string;
}

const requiredColumns = ['recipient_name', 'account_number', 'bank_code', 'amount', 'description'];

function parseCsvLine(line: string) {
  const values: string[] = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      values.push(value.trim());
      value = '';
    } else {
      value += character;
    }
  }

  values.push(value.trim());
  return values;
}

function parseBatchCsv(content: string): BatchPreviewRow[] {
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) throw new Error('Add at least one transaction row to your CSV file.');

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase().replace(/\s+/g, '_'));
  const missingColumns = requiredColumns.filter((column) => !headers.includes(column));
  if (missingColumns.length > 0) throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);

  return lines.slice(1).map((line, rowIndex) => {
    const values = parseCsvLine(line);
    const record = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
    const amount = Number(record.amount.replace(/[$,]/g, ''));

    if (!record.recipient_name || !record.account_number || !record.bank_code || !Number.isFinite(amount) || amount <= 0) {
      throw new Error(`Check the values on CSV line ${rowIndex + 2}. Recipient, account, bank code, and a positive amount are required.`);
    }

    return {
      lineNumber: rowIndex + 2,
      recipient: record.recipient_name,
      accountNumber: record.account_number,
      bankCode: record.bank_code,
      amount,
      description: record.description,
    };
  });
}

export default function BatchPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<BatchPreviewRow[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ total: 0, processed: 0, successful: 0, failed: 0 });
  const [results, setResults] = useState<BatchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const totalAmount = useMemo(
    () => previewRows.reduce((total, row) => total + row.amount, 0),
    [previewRows]
  );

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setPreviewRows([]);
    setValidationError(null);
    setShowResults(false);
    setResults([]);
    setIsParsing(true);

    try {
      setPreviewRows(parseBatchCsv(await file.text()));
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : 'Unable to read this CSV file.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewRows([]);
    setValidationError(null);
    setResetSignal((value) => value + 1);
  };

  const handleProcessBatch = async () => {
    if (previewRows.length === 0) return;

    const processingResults: BatchResult[] = previewRows.map((row, index) => ({
      id: `TRX-${String(index + 1).padStart(3, '0')}`,
      recipient: row.recipient,
      amount: row.amount,
      status: index % 7 === 3 ? 'failed' : 'success',
      message: index % 7 === 3 ? 'Payment requires review' : undefined,
    }));

    setIsProcessing(true);
    setShowResults(false);
    setProgress({ total: processingResults.length, processed: 0, successful: 0, failed: 0 });

    for (let index = 0; index < processingResults.length; index += 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = processingResults[index];
      setProgress((previous) => ({
        total: processingResults.length,
        processed: index + 1,
        successful: previous.successful + (result.status === 'success' ? 1 : 0),
        failed: previous.failed + (result.status === 'failed' ? 1 : 0),
      }));
    }

    setResults(processingResults);
    setShowResults(true);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewRows([]);
    setValidationError(null);
    setProgress({ total: 0, processed: 0, successful: 0, failed: 0 });
    setResults([]);
    setShowResults(false);
    setResetSignal((value) => value + 1);
  };

  return (
    <div className="batch-page page-stack compact-route-page">
      <PageHeader
        title="Batch Processing"
        description="Review, validate, and process multiple payments from one CSV file"
      />

      <div className="batch-format-note flex gap-3 rounded-lg border border-accent/30 bg-accent/10 p-4">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-accent" />
        <div>
          <p className="font-medium text-foreground">CSV Format Required</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Required columns: recipient_name, account_number, bank_code, amount, description
          </p>
        </div>
      </div>

      <section className="batch-summary-grid" aria-label="Batch overview">
        <Card className="dashboard-card batch-summary-card">
          <CardContent className="batch-summary-content">
            <span className="batch-summary-icon"><FileCheck2 /></span>
            <span><small>File status</small><strong>{selectedFile ? (validationError ? 'Needs review' : 'Ready') : 'Awaiting upload'}</strong></span>
          </CardContent>
        </Card>
        <Card className="dashboard-card batch-summary-card">
          <CardContent className="batch-summary-content">
            <span className="batch-summary-icon"><Rows3 /></span>
            <span><small>Records detected</small><strong>{previewRows.length || '—'}</strong></span>
          </CardContent>
        </Card>
        <Card className="dashboard-card batch-summary-card">
          <CardContent className="batch-summary-content">
            <span className="batch-summary-icon"><CircleDollarSign /></span>
            <span><small>Total amount</small><strong>{totalAmount ? `$${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}</strong></span>
          </CardContent>
        </Card>
        <Card className="dashboard-card batch-summary-card">
          <CardContent className="batch-summary-content">
            <span className="batch-summary-icon"><ShieldCheck /></span>
            <span><small>File limit</small><strong>5 MB CSV</strong></span>
          </CardContent>
        </Card>
      </section>

      {!showResults ? (
        <div className="batch-workflow space-y-3">
          <Card className="dashboard-card compact-settings-card">
            <CardHeader className="compact-card-header">
              <CardTitle className="compact-panel-title">Upload Batch File</CardTitle>
              <p className="compact-panel-description">Select a CSV file to validate its structure and preview each payment record.</p>
            </CardHeader>
            <CardContent className="compact-card-content space-y-3">
              <FileUpload
                onFileSelect={handleFileSelect}
                accept=".csv"
                maxSize={5242880}
                resetSignal={resetSignal}
              />

              {isParsing && (
                <div className="batch-inline-status"><LoaderCircle className="animate-spin" /> Reading and validating CSV...</div>
              )}
              {validationError && (
                <div className="batch-validation-error"><AlertCircle />{validationError}</div>
              )}
              {selectedFile && !isParsing && previewRows.length > 0 && (
                <div className="batch-file-actions">
                  <Button onClick={handleProcessBatch} disabled={isProcessing} className="compact-primary-button">
                    <Play /> {isProcessing ? 'Processing...' : `Process ${previewRows.length} payments`}
                  </Button>
                  <Button variant="outline" onClick={handleClearFile} disabled={isProcessing} className="compact-secondary-button">
                    <RotateCcw /> Replace file
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedFile && !isParsing && previewRows.length > 0 && <BatchPreview rows={previewRows} />}

          {isProcessing && (
            <BatchProgress
              total={progress.total}
              processed={progress.processed}
              successful={progress.successful}
              failed={progress.failed}
              status="processing"
            />
          )}
        </div>
      ) : (
        <div className="batch-workflow space-y-3">
          <BatchProgress
            total={progress.total}
            processed={progress.processed}
            successful={progress.successful}
            failed={progress.failed}
            status="completed"
          />
          <BatchResults results={results} batchName={selectedFile?.name || 'batch'} />
          <div className="batch-result-actions">
            <Button size="sm" onClick={handleReset} className="compact-primary-button">Process Another Batch</Button>
            <Button variant="outline" size="sm" className="compact-secondary-button">View Audit Log</Button>
          </div>
        </div>
      )}
    </div>
  );
}
