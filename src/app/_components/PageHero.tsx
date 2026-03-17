import { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const PageHero = ({
  eyebrow,
  title,
  description,
  aside,
  children,
  className,
}: PageHeroProps) => {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[32px] border border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_34%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.82))] p-6 text-white shadow-sm md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <Badge
            variant="outline"
            className="border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white"
          >
            {eyebrow}
          </Badge>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="max-w-xl text-sm leading-6 text-white/72 md:text-base">
              {description}
            </p>
          </div>
        </div>
        {aside ? <div className="w-full max-w-md">{aside}</div> : null}
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
};
