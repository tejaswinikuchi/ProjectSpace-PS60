import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  trend?: number[];
  icon?: ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}

const toneRing: Record<string, string> = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
  info: "text-info",
};

export function KpiCard({ label, value, delta, hint, trend, icon, tone = "default" }: KpiCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Card className="glass relative overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className={cn("mt-2 text-2xl font-semibold tracking-tight", toneRing[tone])}>{value}</p>
        </div>
        {icon && <div className="rounded-lg bg-secondary/60 p-2 text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-3 flex items-center justify-between">
        {typeof delta === "number" ? (
          <div className={cn("inline-flex items-center gap-1 text-xs font-medium",
            positive ? "text-success" : "text-destructive")}>
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
            {hint && <span className="ml-1 text-muted-foreground font-normal">{hint}</span>}
          </div>
        ) : <span className="text-xs text-muted-foreground">{hint}</span>}
        {trend && <Sparkline data={trend} positive={positive} />}
      </div>
    </Card>
  );
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const w = 80, h = 24;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(1, max - min)) * h;
    return `${x},${y}`;
  }).join(" ");
  const color = positive ? "var(--color-success)" : "var(--color-destructive)";
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} />
    </svg>
  );
}
