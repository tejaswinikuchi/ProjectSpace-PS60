import { Bell, AlertTriangle, Sparkles, MessageSquare, Workflow, CheckCircle2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type N = { i: LucideIcon; t: string; d: string; w: string; tone: string };

const items: N[] = [
  { i: AlertTriangle, t: "Critical churn risk escalated",   d: "Northwind Labs · score 92",            w: "2m",  tone: "text-destructive" },
  { i: Sparkles,      t: "AI recommendation generated",     d: "Helios Banking · 96% confidence",      w: "9m",  tone: "text-primary" },
  { i: MessageSquare, t: "Zendesk ticket spike detected",   d: "Acme Retail · +320% in 24h",           w: "27m", tone: "text-warning" },
  { i: Workflow,      t: "IntegrationHub sync completed",   d: "1,030 records · 1.4s",                 w: "1h",  tone: "text-info" },
  { i: AlertTriangle, t: "Workflow execution failed",       d: "WF-1118 · retrying step 3",            w: "2h",  tone: "text-destructive" },
  { i: CheckCircle2,  t: "Renewal saved",                   d: "Forge Logistics · $140k ARR",          w: "3h",  tone: "text-success" },
];

export function NotificationCenter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[360px] p-0">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Notifications</p>
            <p className="text-[11px] text-muted-foreground">Live · ServiceNow event stream</p>
          </div>
          <Badge variant="outline" className="border-success/30 bg-success/10 text-success text-[10px]">6 new</Badge>
        </div>
        <div className="max-h-[360px] overflow-y-auto">
          {items.map((n, idx) => (
            <div key={idx} className="flex gap-3 border-b border-border/40 px-4 py-3 last:border-0 hover:bg-secondary/30">
              <div className={`mt-0.5 ${n.tone}`}><n.i className="h-4 w-4" /></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{n.t}</p>
                <p className="truncate text-xs text-muted-foreground">{n.d}</p>
              </div>
              <span className="text-[10px] text-muted-foreground">{n.w}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border/60 px-3 py-2 text-center">
          <Button variant="ghost" size="sm" className="h-7 w-full text-xs">View all activity</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
