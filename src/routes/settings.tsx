import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Sparkles, KeyRound, Bell, Users, Plug } from "lucide-react";
import { techStack } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Retain.AI" }] }),
  component: Settings,
});

const team = [
  { name: "Priya Sharma", email: "priya@retain.ai", role: "Admin" },
  { name: "Arun Mehra", email: "arun@retain.ai", role: "Manager" },
  { name: "Jose Lopez", email: "jose@retain.ai", role: "CSM" },
  { name: "Hana Kim", email: "hana@retain.ai", role: "Executive" },
  { name: "Ravi Iyer", email: "ravi@retain.ai", role: "CSM" },
];

function Settings() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Roles, integrations and AI configuration</p>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList className="bg-secondary/40">
          <TabsTrigger value="roles" className="gap-1.5"><Users className="h-3.5 w-3.5" />Roles</TabsTrigger>
          <TabsTrigger value="integrations" className="gap-1.5"><Plug className="h-3.5 w-3.5" />Integrations</TabsTrigger>
          <TabsTrigger value="ai" className="gap-1.5"><Sparkles className="h-3.5 w-3.5" />AI Model</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <Card className="glass p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Team members</h3>
                <p className="text-xs text-muted-foreground">Role-based access controls</p>
              </div>
              <Button size="sm">Invite member</Button>
            </div>
            <Separator className="my-4 bg-border/60" />
            <div className="space-y-2">
              {team.map((m) => (
                <div key={m.email} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-info" />
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={
                      m.role === "Admin" ? "border-primary/30 bg-primary/10 text-primary" :
                      m.role === "Executive" ? "border-info/30 bg-info/10 text-info" :
                      "border-border/70 bg-secondary/40"
                    }>{m.role}</Badge>
                    <Button size="sm" variant="ghost">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="glass p-5">
              <h3 className="text-sm font-medium">Connected platforms</h3>
              <p className="text-xs text-muted-foreground">Tech stack powering Retain.AI</p>
              <div className="mt-4 space-y-2">
                {techStack.map((t) => (
                  <div key={t} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md bg-secondary" />
                      <span className="text-sm">{t}</span>
                    </div>
                    <Badge variant="outline" className="border-success/30 bg-success/10 text-success">Connected</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass p-5">
              <h3 className="text-sm font-medium">API credentials</h3>
              <p className="text-xs text-muted-foreground">Used by IntegrationHub and REST endpoints</p>
              <div className="mt-4 space-y-3">
                <div>
                  <Label className="text-xs">ServiceNow instance</Label>
                  <Input defaultValue="https://acme.service-now.com" className="mt-1.5 bg-secondary/40" />
                </div>
                <div>
                  <Label className="text-xs">REST API token</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input defaultValue="sk_live_5f2a...c19b" className="bg-secondary/40 font-mono text-xs" />
                    <Button variant="outline" size="sm" className="gap-1.5"><KeyRound className="h-3.5 w-3.5" />Rotate</Button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Webhook URL</Label>
                  <Input defaultValue="https://api.retain.ai/v1/hooks/predict" className="mt-1.5 bg-secondary/40 font-mono text-xs" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="glass p-5">
              <h3 className="text-sm font-medium">Model configuration</h3>
              <p className="text-xs text-muted-foreground">Predictive Intelligence + GPT-4</p>
              <div className="mt-4 space-y-4">
                <div>
                  <Label className="text-xs">Model</Label>
                  <Input defaultValue="gpt-4-turbo" className="mt-1.5 bg-secondary/40 font-mono text-xs" />
                </div>
                <div>
                  <div className="flex justify-between text-xs"><Label>Risk threshold</Label><span className="text-muted-foreground">75</span></div>
                  <Slider defaultValue={[75]} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs"><Label>Confidence floor</Label><span className="text-muted-foreground">85%</span></div>
                  <Slider defaultValue={[85]} max={100} step={1} className="mt-2" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3">
                  <div>
                    <p className="text-sm">Auto-trigger playbooks</p>
                    <p className="text-xs text-muted-foreground">Run Flow Designer automation when threshold is crossed.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="glass p-5">
              <h3 className="text-sm font-medium">OpenAI connection</h3>
              <p className="text-xs text-muted-foreground">Mocked — integrate via Lovable Cloud secrets when going live.</p>
              <div className="mt-4 space-y-3">
                <div>
                  <Label className="text-xs">OpenAI API key</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input defaultValue="sk-proj-•••••••••••••••••••" className="bg-secondary/40 font-mono text-xs" type="password" />
                    <Button size="sm" variant="outline">Test</Button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">System prompt</Label>
                  <textarea
                    rows={5}
                    defaultValue="You are a customer success analyst. Given churn signals, return a concise risk summary, top drivers, and three prioritized retention actions."
                    className="mt-1.5 w-full resize-none rounded-md border border-border bg-secondary/40 p-2 text-xs"
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3">
                  <p className="text-sm">Use streaming responses</p>
                  <Switch />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="glass p-5">
            <h3 className="text-sm font-medium">Notification preferences</h3>
            <Separator className="my-4 bg-border/60" />
            <div className="space-y-3">
              {[
                { t: "High-risk customer alerts", d: "Notify when score exceeds 80" },
                { t: "Daily retention digest", d: "Summary of overnight signals" },
                { t: "Workflow failures", d: "Alert when an automation breaks" },
                { t: "Weekly executive report", d: "Email PDF every Monday" },
              ].map((n, i) => (
                <div key={n.t} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3">
                  <div>
                    <p className="text-sm">{n.t}</p>
                    <p className="text-xs text-muted-foreground">{n.d}</p>
                  </div>
                  <Switch defaultChecked={i !== 2} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
