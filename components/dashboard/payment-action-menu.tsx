'use client';

import { toast } from 'sonner';
import { ActionMenu } from './action-menu';

export function PaymentActionMenu({ label }: { label: string }) {
  return (
    <ActionMenu
      label={label}
      onView={() => toast.success(`Viewing ${label}`)}
      onDelete={() => toast.success(`Delete review opened for ${label}`)}
    />
  );
}
