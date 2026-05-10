import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, Sparkles, Workflow, BarChart3, Bot, Zap,
  TrendingUp, AlertTriangle, ArrowRight, CheckCircle2, LineChart,
} from "lucide-react";
import { techStack } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Retain.AI — Predict Customer Churn Before It Happens" },
      { name: "description", content: "AI-powered retention intelligence platform built on ServiceNow with Predictive Intelligence, workflow automation and generative AI." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">Retain.AI</span>
            <Badge variant="outline" className="ml-2 hidden border-border/70 text-[10px] text-muted-foreground sm:inline-flex">v1.4 · ServiceNow</Badge>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#ai" className="hover:text-foreground">AI</a>
            <a href="#workflow" className="hover:text-foreground">Workflows</a>
            <a href="#stack" className="hover:text-foreground">Architecture</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/dashboard"><Button size="sm">Open Dashboard</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-bg relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-5 border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="mr-1.5 h-3 w-3" /> Proactive Churn Prediction Platform
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Predict customer churn <br className="hidden sm:block" />
              <span className="text-gradient">before customers leave</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              AI-powered retention intelligence built on ServiceNow using Predictive Intelligence,
              Flow Designer automation, and generative AI recommendations.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/dashboard"><Button size="lg" className="gap-2">View Dashboard <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/analytics"><Button size="lg" variant="outline">Explore Analytics</Button></Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> 30-day predictive horizon</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Explainable AI</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Native ServiceNow workflows</span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative mx-auto mt-16 max-w-6xl">
            <div className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-to-b from-primary/10 via-info/5 to-transparent blur-2xl" />
            <Card className="glass overflow-hidden p-0">
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-card/60 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                <span className="ml-3 text-xs text-muted-foreground">app.retain.ai / dashboard</span>
              </div>
              <div className="grid gap-4 p-6 md:grid-cols-3">
                {[
                  { label: "Total Customers", value: "1,030", delta: "+4.2%", tone: "text-foreground" },
                  { label: "High Risk", value: "134", delta: "-12%", tone: "text-warning" },
                  { label: "Revenue at Risk", value: "$2.84M", delta: "-8.1%", tone: "text-destructive" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/60 bg-secondary/30 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className={`mt-1.5 text-2xl font-semibold ${s.tone}`}>{s.value}</p>
                    <p className="mt-1 text-xs text-success">{s.delta} vs last month</p>
                  </div>
                ))}
                <div className="md:col-span-2 rounded-xl border border-border/60 bg-secondary/30 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">Churn forecast (12 mo)</p>
                    <Badge variant="outline" className="border-success/30 bg-success/10 text-success">−54% projected</Badge>
                  </div>
                  <FakeChart />
                </div>
                <div className="rounded-xl border border-border/60 bg-secondary/30 p-4">
                  <p className="text-sm font-medium">AI Recommendation</p>
                  <p className="mt-2 text-xs text-muted-foreground">Northwind Labs · Critical risk</p>
                  <p className="mt-2 text-sm">Schedule executive review and offer renewal incentive.</p>
                  <Badge variant="outline" className="mt-3 border-primary/30 bg-primary/10 text-primary">Confidence 92%</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Features" title="A complete retention command center" desc="Everything customer success teams need to detect, decide, and act — in one workspace." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { i: TrendingUp, t: "Churn Risk Scoring", d: "ML models score every customer daily across usage, support, and billing signals." },
              { i: Sparkles, t: "Generative AI Insights", d: "Explainable, plain-English recommendations powered by GPT-4." },
              { i: Workflow, t: "Automated Playbooks", d: "Trigger Flow Designer playbooks the moment risk crosses thresholds." },
              { i: BarChart3, t: "Executive Analytics", d: "Board-ready dashboards on revenue saved and retention ROI." },
              { i: AlertTriangle, t: "Real-Time Alerts", d: "Push high-risk events to Slack, email, and ServiceNow tasks." },
              { i: ShieldCheck, t: "Role-Based Access", d: "Granular access controls for CSMs, managers, and executives." },
            ].map((f) => (
              <Card key={f.t} className="glass p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary"><f.i className="h-5 w-5" /></div>
                <h3 className="mt-4 font-medium">{f.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="border-t border-border/60 bg-secondary/20 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="AI Capabilities" title="Predictive Intelligence + GPT-4" desc="ServiceNow Predictive Intelligence handles classification and clustering. GPT-4 turns scores into recommended next-best actions." align="left" />
            <ul className="mt-6 space-y-3 text-sm">
              {["30-day churn probability scoring", "Cohort and segment clustering", "Sentiment analysis on support tickets", "Next-best-action generation with reasoning"].map((x) => (
                <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> {x}</li>
              ))}
            </ul>
          </div>
          <Card className="glass p-6">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">High Risk · 87</Badge>
              <span className="text-xs text-muted-foreground">Confidence 92%</span>
            </div>
            <h3 className="mt-3 font-medium">Northwind Labs</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Login activity declined 40% over 30 days while open support tickets increased 3×.
              NPS dropped from 42 to 18.
            </p>
            <div className="mt-4 space-y-2">
              {["Schedule executive review call", "Offer 12% renewal discount", "Trigger onboarding refresh playbook"].map((s, i) => (
                <div key={s} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/50 px-3 py-2 text-sm">
                  <span><span className="mr-2 text-xs text-muted-foreground">{i + 1}.</span>{s}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Workflow Automation" title="From signal to save in minutes" desc="Pipelines stitched together in Flow Designer keep humans in the loop where it matters." />
          <div className="mt-10 grid gap-3 md:grid-cols-7">
            {["Risk Detected", "AI Analysis", "Alert Triggered", "Task Assigned", "Customer Contacted", "Offer Sent", "Outcome Recorded"].map((s, i) => (
              <Card key={s} className="glass relative p-4 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">{i + 1}</div>
                <p className="mt-2 text-xs font-medium">{s}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* KPI metrics */}
      <section className="border-t border-border/60 bg-secondary/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Outcomes" title="Measured impact" />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[{n:"−54%", l:"Annual churn"}, {n:"$3.2M", l:"Revenue saved"}, {n:"92%", l:"AI accuracy"}, {n:"4.1×", l:"CSM efficiency"}].map((k) => (
              <Card key={k.l} className="glass p-6 text-center">
                <p className="text-3xl font-semibold tracking-tight text-gradient">{k.n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{k.l}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture / Stack */}
      <section id="stack" className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Architecture" title="Built on enterprise foundations" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { i: Bot, t: "Predictive Engine", d: "ServiceNow Predictive Intelligence trained on 18 months of telemetry." },
              { i: Workflow, t: "Automation Layer", d: "Flow Designer + IntegrationHub orchestrate playbooks and SLAs." },
              { i: Zap, t: "Generative Layer", d: "OpenAI GPT-4 turns risk scores into explainable next-best actions." },
            ].map((b) => (
              <Card key={b.t} className="glass p-6">
                <b.i className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-medium">{b.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.d}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {techStack.map((t) => (
              <Badge key={t} variant="outline" className="border-border/70 bg-secondary/40 text-muted-foreground">{t}</Badge>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary"><ShieldCheck className="h-3.5 w-3.5" /></div>
            <span>Retain.AI · Student capstone project</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground">Docs</a>
            <a href="#" className="hover:text-foreground">GitHub</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, title, desc, align = "center" }: { eyebrow: string; title: string; desc?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-medium uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

function FakeChart() {
  const points = [60, 58, 55, 52, 48, 44, 40, 37, 33, 30, 27, 24];
  const w = 600, h = 140;
  const max = 65, min = 20;
  const path = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g)" />
      <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth="2" />
    </svg>
  );
}
