import { cn } from "@/lib/utils";
import type { RiskCategory } from "@/lib/mock-data";

const map: Record<RiskCategory, string> = {
  Low: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  High: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Critical: "bg-destructive/15 text-destructive border-destructive/30",
};

export function RiskBadge({ level, className }: { level: RiskCategory; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
      map[level], className,
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}
