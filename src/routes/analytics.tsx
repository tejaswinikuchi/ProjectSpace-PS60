import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, DollarSign, ShieldCheck, Users } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { sparkUp, sparkDown } from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Executive Analytics — Retain.AI" }] }),
  component: Analytics,
});

const tooltipStyle = { contentStyle: { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 } };

const roi = [
  { q: "Q1", invested: 120, saved: 380 },
  { q: "Q2", invested: 140, saved: 520 },
  { q: "Q3", invested: 160, saved: 720 },
  { q: "Q4", invested: 180, saved: 980 },
];

const industries = [
  { name: "Fintech", value: 32 },
  { name: "Healthcare", value: 24 },
  { name: "Retail", value: 18 },
  { name: "SaaS", value: 14 },
  { name: "Logistics", value: 12 },
];

const heatmap = [
  ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
];
const segments = ["Enterprise", "Growth", "Starter", "SMB"];
const heatValues = segments.map(() => Array.from({ length: 12 }, () => Math.random()));

function Analytics() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Executive analytics</h1>
          <p className="text-sm text-muted-foreground">Retention ROI · churn savings · industry signals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" />Export PDF</Button>
          <Button size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" />Board report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="ROI · Last 12 mo" value="6.4×" delta={1.8} hint="vs prior year" tone="success" trend={sparkUp} icon={<TrendingUp className="h-4 w-4" />} />
        <KpiCard label="Revenue protected" value="$3.21M" delta={22} hint="YoY" tone="success" trend={sparkUp} icon={<DollarSign className="h-4 w-4" />} />
        <KpiCard label="Churn reduction" value="−54%" delta={9} hint="vs baseline" tone="info" trend={sparkDown} icon={<ShieldCheck className="h-4 w-4" />} />
        <KpiCard label="Logo retention" value="96.8%" delta={2.1} hint="trailing 12mo" tone="success" trend={sparkUp} icon={<Users className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5 lg:col-span-2">
          <h3 className="text-sm font-medium">Retention savings vs investment</h3>
          <p className="text-xs text-muted-foreground">$ thousands · per quarter</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={roi}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="q" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="invested" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saved" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-5">
          <h3 className="text-sm font-medium">Top at-risk industries</h3>
          <p className="text-xs text-muted-foreground">Share of high-risk accounts</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={industries} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                {industries.map((_, i) => (
                  <Cell key={i} fill={`var(--color-chart-${(i % 5) + 1})`} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5 lg:col-span-2">
          <h3 className="text-sm font-medium">Monthly performance</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={[
              { m: "Jan", churn: 4.2, save: 1.1 }, { m: "Feb", churn: 4.0, save: 1.5 },
              { m: "Mar", churn: 3.7, save: 1.9 }, { m: "Apr", churn: 3.4, save: 2.2 },
              { m: "May", churn: 3.0, save: 2.6 }, { m: "Jun", churn: 2.7, save: 2.9 },
              { m: "Jul", churn: 2.4, save: 3.2 }, { m: "Aug", churn: 2.1, save: 3.5 },
            ]}>
              <defs>
                <linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="save" stroke="var(--color-chart-1)" fill="url(#a)" />
              <Line type="monotone" dataKey="churn" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-5">
          <h3 className="text-sm font-medium">Churn heatmap</h3>
          <p className="text-xs text-muted-foreground">Segment × month intensity</p>
          <div className="mt-4 space-y-1">
            <div className="grid grid-cols-[80px_repeat(12,1fr)] gap-1 text-[10px] text-muted-foreground">
              <div />
              {heatmap[0].map((m) => <div key={m} className="text-center">{m}</div>)}
            </div>
            {segments.map((s, i) => (
              <div key={s} className="grid grid-cols-[80px_repeat(12,1fr)] items-center gap-1 text-xs">
                <div className="text-muted-foreground">{s}</div>
                {heatValues[i].map((v, j) => (
                  <div key={j} className="h-6 rounded-sm" style={{
                    background: `oklch(0.65 0.22 25 / ${0.1 + v * 0.6})`,
                  }} title={`${(v * 100).toFixed(0)}%`} />
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
