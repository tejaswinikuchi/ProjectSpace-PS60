import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Sparkles, BarChart3, Workflow } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Retain.AI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border bg-sidebar p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="hero-bg absolute inset-0 -z-10 opacity-80" />
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary"><ShieldCheck className="h-4 w-4" /></div>
          <span className="font-semibold">Retain.AI</span>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">Stop churn before it starts.</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            A unified workspace for predictive risk scoring, generative recommendations, and
            ServiceNow-powered retention workflows.
          </p>
          <div className="grid gap-3 max-w-md">
            {[
              { i: Sparkles, t: "AI-driven retention recommendations" },
              { i: BarChart3, t: "Live risk and revenue analytics" },
              { i: Workflow, t: "Automated playbooks in Flow Designer" },
            ].map((f) => (
              <div key={f.t} className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-3">
                <f.i className="h-4 w-4 text-primary" /> <span className="text-sm">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Retain.AI · Student capstone</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="glass w-full max-w-md p-8">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Welcome back</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">Sign in to your workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">Use your work email to continue.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => navigate({ to: "/dashboard" }), 600);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" defaultValue="priya@retain.ai" className="bg-secondary/40" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</a>
              </div>
              <Input id="password" type="password" defaultValue="••••••••" className="bg-secondary/40" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" defaultChecked /> <Label htmlFor="remember" className="text-sm font-normal">Remember me for 30 days</Label>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
            <Button type="button" variant="outline" className="w-full">Continue with SSO</Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New here? <Link to="/" className="text-primary hover:underline">Back to homepage</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
