import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/risk-badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Search, Download, ArrowUpDown, Plus } from "lucide-react";
import { customers } from "@/lib/mock-data";
import type { RiskCategory } from "@/lib/mock-data";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/customers/")({
  head: () => ({ meta: [{ title: "Customers — Retain.AI" }] }),
  component: CustomersPage,
});

function CustomersPage() {
  const [q, setQ] = useState("");
  const [risk, setRisk] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return customers.filter((c) =>
      (risk === "all" || c.riskCategory === risk) &&
      c.company.toLowerCase().includes(q.toLowerCase()),
    );
  }, [q, risk]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} accounts · sorted by risk</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" />Export CSV</Button>
          <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add account</Button>
        </div>
      </div>

      <Card className="glass overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/60 p-4">
          <div className="relative w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search by company name…" className="h-9 pl-9 bg-secondary/40" />
          </div>
          <Select value={risk} onValueChange={(v) => { setRisk(v); setPage(1); }}>
            <SelectTrigger className="h-9 w-40 bg-secondary/40"><SelectValue placeholder="Risk" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All risk levels</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="ml-auto border-border/70 bg-secondary/40 text-muted-foreground">
            Updated 2 min ago
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider"><span className="inline-flex items-center gap-1">Company <ArrowUpDown className="h-3 w-3" /></span></TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Risk</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Category</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">ARR</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Last Login</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Tickets</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">NPS</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Renewal</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Manager</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">AI Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((c) => (
                <TableRow key={c.id} className="border-border/60">
                  <TableCell>
                    <Link to="/customers/$id" params={{ id: c.id }} className="font-medium hover:text-primary">
                      {c.company}
                    </Link>
                    <p className="text-[11px] text-muted-foreground">{c.industry} · {c.plan}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full" style={{
                          width: `${c.riskScore}%`,
                          background: c.riskScore >= 80 ? "var(--color-destructive)" : c.riskScore >= 60 ? "oklch(0.7 0.18 45)" : c.riskScore >= 35 ? "var(--color-warning)" : "var(--color-success)",
                        }} />
                      </div>
                      <span className="text-xs font-medium tabular-nums">{c.riskScore}</span>
                    </div>
                  </TableCell>
                  <TableCell><RiskBadge level={c.riskCategory as RiskCategory} /></TableCell>
                  <TableCell className="tabular-nums">${(c.arr / 1000).toFixed(0)}k</TableCell>
                  <TableCell className="text-muted-foreground">{c.lastLogin}</TableCell>
                  <TableCell><Badge variant="outline" className="border-border/70 bg-secondary/40">{c.openTickets}</Badge></TableCell>
                  <TableCell className={c.nps < 0 ? "text-destructive" : c.nps < 30 ? "text-warning" : "text-success"}>{c.nps}</TableCell>
                  <TableCell className="text-muted-foreground">{c.renewal}</TableCell>
                  <TableCell>{c.manager}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      c.aiStatus === "Acted" ? "border-success/30 bg-success/10 text-success" :
                      c.aiStatus === "Pending" ? "border-warning/30 bg-warning/10 text-warning" :
                      c.aiStatus === "Dismissed" ? "border-border/60 bg-secondary/40 text-muted-foreground" :
                      "border-info/30 bg-info/10 text-info"
                    }>{c.aiStatus}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-border/60 p-3 text-sm">
          <p className="text-muted-foreground">Page {page} of {pages}</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
