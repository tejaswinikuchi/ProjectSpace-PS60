import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, ArrowRight, Sparkles, FileText } from "lucide-react";
import { interventions } from "@/lib/mock-data";
import { ServiceNowBadge } from "@/components/servicenow-badge";

export const Route = createFileRoute("/interventions")({
  head: () => ({ meta: [{ title: "Interventions — Retain.AI" }] }),
  component: Interventions,
});

const outcomeMap = {
  Renewed: { icon: CheckCircle2, c: "text-success border-success/30 bg-success/10" },
  Churned: { icon: XCircle, c: "text-destructive border-destructive/30 bg-destructive/10" },
  "In Progress": { icon: Clock, c: "text-warning border-warning/30 bg-warning/10" },
} as const;

function Interventions() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Intervention tracking</h1>
          <p className="text-sm text-muted-foreground">Outcomes for actions taken on at-risk accounts</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ServiceNowBadge variant="flow" label="Flow Designer · 12 active" />
          <Button variant="outline" size="sm" className="gap-1.5"><FileText className="h-3.5 w-3.5" />Export log</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Total interventions</p><p className="mt-2 text-3xl font-semibold">128</p><p className="mt-1 text-xs text-muted-foreground">Last 90 days</p></Card>
        <Card className="glass p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Renewed</p><p className="mt-2 text-3xl font-semibold text-success">87</p><p className="mt-1 text-xs text-muted-foreground">68% success</p></Card>
        <Card className="glass p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">In progress</p><p className="mt-2 text-3xl font-semibold text-warning">29</p><p className="mt-1 text-xs text-muted-foreground">Avg 11 days open</p></Card>
        <Card className="glass p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">AI followed</p><p className="mt-2 text-3xl font-semibold text-info">81%</p><p className="mt-1 text-xs text-muted-foreground">Of recommendations</p></Card>
      </div>

      <Card className="glass mt-6 p-5">
        <h3 className="text-sm font-medium">Recent interventions</h3>
        <ol className="mt-5 space-y-5">
          {interventions.map((i) => {
            const oc = outcomeMap[i.outcome as keyof typeof outcomeMap];
            const Icon = oc.icon;
            const delta = i.before - i.after;
            return (
              <li key={i.id} className="rounded-xl border border-border/60 bg-background/40 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${oc.c}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{i.customer} <span className="ml-2 text-xs text-muted-foreground">{i.id}</span></p>
                      <p className="text-xs text-muted-foreground">{i.action} · {i.manager} · {i.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary gap-1.5"><Sparkles className="h-3 w-3" />AI followed</Badge>
                    <Badge variant="outline" className={oc.c}>{i.outcome}</Badge>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg border border-border/60 bg-secondary/30 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk before</p>
                    <p className="mt-1 text-xl font-semibold text-destructive">{i.before}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-secondary/30 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk after</p>
                    <div className="mt-1 flex items-center gap-2">
                      <p className={`text-xl font-semibold ${i.after < i.before ? "text-success" : "text-destructive"}`}>{i.after}</p>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className={`text-xs ${delta > 0 ? "text-success" : "text-destructive"}`}>
                        {delta > 0 ? "−" : "+"}{Math.abs(delta)} pts
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-secondary/30 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Manager notes</p>
                    <p className="mt-1 text-xs">{i.notes}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Card>
    </AppShell>
  );
}
