import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "Admin" | "Account Manager" | "Executive" | "Analyst";
export const ROLES: Role[] = ["Admin", "Account Manager", "Executive", "Analyst"];

const ROLE_NAV: Record<Role, string[]> = {
  Admin: ["Dashboard", "Customers", "Analytics", "AI Insights", "Workflows", "Interventions", "Reports", "Settings"],
  "Account Manager": ["Dashboard", "Customers", "AI Insights", "Interventions", "Workflows", "Reports"],
  Executive: ["Dashboard", "Analytics", "Reports"],
  Analyst: ["Dashboard", "Customers", "Analytics", "AI Insights", "Reports"],
};

const RoleCtx = createContext<{ role: Role; setRole: (r: Role) => void; canSee: (item: string) => boolean }>({
  role: "Admin", setRole: () => {}, canSee: () => true,
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("Admin");

  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem("retain-role")) as Role | null;
    if (stored && ROLES.includes(stored)) setRoleState(stored);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    try { localStorage.setItem("retain-role", r); } catch {}
  };

  const canSee = (item: string) => ROLE_NAV[role].includes(item);
  return <RoleCtx.Provider value={{ role, setRole, canSee }}>{children}</RoleCtx.Provider>;
}

export const useRole = () => useContext(RoleCtx);
