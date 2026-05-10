import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, TrendingDown, MessageSquare, Activity, Brain, Check, DollarSign, Target } from "lucide-react";
import { customers } from "@/lib/mock-data";
import { ServiceNowBadge } from "@/components/servicenow-badge";

export const Route = createFileRoute("/ai-insights")({
  head: () => ({ meta: [{ title: "AI Insights — Retain.AI" }] }),
  component: AIInsights,
});

const recommendations = [
  {
    customer: "Northwind Labs", risk: "Critical", score: 92, confidence: 96,
    saveProb: 74, impact: "$480k ARR", urgency: "Act within 48h",
    summary: "Customer login activity declined by 40% in the last 30 days while unresolved support tickets increased significantly.",
    drivers: [
      { i: TrendingDown,   t: "Logins ↓ 40%",         d: "Past 30 days vs prior period", weight: 0.34 },
      { i: MessageSquare,  t: "Tickets ↑ 3.2×",       d: "9 open · 4 P1",                weight: 0.28 },
      { i: Activity,       t: "Feature use ↓ 28%",    d: "Core workflows",               weight: 0.22 },
      { i: TrendingDown,   t: "NPS −10",              d: "Down 14 vs Q1",                weight: 0.16 },
    ],
    actions: [
      "Schedule executive review call with VP Operations",
      "Offer onboarding assistance and admin training refresh",
      "Provide 12% renewal discount with multi-year commitment",
    ],
  },
  {
    customer: "Helios Banking", risk: "Critical", score: 88, confidence: 91,
    saveProb: 68, impact: "$320k ARR", urgency: "Act this week",
    summary: "Repeated SLA breaches in the last 14 days combined with declining NPS (−4) indicate growing dissatisfaction.",
    drivers: [
      { i: TrendingDown,  t: "NPS ↓ −4",             d: "From +18 in Q1",      weight: 0.31 },
      { i: MessageSquare, t: "SLA breaches: 3",      d: "Last 14 days",        weight: 0.29 },
      { i: Activity,      t: "Stakeholders ↓ 2",     d: "Lost two champions",  weight: 0.24 },
      { i: TrendingDown,  t: "Logins ↓ 18%",         d: "Last 30 days",        weight: 0.16 },
    ],
    actions: [
      "Trigger 'Premium Support Upgrade' playbook in Flow Designer",
      "Reach out to new champion stakeholder",
      "Share Q2 product roadmap with security commitments",
    ],
  },
  {
    customer: "Acme Retail", risk: "High", score: 81, confidence: 87,
    saveProb: 81, impact: "$210k ARR", urgency: "Act within 7 days",
    summary: "Sentiment analysis on the last 12 tickets shows 62% negative tone, focused on integration reliability.",
    drivers: [
      { i: MessageSquare, t: "Negative sentiment 62%", d: "Last 12 tickets",         weight: 0.41 },
      { i: TrendingDown,  t: "Adoption ↓ 18%",         d: "New module rollout stalled", weight: 0.34 },
      { i: Activity,      t: "Integration errors ↑",   d: "API 5xx spike Apr 24",    weight: 0.25 },
    ],
    actions: [
      "Assign integration specialist for white-glove sync",
      "Run targeted enablement webinar for admins",
      "Issue success-plan checkpoint within 7 days",
    ],
  },
];

function AIInsights() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI recommendations</h1>
          <p className="text-sm text-muted-foreground">GPT-4 generated · explainable next-best actions</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ServiceNowBadge variant="predictive" />
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary gap-1.5">
            <Sparkles className="h-3 w-3" /> Model: gpt-4-turbo
          </Badge>
          <Button size="sm" className="gap-1.5"><Sparkles className="h-3.5 w-3.5" />Refresh insights</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Pending recommendations</p>
          <p className="mt-2 text-3xl font-semibold">{customers.filter((c) => c.aiStatus === "Pending").length}</p>
          <p className="mt-1 text-xs text-muted-foreground">Awaiting CSM review</p>
        </Card>
        <Card className="glass p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Acted last 7 days</p>
          <p className="mt-2 text-3xl font-semibold text-success">28</p>
          <p className="mt-1 text-xs text-muted-foreground">82% predicted churn averted</p>
        </Card>
        <Card className="glass p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Average confidence</p>
          <p className="mt-2 text-3xl font-semibold text-info">91.4%</p>
          <p className="mt-1 text-xs text-muted-foreground">Across all recommendations</p>
        </Card>
      </div>

      <div className="mt-6 space-y-4">
        {recommendations.map((r) => (
          <Card key={r.customer} className="glass overflow-hidden p-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-gradient-to-r from-destructive/10 via-transparent to-transparent p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{r.customer}</h3>
                    <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">
                      {r.risk} · {r.score}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Risk evaluated 4 minutes ago</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning text-[10px]">{r.urgency}</Badge>
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Confidence {r.confidence}%</Badge>
                <Button size="sm" variant="outline">Dismiss</Button>
                <Button size="sm" className="gap-1.5"><Check className="h-3.5 w-3.5" />Apply playbook</Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 border-b border-border/60 px-5 py-3 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Predicted save</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-semibold text-success"><Target className="h-3.5 w-3.5" />{r.saveProb}%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Revenue impact</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-semibold text-info"><DollarSign className="h-3.5 w-3.5" />{r.impact}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Model confidence</p>
                <p className="mt-0.5 text-sm font-semibold text-primary">{r.confidence}%</p>
              </div>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">AI Analysis · why this recommendation?</p>
                  <p className="mt-1.5 text-sm leading-relaxed">{r.summary}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Recommended actions</p>
                  <div className="mt-2 space-y-2">
                    {r.actions.map((a, i) => (
                      <div key={a} className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 px-3 py-2.5">
                        <span className="text-sm"><span className="mr-2 text-xs font-semibold text-primary">{i + 1}.</span>{a}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Explainable AI · risk drivers</p>
                <div className="mt-2 space-y-2">
                  {r.drivers.map((d) => (
                    <div key={d.t} className="rounded-lg border border-border/60 bg-background/40 p-3">
                      <div className="flex items-start gap-3">
                        <div className="rounded-md bg-secondary/60 p-2 text-muted-foreground"><d.i className="h-3.5 w-3.5" /></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{d.t}</p>
                          <p className="text-xs text-muted-foreground">{d.d}</p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{(d.weight * 100).toFixed(0)}%</span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-destructive/70" style={{ width: `${d.weight * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
