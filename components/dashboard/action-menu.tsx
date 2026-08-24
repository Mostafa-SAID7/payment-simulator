'use client';

import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function ActionMenu({
  label,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}: {
  label: string;
  onView?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-lg border border-border/40 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label={`More actions for ${label}`}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {onView && <DropdownMenuItem onSelect={onView}><Eye /> View details</DropdownMenuItem>}
        {onEdit && <DropdownMenuItem onSelect={onEdit}><Pencil /> Edit</DropdownMenuItem>}
        {onDuplicate && <DropdownMenuItem onSelect={onDuplicate}><Copy /> Duplicate</DropdownMenuItem>}
        {onDelete && <><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onSelect={onDelete}><Trash2 /> Delete</DropdownMenuItem></>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
