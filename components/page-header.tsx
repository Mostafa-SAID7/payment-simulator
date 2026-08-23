import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <header className={cn('flex min-h-14 flex-col items-start gap-3 border-b border-border/60 px-1 pb-3 md:flex-row md:items-end md:justify-between md:gap-6', className)}>
      <div className="min-w-0 flex-1">
        <h1 className="flex min-w-0 items-center truncate text-xl font-semibold leading-tight tracking-tight text-foreground before:mr-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_11%,transparent)] md:text-xl">
          {title}
        </h1>
        {description && <p className="mt-2 max-w-3xl truncate text-[0.625rem] leading-relaxed text-muted-foreground/85 md:text-sm">{description}</p>}
      </div>
      {actions && <div className="flex w-full shrink-0 items-center gap-2 md:w-auto">{actions}</div>}
    </header>
  );
}
