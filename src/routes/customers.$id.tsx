import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RiskBadge } from "@/components/risk-badge";
import { customers } from "@/lib/mock-data";
import {
  ArrowLeft, Mail, Phone, Building2, Calendar, CreditCard,
  AlertCircle, MessageSquare, Activity, Sparkles,
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { ServiceNowBadge } from "@/components/servicenow-badge";

export const Route = createFileRoute("/customers/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${customers.find((c) => c.id === params.id)?.company ?? "Customer"} — Retain.AI` }],
  }),
  loader: ({ params }) => {
    const c = customers.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  component: CustomerProfile,
  notFoundComponent: () => (
    <AppShell><div className="text-sm text-muted-foreground">Customer not found.</div></AppShell>
  ),
  errorComponent: ({ error }) => (
    <AppShell><div className="text-sm text-destructive">{error.message}</div></AppShell>
  ),
});

const tooltipStyle = {
  contentStyle: {
    background: "var(--color-popover)", border: "1px solid var(--color-border)",
    borderRadius: 8, fontSize: 12, color: "var(--color-popover-foreground)",
  },
};

function CustomerProfile() {
  const c = Route.useLoaderData();

  const churnTimeline = Array.from({ length: 12 }, (_, i) => ({
    m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    score: Math.max(10, Math.min(95, c.riskScore - 30 + Math.sin(i / 2) * 15 + i * 2)),
  }));

  const usage = Array.from({ length: 14 }, (_, i) => ({
    d: `D${i + 1}`,
    sessions: Math.max(0, Math.round(60 - c.riskScore * 0.4 + Math.sin(i) * 10)),
  }));

  const timeline = [
    { t: "2h ago", a: "AI flagged high churn risk", d: "Login activity dropped 38% week-over-week.", icon: Sparkles, tone: "text-warning" },
    { t: "1d ago", a: "Support ticket #4821 escalated", d: "API latency complaint marked P2.", icon: MessageSquare, tone: "text-destructive" },
    { t: "3d ago", a: "Renewal proposal sent", d: "Account manager A. Mehra · 12% discount option.", icon: CreditCard, tone: "text-info" },
    { t: "1w ago", a: "QBR completed", d: "Action items: 4 · Owner: CSM team.", icon: Activity, tone: "text-muted-foreground" },
  ];

  return (
    <AppShell>
      <Link to="/customers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All customers
      </Link>

      <div className="mt-3 mb-6 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary text-xl font-semibold">
            {c.company.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{c.company}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" />{c.industry}</span>
              <span>·</span><span>Customer since {c.since}</span>
              <span>·</span><Badge variant="outline" className="border-border/70 bg-secondary/40">{c.plan}</Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RiskBadge level={c.riskCategory} />
          <ServiceNowBadge variant="hub" label={`Synced ${c.lastLogin}`} />
          <Button variant="outline" size="sm">Assign manager</Button>
          <Button size="sm" className="gap-1.5"><Sparkles className="h-3.5 w-3.5" />Run AI playbook</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5">
          <h3 className="text-sm font-medium">Risk score</h3>
          <RiskGauge score={c.riskScore} />
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <Stat label="Probability" value={`${c.riskScore}%`} />
            <Stat label="Confidence" value="92%" />
            <Stat label="Horizon" value="30 days" />
          </div>
        </Card>

        <Card className="glass p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Account health</h3>
            <ServiceNowBadge variant="predictive" />
          </div>
          <div className="mt-4 space-y-4">
            <Health label="Usage health" value={Math.max(15, 100 - c.riskScore)} tone="success" />
            <Health label="Engagement health" value={Math.max(20, 95 - c.riskScore + 10)} tone={c.riskScore > 60 ? "warning" : "success"} />
            <Health label="Support sentiment" value={c.openTickets > 6 ? 28 : 72} tone={c.openTickets > 6 ? "warning" : "success"} />
            <Health label="Billing stability" value={88} tone="success" />
            <Health label="Renewal probability" value={Math.max(10, 100 - c.riskScore - 5)} tone={c.riskScore > 60 ? "danger" : "success"} />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5 lg:col-span-2">
          <h3 className="text-sm font-medium">Churn score timeline</h3>
          <p className="text-xs text-muted-foreground">Last 12 months</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={churnTimeline}>
              <defs>
                <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="score" stroke="var(--color-destructive)" fill="url(#r)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-5">
          <h3 className="text-sm font-medium">Login activity</h3>
          <p className="text-xs text-muted-foreground">Sessions / day, last 14d</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={usage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={10} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="sessions" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5">
          <h3 className="text-sm font-medium">Subscription</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <Row k="Plan" v={c.plan} />
            <Row k="ARR" v={`$${(c.arr / 1000).toFixed(0)}k`} />
            <Row k="Renewal" v={c.renewal} />
            <Row k="Account manager" v={c.manager} />
          </dl>
        </Card>

        <Card className="glass p-5">
          <h3 className="text-sm font-medium">Primary contact</h3>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-info" />
            <div>
              <p className="text-sm font-medium">{c.contact}</p>
              <p className="text-xs text-muted-foreground">VP, Customer Operations</p>
            </div>
          </div>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{c.email}</p>
            <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />+1 (555) 014-9920</p>
            <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />Next review: {c.renewal}</p>
          </div>
        </Card>

        <Card className="glass p-5">
          <h3 className="text-sm font-medium">Billing alerts</h3>
          <div className="mt-3 space-y-2">
            <Alert tone="warning" title="Invoice INV-2941 unpaid" body="Past due by 6 days." />
            <Alert tone="info" title="Usage spike on /api/predict" body="3.2× average · last 24h." />
            <Alert tone="success" title="Discount approved" body="12% retention offer ready." />
          </div>
        </Card>
      </div>

      <Card className="glass mt-4 p-5">
        <h3 className="text-sm font-medium">Recent activity</h3>
        <ol className="mt-4 space-y-4">
          {timeline.map((e) => (
            <li key={e.a} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-secondary ${e.tone}`}>
                  <e.icon className="h-4 w-4" />
                </div>
                <div className="mt-1 w-px flex-1 bg-border" />
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium">{e.a}</p>
                <p className="text-xs text-muted-foreground">{e.t} · {e.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-secondary/30 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function Health({ label, value, tone }: { label: string; value: number; tone: "success" | "warning" | "danger" }) {
  const colorMap = {
    success: "[&>div]:bg-success", warning: "[&>div]:bg-warning", danger: "[&>div]:bg-destructive",
  };
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}%</span>
      </div>
      <Progress value={value} className={`h-1.5 ${colorMap[tone]}`} />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0 last:pb-0">
      <dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd>
    </div>
  );
}

function Alert({ tone, title, body }: { tone: "warning" | "info" | "success"; title: string; body: string }) {
  const map = {
    warning: "border-warning/30 bg-warning/10 text-warning",
    info: "border-info/30 bg-info/10 text-info",
    success: "border-success/30 bg-success/10 text-success",
  };
  return (
    <div className={`flex items-start gap-2 rounded-lg border p-3 ${map[tone]}`}>
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs opacity-80">{body}</p>
      </div>
    </div>
  );
}

function RiskGauge({ score }: { score: number }) {
  const radius = 70, circumference = Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 80 ? "var(--color-destructive)" : score >= 60 ? "oklch(0.7 0.18 45)" : score >= 35 ? "var(--color-warning)" : "var(--color-success)";
  return (
    <div className="relative mt-3 flex flex-col items-center">
      <svg width={180} height={110} viewBox="0 0 180 110">
        <path d={`M 20 100 A ${radius} ${radius} 0 0 1 160 100`} stroke="var(--color-border)" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d={`M 20 100 A ${radius} ${radius} 0 0 1 160 100`} stroke={color} strokeWidth="14" fill="none" strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`} />
      </svg>
      <div className="-mt-8 text-center">
        <p className="text-3xl font-semibold tabular-nums" style={{ color }}>{score}</p>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">churn risk</p>
      </div>
    </div>
  );
}
