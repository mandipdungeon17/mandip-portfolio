import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent";
};

export function Badge({
  className,
  tone = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
        tone === "accent"
          ? "border-blue-200 bg-blue-50 text-blue-800"
          : "border-slate-200 bg-white/70 text-slate-700",
        className,
      )}
      {...props}
    />
  );
}
