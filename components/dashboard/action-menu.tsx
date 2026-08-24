'use client';

import { useState } from 'react';
import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ActionMenu({ label, onView, onEdit, onDuplicate, onDelete }: { label: string; onView?: () => void; onEdit?: () => void; onDuplicate?: () => void; onDelete?: () => void }) {
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 rounded-lg border border-border/40 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label={`More actions for ${label}`}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {onView && <DropdownMenuItem onSelect={() => setViewOpen(true)}><Eye /> View details</DropdownMenuItem>}
          {onEdit && <DropdownMenuItem onSelect={onEdit}><Pencil /> Edit</DropdownMenuItem>}
          {onDuplicate && <DropdownMenuItem onSelect={onDuplicate}><Copy /> Duplicate</DropdownMenuItem>}
          {onDelete && <><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onSelect={() => setDeleteOpen(true)}><Trash2 /> Delete</DropdownMenuItem></>}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="border-border/60 bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
            <DialogDescription>Review this record before taking another action.</DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-border/50 bg-background/60 px-4 py-3 text-sm text-muted-foreground">This record is available in your FinPay workspace. Choose Edit from the action menu to make changes.</div>
          <DialogFooter><Button variant="outline" onClick={() => setViewOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="border-border/60 bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {label}?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. The record will be removed from this workspace.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={onDelete}>Delete permanently</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
