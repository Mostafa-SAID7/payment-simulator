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
    <Card className="dashboard-card compact-table-card batch-preview-card">
      <CardHeader className="compact-card-header">
        <div className="batch-preview-heading">
          <div>
            <CardTitle className="compact-panel-title">Transaction Preview</CardTitle>
            <p className="compact-panel-description">Review the records detected in your CSV before processing.</p>
          </div>
          <Badge variant="outline" className="batch-preview-count">{rows.length} records</Badge>
        </div>
      </CardHeader>
      <CardContent className="compact-card-content p-0">
        <div className="overflow-x-auto">
          <Table className="compact-data-table batch-preview-table">
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
                  <TableCell className="batch-preview-line">{row.lineNumber}</TableCell>
                  <TableCell className="batch-preview-recipient">{row.recipient}</TableCell>
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
