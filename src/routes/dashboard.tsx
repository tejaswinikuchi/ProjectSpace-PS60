import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import {
  Users, AlertTriangle, DollarSign, ShieldCheck, Activity, BrainCircuit,
  ArrowRight, Sparkles,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line,
  LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  churnTrend, riskDistribution, revenueLoss, interventionSuccess,
  sentimentData, healthScore, customers, sparkUp, sparkDown,
} from "@/lib/mock-data";
import { ServiceNowBadge } from "@/components/servicenow-badge";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Retain.AI" }] }),
  component: Dashboard,
});

const tooltipStyle = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: 8, fontSize: 12, color: "var(--color-popover-foreground)",
  },
  labelStyle: { color: "var(--color-muted-foreground)" },
};

function Dashboard() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Retention overview</h1>
          <p className="text-sm text-muted-foreground">Last 30 days · refreshed 2 min ago</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ServiceNowBadge variant="hub" label="Last sync 2m ago" />
          <ServiceNowBadge variant="predictive" />
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm" className="gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Run AI scan</Button>
        </div>
      </div>

      <Card className="glass mb-6 flex flex-wrap items-center justify-between gap-3 p-3 px-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="font-medium">ServiceNow Now Platform</span>
          <span className="text-muted-foreground">· IntegrationHub healthy · 1.4s avg latency · 271/284 successful runs (24h)</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="border-border/70 bg-secondary/40 text-[10px]">REST API · 124ms</Badge>
          <Badge variant="outline" className="border-border/70 bg-secondary/40 text-[10px]">Webhooks · 0 failed</Badge>
          <Badge variant="outline" className="border-border/70 bg-secondary/40 text-[10px]">GPT-4 · operational</Badge>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard label="Total Customers" value="1,030" delta={4.2} hint="vs last mo" icon={<Users className="h-4 w-4" />} trend={sparkUp} />
        <KpiCard label="High Risk Customers" value="134" delta={-12} hint="reduced" tone="warning" icon={<AlertTriangle className="h-4 w-4" />} trend={sparkDown} />
        <KpiCard label="Revenue at Risk" value="$2.84M" delta={-8.1} hint="protected" tone="danger" icon={<DollarSign className="h-4 w-4" />} trend={sparkDown} />
        <KpiCard label="Churn Prevention Rate" value="68.4%" delta={6.5} hint="improved" tone="success" icon={<ShieldCheck className="h-4 w-4" />} trend={sparkUp} />
        <KpiCard label="Active Campaigns" value="42" delta={9} hint="this week" tone="info" icon={<Activity className="h-4 w-4" />} trend={sparkUp} />
        <KpiCard label="AI Accuracy" value="92.1%" delta={1.4} hint="rolling" tone="success" icon={<BrainCircuit className="h-4 w-4" />} trend={sparkUp} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5 lg:col-span-2">
          <ChartHeader title="Monthly churn trend" subtitle="Predicted vs actual vs prevented (%)" />
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={churnTrend}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="churn" stroke="var(--color-chart-4)" fill="url(#g1)" />
              <Area type="monotone" dataKey="predicted" stroke="var(--color-chart-2)" fill="url(#g2)" />
              <Line type="monotone" dataKey="prevented" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-5">
          <ChartHeader title="Risk distribution" subtitle="Customers by category" />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {riskDistribution.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {riskDistribution.map((d) => (
              <div key={d.name} className="flex items-center justify-between rounded border border-border/60 bg-secondary/30 px-2 py-1.5">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm" style={{ background: d.color }} />{d.name}</span>
                <span className="font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5">
          <ChartHeader title="Revenue loss prediction" subtitle="$ thousands" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueLoss}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="atRisk" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recovered" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-5">
          <ChartHeader title="Intervention success rate" subtitle="By action type (%)" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={interventionSuccess} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis type="category" dataKey="type" stroke="var(--color-muted-foreground)" fontSize={11} width={90} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="success" stackId="a" fill="var(--color-chart-1)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="failed" stackId="a" fill="var(--color-chart-4)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-5">
          <ChartHeader title="Customer health trend" subtitle="Aggregate health score" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={healthScore}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} domain={[60, 90]} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ fill: "var(--color-chart-1)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5 lg:col-span-2">
          <ChartHeader title="Support sentiment analysis" subtitle="Weekly ticket sentiment (%)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={sentimentData} stackOffset="expand">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="positive" stackId="1" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.7} />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke="var(--color-chart-2)" fill="var(--color-chart-2)" fillOpacity={0.6} />
              <Area type="monotone" dataKey="negative" stackId="1" stroke="var(--color-chart-4)" fill="var(--color-chart-4)" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-5">
          <ChartHeader title="Top at-risk customers" subtitle="Critical accounts now" />
          <div className="mt-2 divide-y divide-border/60">
            {customers.slice(0, 5).map((c) => (
              <Link key={c.id} to="/customers/$id" params={{ id: c.id }} className="flex items-center justify-between py-2.5 hover:bg-secondary/30 -mx-1 px-1 rounded">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.company}</p>
                  <p className="text-xs text-muted-foreground">${(c.arr / 1000).toFixed(0)}k ARR · {c.industry}</p>
                </div>
                <div className="flex items-center gap-3">
                  <RiskBadge level={c.riskCategory} />
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function ChartHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-medium">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
