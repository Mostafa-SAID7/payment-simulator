'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const paymentSchema = z.object({
  paymentType: z.enum(['ACH', 'RTGS', 'WPS']),
  recipientName: z.string().min(1, 'Recipient name is required'),
  recipientAccount: z.string().min(8, 'Account number must be at least 8 characters'),
  recipientBank: z.string().min(1, 'Bank code is required'),
  amount: z.string().refine(
    (val) => !Number.isNaN(parseFloat(val)) && parseFloat(val) > 0,
    'Amount must be a positive number'
  ),
  description: z.string().max(100, 'Description must be 100 characters or less'),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentType: 'ACH',
      recipientName: '',
      recipientAccount: '',
      recipientBank: '',
      amount: '',
      description: '',
    },
  });

  async function onSubmit(values: PaymentFormValues) {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Payment submitted:', values);
      // Reset form on success
      form.reset();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Initiate Payment</CardTitle>
        <CardDescription>
          Enter payment details to process a new transaction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Payment Type */}
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACH">ACH (Automated Clearing House)</SelectItem>
                      <SelectItem value="RTGS">RTGS (Real-Time Gross Settlement)</SelectItem>
                      <SelectItem value="WPS">WPS (Wire Payment System)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Recipient Information */}
            <div className="space-y-4 rounded-lg bg-secondary/30 p-4">
              <h3 className="font-semibold text-foreground">Recipient Information</h3>
              
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" className="bg-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipientAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" className="bg-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipientBank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Code</FormLabel>
                    <FormControl>
                      <Input placeholder="BANK123" className="bg-input" {...field} />
                    </FormControl>
                    <FormDescription>SWIFT or routing number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Amount and Description */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="10000.00" type="number" step="0.01" className="bg-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Payment for services" className="bg-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Processing...' : 'Submit Payment'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
