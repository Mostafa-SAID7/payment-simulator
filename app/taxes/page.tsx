'use client';

import {
  FileText,
  Download,
  Receipt,
  Landmark,
  Calculator,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const taxDocuments = [
  { name: '1099-K Form 2024', type: 'Annual Form', date: 'Jan 31, 2025', size: '1.2 MB', status: 'Available' },
  { name: 'Q4 2024 Tax Summary', type: 'Quarterly', date: 'Jan 15, 2025', size: '0.8 MB', status: 'Available' },
  { name: 'Q3 2024 Tax Summary', type: 'Quarterly', date: 'Oct 15, 2024', size: '0.7 MB', status: 'Available' },
  { name: 'W-9 Form (Updated)', type: 'Legal', date: 'May 12, 2024', size: '2.1 MB', status: 'Verified' },
];

const statusStyles: Record<string, string> = {
  Available: 'bg-success/10 text-success border-success/30',
  Verified: 'bg-primary/10 text-primary border-primary/30',
  Pending: 'bg-warning/10 text-warning border-warning/30',
};

const metrics = [
  { label: 'Estimated Tax', value: '$124,500.00', icon: Calculator, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Tax Collected', value: '$84,200.00', icon: Receipt, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Withheld', value: '$40,300.00', icon: Landmark, color: 'text-warning', bg: 'bg-warning/10' },
];

export default function TaxesPage() {
  return (
    <div className="flex flex-col gap-3 pb-4">

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3" aria-label="Tax metrics">
        {metrics.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
            <CardContent className="flex items-center gap-4 py-4 px-5">
              <span className={cn("inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0", bg, color)}>
                <Icon className="w-5 h-5" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-muted-foreground font-medium">{label}</span>
                <strong className="text-2xl font-bold text-foreground">{value}</strong>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-xs font-semibold text-foreground/80">
            Tax Documents
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8 text-xs">
            <Download className="w-3.5 h-3.5 mr-1" /> Download All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/60 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-muted-foreground">
                  <th>Document</th><th>Type</th><th>Date</th><th>Size</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {taxDocuments.map((doc, index) => (
                  <tr key={`${doc.name}-${index}`} className="border-b border-border/40 hover:bg-secondary/30 transition-colors [&_td]:px-4 [&_td]:py-3">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/50 text-muted-foreground shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <strong className="font-semibold text-foreground truncate">{doc.name}</strong>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{doc.type}</td>
                    <td className="text-muted-foreground">{doc.date}</td>
                    <td className="text-muted-foreground">{doc.size}</td>
                    <td>
                      <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold', statusStyles[doc.status])}>
                        {doc.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-muted-foreground hover:text-foreground">
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
