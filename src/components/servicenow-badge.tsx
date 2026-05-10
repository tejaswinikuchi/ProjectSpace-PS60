import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Workflow, Zap, Webhook, Database, Bot, type LucideIcon } from "lucide-react";

type Variant = "synced" | "flow" | "predictive" | "hub" | "agent";

const map: Record<Variant, { icon: LucideIcon; label: string; tone: string }> = {
  synced:     { icon: Database, label: "Now Platform Connected",       tone: "border-info/30 bg-info/10 text-info" },
  flow:       { icon: Workflow, label: "Flow Designer Triggered",      tone: "border-primary/30 bg-primary/10 text-primary" },
  predictive: { icon: Zap,      label: "Predictive Intelligence",      tone: "border-warning/30 bg-warning/10 text-warning" },
  hub:        { icon: Webhook,  label: "Synced via IntegrationHub",    tone: "border-info/30 bg-info/10 text-info" },
  agent:      { icon: Bot,      label: "Virtual Agent",                tone: "border-primary/30 bg-primary/10 text-primary" },
};

export function ServiceNowBadge({
  variant = "synced", label, className,
}: { variant?: Variant; label?: string; className?: string }) {
  const cfg = map[variant];
  const Icon = cfg.icon;
  return (
    <Badge variant="outline" className={cn("gap-1.5 font-normal", cfg.tone, className)}>
      <Icon className="h-3 w-3" />
      {label ?? cfg.label}
    </Badge>
  );
}
