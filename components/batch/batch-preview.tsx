'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export interface BatchPreviewRow {
  lineNumber: number;
  recipient: string;
  accountNumber: string;
  bankCode: string;
  amount: number;
  description: string;
}

export function BatchPreview({ rows }: { rows: BatchPreviewRow[] }) {
  return (
    <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
      <CardHeader className="px-4 pt-4 pb-3 border-b border-border/60">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">Transaction Preview</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Review the records detected in your CSV before processing.</p>
          </div>
          <Badge variant="outline" className="text-[10px] shrink-0">{rows.length} records</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="w-full text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>Line</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Bank Code</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.lineNumber}>
                  <TableCell className="text-muted-foreground tabular-nums">{row.lineNumber}</TableCell>
                  <TableCell className="font-medium text-foreground">{row.recipient}</TableCell>
                  <TableCell>{row.accountNumber}</TableCell>
                  <TableCell>{row.bankCode}</TableCell>
                  <TableCell className="text-right">${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{row.description || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
