import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceNowBadge } from "@/components/servicenow-badge";
import {
  AlertTriangle, BrainCircuit, BellRing, UserCheck, PhoneCall,
  Gift, Trophy, ChevronRight, Bot, CheckCircle2, XCircle, RefreshCw, Clock,
} from "lucide-react";

export const Route = createFileRoute("/workflows")({
  head: () => ({ meta: [{ title: "Retention Workflows — Retain.AI" }] }),
  component: Workflows,
});

const stages = [
  { i: AlertTriangle, t: "Risk Detected",       d: "Predictive model flags account",                  auto: true,  count: 142 },
  { i: BrainCircuit,  t: "AI Analysis",         d: "GPT-4 explains drivers + recommends action",      auto: true,  count: 142 },
  { i: BellRing,      t: "Alert Triggered",     d: "Notification routed in ServiceNow",               auto: true,  count: 138 },
  { i: UserCheck,     t: "Task Assigned",       d: "CSM owner picked from rules",                     auto: true,  count: 134 },
  { i: PhoneCall,     t: "Customer Contacted",  d: "Outreach call or email logged",                   auto: false, count: 121 },
  { i: Gift,          t: "Offer Sent",          d: "Discount or success plan delivered",              auto: false, count: 96  },
  { i: Trophy,        t: "Outcome Recorded",    d: "Renewal, churn, or in progress",                  auto: false, count: 84  },
];

const liveRuns = [
  { id: "WF-1124", customer: "Northwind Labs",   stage: 3, started: "12 min ago", owner: "A. Mehra",  sla: "On track" },
  { id: "WF-1123", customer: "Helios Banking",   stage: 5, started: "42 min ago", owner: "S. Kapoor", sla: "On track" },
  { id: "WF-1122", customer: "Acme Retail",      stage: 4, started: "1h ago",     owner: "J. Lopez",  sla: "At risk" },
  { id: "WF-1121", customer: "Vector Health",    stage: 6, started: "3h ago",     owner: "R. Chen",   sla: "On track" },
  { id: "WF-1120", customer: "Forge Logistics",  stage: 7, started: "yesterday",  owner: "P. Singh",  sla: "Met" },
];

const executionLog = [
  { t: "12:42:08", e: "WF-1124 · stage 3 entered",      tag: "info",    d: "Notification routed to A. Mehra (P1 queue)" },
  { t: "12:41:51", e: "GPT-4 recommendation generated", tag: "primary", d: "3 actions returned · confidence 96%" },
  { t: "12:41:49", e: "Predictive Intelligence scored",  tag: "info",    d: "Northwind Labs · risk 92 (+11 vs baseline)" },
  { t: "12:38:12", e: "WF-1118 · step 3 failed",         tag: "danger",  d: "REST 502 from Zendesk · auto-retry queued" },
  { t: "12:36:04", e: "Renewal offer sent",              tag: "success", d: "Helios Banking · 12% discount via DocuSign" },
  { t: "12:34:57", e: "IntegrationHub sync",             tag: "info",    d: "1,030 customer records · 1.4s" },
  { t: "12:31:22", e: "Flow Designer playbook started",  tag: "primary", d: "Acme Retail · Premium Support Upgrade" },
];

const tagMap = {
  info:    "border-info/30 bg-info/10 text-info",
  primary: "border-primary/30 bg-primary/10 text-primary",
  danger:  "border-destructive/30 bg-destructive/10 text-destructive",
  success: "border-success/30 bg-success/10 text-success",
} as const;

function Workflows() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Retention workflows</h1>
          <p className="text-sm text-muted-foreground">Built in ServiceNow Flow Designer · 7-stage pipeline</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ServiceNowBadge variant="flow" />
          <ServiceNowBadge variant="hub" label="IntegrationHub · healthy" />
          <Button size="sm">New playbook</Button>
        </div>
      </div>

      <Card className="glass p-5">
        <div className="grid gap-2 md:grid-cols-7">
          {stages.map((s, i) => (
            <div key={s.t} className="relative">
              <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <s.i className="h-4 w-4" />
                  </div>
                  {s.auto && <Badge variant="outline" className="border-info/30 bg-info/10 text-info gap-1 text-[10px]"><Bot className="h-3 w-3" />Auto</Badge>}
                </div>
                <p className="mt-3 text-xs font-medium">Stage {i + 1}</p>
                <p className="text-sm font-semibold">{s.t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
                <p className="mt-3 text-xs"><span className="font-semibold">{s.count}</span> <span className="text-muted-foreground">active</span></p>
              </div>
              {i < stages.length - 1 && (
                <ChevronRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground md:block" />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Live workflow runs</h3>
              <p className="text-xs text-muted-foreground">Currently in progress · SLA tracked</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1.5"><RefreshCw className="h-3.5 w-3.5" />Refresh</Button>
          </div>
          <div className="mt-4 space-y-3">
            {liveRuns.map((r) => (
              <div key={r.id} className="rounded-lg border border-border/60 bg-background/40 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{r.customer} <span className="ml-2 text-xs text-muted-foreground">{r.id}</span></p>
                    <p className="text-xs text-muted-foreground">Owner {r.owner} · started {r.started}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={
                      r.sla === "Met" ? "border-success/30 bg-success/10 text-success text-[10px] gap-1" :
                      r.sla === "At risk" ? "border-warning/30 bg-warning/10 text-warning text-[10px] gap-1" :
                      "border-border/70 bg-secondary/40 text-[10px] gap-1"
                    }><Clock className="h-2.5 w-2.5" />SLA {r.sla}</Badge>
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Stage {r.stage} · {stages[r.stage - 1].t}</Badge>
                  </div>
                </div>
                <div className="mt-3 flex gap-1">
                  {stages.map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i < r.stage ? "bg-primary" : "bg-secondary"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass p-5">
          <h3 className="text-sm font-medium">Automation health</h3>
          <p className="text-xs text-muted-foreground">Last 24h</p>
          <div className="mt-4 space-y-3 text-sm">
            <Row k="Triggers fired" v="284" />
            <Row k="Successful runs" v="271" tone="text-success" />
            <Row k="Failed / retried" v="13" tone="text-warning" />
            <Row k="Avg latency" v="1.8s" />
            <Row k="Active playbooks" v="12" />
            <Row k="SLA breach" v="2" tone="text-destructive" />
          </div>
        </Card>
      </div>

      <Card className="glass mt-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">Flow Designer execution log</h3>
            <p className="text-xs text-muted-foreground">Last 30 events · streamed from ServiceNow</p>
          </div>
          <ServiceNowBadge variant="flow" label="Live stream" />
        </div>
        <div className="mt-4 space-y-1.5">
          {executionLog.map((l, i) => (
            <div key={i} className="grid grid-cols-[80px_120px_1fr] items-center gap-3 rounded-md border border-border/40 bg-background/30 px-3 py-2 font-mono text-xs">
              <span className="text-muted-foreground">{l.t}</span>
              <Badge variant="outline" className={`${tagMap[l.tag as keyof typeof tagMap]} w-fit gap-1`}>
                {l.tag === "danger" ? <XCircle className="h-3 w-3" /> : l.tag === "success" ? <CheckCircle2 className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                {l.e.split(" · ")[0]}
              </Badge>
              <span><span className="font-medium">{l.e}</span> <span className="text-muted-foreground">— {l.d}</span></span>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}

function Row({ k, v, tone }: { k: string; v: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{k}</span>
      <span className={`font-medium ${tone ?? ""}`}>{v}</span>
    </div>
  );
}
