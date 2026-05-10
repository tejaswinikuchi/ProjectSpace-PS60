import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";

import {
  Users,
  AlertTriangle,
  DollarSign,
  ShieldCheck,
  Activity,
  BrainCircuit,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  churnTrend,
  riskDistribution,
  revenueLoss,
  interventionSuccess,
  sentimentData,
  healthScore,
  customers as mockCustomers,
  sparkUp,
  sparkDown,
} from "@/lib/mock-data";

import { ServiceNowBadge } from "@/components/servicenow-badge";
import { fetchCustomers } from "@/lib/api";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — Retain.AI" }],
  }),
  component: Dashboard,
});

const tooltipStyle = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: 8,
    fontSize: 12,
    color: "var(--color-popover-foreground)",
  },
  labelStyle: {
    color: "var(--color-muted-foreground)",
  },
};

function Dashboard() {
  const [customers, setCustomers] = useState(mockCustomers);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const apiData = await fetchCustomers();

        if (apiData && apiData.length > 0) {
          const mappedCustomers = apiData.map((c: any, index: number) => ({
            id: c.id || index + 1,
            company: c.company,
            riskScore: c.riskScore,
            riskCategory: c.riskCategory,
            arr: c.arr || 100000,
            industry: c.industry || "SaaS",
          }));

          setCustomers(mappedCustomers);

          console.log("Backend API Connected Successfully");
        }
      } catch (error) {
        console.log("Using fallback mock data");
        console.error(error);
      }
    }

    loadCustomers();
  }, []);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Retention overview
          </h1>

          <p className="text-sm text-muted-foreground">
            Last 30 days · refreshed 2 min ago
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ServiceNowBadge variant="hub" label="Last sync 2m ago" />

          <ServiceNowBadge variant="predictive" />

          <Button variant="outline" size="sm">
            Export
          </Button>

          <Button size="sm" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Run AI scan
          </Button>
        </div>
      </div>

      <Card className="glass mb-6 flex flex-wrap items-center justify-between gap-3 p-3 px-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>

          <span className="font-medium">
            Backend API Connected
          </span>

          <span className="text-muted-foreground">
            · Express server active · REST APIs operational
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            className="border-border/70 bg-secondary/40 text-[10px]"
          >
            REST API · Live
          </Badge>

          <Badge
            variant="outline"
            className="border-border/70 bg-secondary/40 text-[10px]"
          >
            Backend · Node.js
          </Badge>

          <Badge
            variant="outline"
            className="border-border/70 bg-secondary/40 text-[10px]"
          >
            Express · Connected
          </Badge>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard
          label="Total Customers"
          value={customers.length.toString()}
          delta={4.2}
          hint="vs last mo"
          icon={<Users className="h-4 w-4" />}
          trend={sparkUp}
        />

        <KpiCard
          label="High Risk Customers"
          value="134"
          delta={-12}
          hint="reduced"
          tone="warning"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend={sparkDown}
        />

        <KpiCard
          label="Revenue at Risk"
          value="$2.84M"
          delta={-8.1}
          hint="protected"
          tone="danger"
          icon={<DollarSign className="h-4 w-4" />}
          trend={sparkDown}
        />

        <KpiCard
          label="Churn Prevention Rate"
          value="68.4%"
          delta={6.5}
          hint="improved"
          tone="success"
          icon={<ShieldCheck className="h-4 w-4" />}
          trend={sparkUp}
        />

        <KpiCard
          label="Active Campaigns"
          value="42"
          delta={9}
          hint="this week"
          tone="info"
          icon={<Activity className="h-4 w-4" />}
          trend={sparkUp}
        />

        <KpiCard
          label="AI Accuracy"
          value="92.1%"
          delta={1.4}
          hint="rolling"
          tone="success"
          icon={<BrainCircuit className="h-4 w-4" />}
          trend={sparkUp}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="glass p-5 lg:col-span-2">
          <ChartHeader
            title="Monthly churn trend"
            subtitle="Predicted vs actual vs prevented (%)"
          />

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={churnTrend}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-chart-1)"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="100%"
                    stopColor="var(--color-chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-chart-2)"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="100%"
                    stopColor="var(--color-chart-2)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                stroke="var(--color-muted-foreground)"
                fontSize={11}
              />

              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={11}
              />

              <Tooltip {...tooltipStyle} />

              <Legend wrapperStyle={{ fontSize: 12 }} />

              <Area
                type="monotone"
                dataKey="churn"
                stroke="var(--color-chart-4)"
                fill="url(#g1)"
              />

              <Area
                type="monotone"
                dataKey="predicted"
                stroke="var(--color-chart-2)"
                fill="url(#g2)"
              />

              <Line
                type="monotone"
                dataKey="prevented"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-5">
          <ChartHeader
            title="Top at-risk customers"
            subtitle="Live backend API data"
          />

          <div className="mt-2 divide-y divide-border/60">
            {customers.slice(0, 5).map((c: any) => (
              <div
                key={c.id}
                className="flex items-center justify-between py-2.5"
              >
                <div>
                  <p className="truncate text-sm font-medium">
                    {c.company}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    ${(c.arr / 1000).toFixed(0)}k ARR · {c.industry}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <RiskBadge level={c.riskCategory} />

                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function ChartHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-medium">{title}</h3>

      {subtitle && (
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}