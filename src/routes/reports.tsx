import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, FileSpreadsheet, CalendarClock, Plus } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — Retain.AI" }] }),
  component: Reports,
});

const reports = [
  { name: "Monthly retention summary",      desc: "KPIs, ROI, churn comparison",        date: "May 1, 2026",  size: "1.4 MB", type: "PDF" as const, kind: "Executive" },
  { name: "Executive board pack — Q1",      desc: "Slide-ready deck for leadership",    date: "Apr 12, 2026", size: "3.8 MB", type: "PDF" as const, kind: "Executive" },
  { name: "AI recommendation audit",        desc: "Confidence + outcome trail",         date: "Apr 30, 2026", size: "920 KB", type: "CSV" as const, kind: "Audit" },
  { name: "Churn cohort analysis",          desc: "Segment-by-segment breakdown",       date: "Apr 18, 2026", size: "2.1 MB", type: "PDF" as const, kind: "Analyst" },
  { name: "Customer health snapshot",       desc: "Per-account health score",           date: "Apr 28, 2026", size: "1.7 MB", type: "CSV" as const, kind: "Operations" },
  { name: "Intervention performance",       desc: "Action effectiveness by type",       date: "Apr 22, 2026", size: "1.2 MB", type: "PDF" as const, kind: "Operations" },
  { name: "Workflow execution audit",       desc: "Flow Designer run log · 90 days",    date: "Apr 30, 2026", size: "640 KB", type: "CSV" as const, kind: "Audit" },
  { name: "Quarterly forecast — Q2",        desc: "Predicted churn & ARR at risk",      date: "Apr 05, 2026", size: "2.4 MB", type: "PDF" as const, kind: "Executive" },
];

const scheduled = [
  { name: "Weekly executive digest", cadence: "Mondays · 08:00 IST",    next: "May 11", recipients: 4 },
  { name: "Daily AI recommendation audit", cadence: "Daily · 02:00 UTC", next: "Tomorrow", recipients: 2 },
  { name: "Monthly board pack", cadence: "1st of month",                 next: "Jun 01",  recipients: 6 },
];

function Reports() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground">Downloadable executive reports, audits, and scheduled exports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><CalendarClock className="h-3.5 w-3.5" />Schedule</Button>
          <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />New report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => {
          const Icon = r.type === "CSV" ? FileSpreadsheet : FileText;
          return (
            <Card key={r.name} className="glass p-5">
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${r.type === "CSV" ? "bg-success/15 text-success" : "bg-info/15 text-info"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex gap-1.5">
                  <Badge variant="outline" className="border-border/70 bg-secondary/40 text-[10px]">{r.kind}</Badge>
                  <Badge variant="outline" className="border-border/70 bg-secondary/40">{r.type}</Badge>
                </div>
              </div>
              <h3 className="mt-3 font-medium">{r.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{r.date} · {r.size}</span>
                <Button size="sm" variant="outline" className="gap-1.5"><Download className="h-3.5 w-3.5" />Download</Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="glass mt-6 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">Scheduled reports</h3>
            <p className="text-xs text-muted-foreground">Auto-delivered via email & Slack</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add schedule</Button>
        </div>
        <div className="space-y-2">
          {scheduled.map((s) => (
            <div key={s.name} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 bg-background/40 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><CalendarClock className="h-4 w-4" /></div>
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground">{s.cadence} · {s.recipients} recipients</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-info/30 bg-info/10 text-info text-[10px]">Next: {s.next}</Badge>
                <Button variant="ghost" size="sm">Manage</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
