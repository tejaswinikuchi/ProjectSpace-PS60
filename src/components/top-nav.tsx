import { Search, Moon, Sun, Activity, ChevronDown, ShieldCheck } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";
import { useRole, ROLES, type Role } from "@/lib/role";
import { NotificationCenter } from "@/components/notification-center";

const roleSubtitle: Record<Role, string> = {
  Admin: "Full access · platform owner",
  "Account Manager": "Customer Success workspace",
  Executive: "KPI & board view",
  Analyst: "Predictive analytics",
};

export function TopNav() {
  const { theme, toggle } = useTheme();
  const { role, setRole } = useRole();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger />
      <div className="relative ml-2 hidden w-72 lg:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search customers, tickets, interventions…" className="h-9 pl-9 bg-secondary/40 border-border" />
      </div>
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Badge variant="outline" className="hidden gap-1.5 border-success/30 bg-success/10 text-success xl:inline-flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Now Platform Connected
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1.5 bg-secondary/40">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span className="hidden text-xs font-medium md:inline">{role}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Switch portal
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {ROLES.map((r) => (
              <DropdownMenuItem key={r} onClick={() => setRole(r)} className="flex items-start gap-2">
                <ShieldCheck className={`mt-0.5 h-4 w-4 ${r === role ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <p className="text-sm">{r}</p>
                  <p className="text-[11px] text-muted-foreground">{roleSubtitle[r]}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="hidden h-9 w-9 md:inline-flex" title="System health">
          <Activity className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggle} title="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <NotificationCenter />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-info" />
              <span className="hidden text-sm font-medium md:inline">Priya S.</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
