'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, XCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface BatchResult {
  id: string;
  recipient: string;
  amount: number;
  status: 'success' | 'failed';
  message?: string;
}

interface BatchResultsProps {
  results: BatchResult[];
  batchName: string;
}

export function BatchResults({ results, batchName }: BatchResultsProps) {
  const handleExport = () => {
    const csv = [
      ['ID', 'Recipient', 'Amount', 'Status', 'Message'],
      ...results.map((r) => [
        r.id,
        r.recipient,
        r.amount.toString(),
        r.status,
        r.message || '',
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-results-${batchName}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const successCount = results.filter((r) => r.status === 'success').length;
  const failedCount = results.filter((r) => r.status === 'failed').length;

  return (
    <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
      <CardHeader className="px-4 pt-4 pb-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">Batch Results</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {successCount} successful, {failedCount} failed out of {results.length} transactions
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2 h-8 text-xs"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="w-full text-xs">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium text-foreground">{result.id}</TableCell>
                  <TableCell className="text-foreground">{result.recipient}</TableCell>
                  <TableCell className="text-right text-foreground">
                    ${(result.amount / 1000).toFixed(1)}K
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {result.status === 'success' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-success" />
                          <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-[10px]">
                            Success
                          </Badge>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-destructive" />
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px]">Failed</Badge>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {result.message || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
