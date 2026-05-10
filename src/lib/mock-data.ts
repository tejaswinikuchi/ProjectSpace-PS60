// Centralized mock data for the platform
export type RiskCategory = "Low" | "Medium" | "High" | "Critical";

export interface Customer {
  id: string;
  company: string;
  riskScore: number;
  riskCategory: RiskCategory;
  arr: number;
  lastLogin: string;
  openTickets: number;
  nps: number;
  renewal: string;
  manager: string;
  aiStatus: "Pending" | "Acted" | "In Review" | "Dismissed";
  industry: string;
  plan: "Starter" | "Growth" | "Enterprise";
  contact: string;
  email: string;
  since: string;
}

const managers = ["A. Mehra", "S. Kapoor", "J. Lopez", "R. Chen", "P. Singh", "L. Müller"];
const industries = ["Fintech", "Healthcare", "Retail", "SaaS", "Manufacturing", "EdTech", "Logistics"];
const companies = [
  "Northwind Labs", "Helios Banking", "Acme Retail", "Vector Health", "Forge Logistics",
  "Lumen EdTech", "Quanta Manufacturing", "Bluepeak Capital", "Solace Pharma", "Orbit SaaS",
  "Polar Insurance", "Tessera Cloud", "Ironclad Security", "Meridian Foods", "Cobalt Mobility",
  "Halcyon Media", "Riverstone Energy", "Aster Biotech", "Cinder Travel", "Nimbus Telecom",
];

function pick<T>(arr: T[], i: number) { return arr[i % arr.length]; }

export const customers: Customer[] = companies.map((c, i) => {
  const score = [92, 88, 81, 74, 68, 61, 55, 47, 42, 36, 31, 28, 24, 22, 19, 16, 13, 10, 8, 5][i];
  const cat: RiskCategory = score >= 80 ? "Critical" : score >= 60 ? "High" : score >= 35 ? "Medium" : "Low";
  return {
    id: `cus_${1000 + i}`,
    company: c,
    riskScore: score,
    riskCategory: cat,
    arr: [480000, 320000, 210000, 180000, 150000, 140000, 120000, 95000, 88000, 76000, 65000, 60000, 54000, 48000, 42000, 38000, 30000, 25000, 22000, 18000][i],
    lastLogin: ["2d ago", "5h ago", "12d ago", "1d ago", "3w ago", "8h ago", "4d ago", "1h ago", "9d ago", "2h ago", "6d ago", "1w ago", "3d ago", "30m ago", "5d ago", "2w ago", "11d ago", "1d ago", "4h ago", "20m ago"][i],
    openTickets: [12, 8, 9, 5, 6, 3, 4, 2, 5, 1, 2, 3, 1, 0, 2, 4, 1, 0, 1, 0][i],
    nps: [-10, -4, 2, 7, 12, 18, 22, 28, 31, 35, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72][i],
    renewal: ["2026-06-12", "2026-07-01", "2026-05-22", "2026-08-15", "2026-09-04", "2026-07-19", "2026-10-02", "2026-11-11", "2026-08-28", "2026-06-30", "2027-01-14", "2026-12-05", "2027-02-20", "2027-03-17", "2026-11-28", "2027-04-09", "2027-05-21", "2027-06-03", "2027-07-15", "2027-08-30"][i],
    manager: pick(managers, i),
    aiStatus: pick(["Pending", "Acted", "In Review", "Pending", "Acted", "Dismissed"] as const, i),
    industry: pick(industries, i),
    plan: pick(["Enterprise", "Enterprise", "Growth", "Growth", "Starter"] as const, i),
    contact: pick(["Maria Stein", "John Park", "Ravi Iyer", "Hana Kim", "Ben Cohen", "Eva Rossi"], i),
    email: `ops@${c.toLowerCase().replace(/[^a-z]/g, "")}.com`,
    since: ["2021", "2020", "2022", "2019", "2023", "2020", "2021", "2024", "2018", "2022", "2019", "2023", "2020", "2024", "2021", "2022", "2019", "2023", "2020", "2024"][i],
  };
});

export const churnTrend = [
  { month: "Jan", churn: 4.2, predicted: 4.0, prevented: 1.1 },
  { month: "Feb", churn: 4.0, predicted: 3.9, prevented: 1.4 },
  { month: "Mar", churn: 3.8, predicted: 3.7, prevented: 1.6 },
  { month: "Apr", churn: 3.6, predicted: 3.5, prevented: 1.9 },
  { month: "May", churn: 3.3, predicted: 3.2, prevented: 2.1 },
  { month: "Jun", churn: 3.0, predicted: 2.9, prevented: 2.4 },
  { month: "Jul", churn: 2.8, predicted: 2.7, prevented: 2.6 },
  { month: "Aug", churn: 2.6, predicted: 2.5, prevented: 2.8 },
  { month: "Sep", churn: 2.5, predicted: 2.4, prevented: 3.0 },
  { month: "Oct", churn: 2.3, predicted: 2.2, prevented: 3.2 },
  { month: "Nov", churn: 2.1, predicted: 2.0, prevented: 3.4 },
  { month: "Dec", churn: 1.9, predicted: 1.8, prevented: 3.6 },
];

export const riskDistribution = [
  { name: "Low", value: 612, color: "var(--color-success)" },
  { name: "Medium", value: 284, color: "var(--color-warning)" },
  { name: "High", value: 96, color: "oklch(0.7 0.18 45)" },
  { name: "Critical", value: 38, color: "var(--color-destructive)" },
];

export const revenueLoss = [
  { month: "Jan", atRisk: 820, recovered: 240 },
  { month: "Feb", atRisk: 760, recovered: 280 },
  { month: "Mar", atRisk: 690, recovered: 320 },
  { month: "Apr", atRisk: 640, recovered: 360 },
  { month: "May", atRisk: 580, recovered: 410 },
  { month: "Jun", atRisk: 520, recovered: 460 },
  { month: "Jul", atRisk: 480, recovered: 510 },
  { month: "Aug", atRisk: 450, recovered: 540 },
];

export const interventionSuccess = [
  { type: "Exec Call", success: 78, failed: 22 },
  { type: "Discount", success: 65, failed: 35 },
  { type: "Onboarding", success: 82, failed: 18 },
  { type: "Training", success: 71, failed: 29 },
  { type: "Account Review", success: 69, failed: 31 },
];

export const sentimentData = [
  { week: "W1", positive: 62, neutral: 28, negative: 10 },
  { week: "W2", positive: 58, neutral: 30, negative: 12 },
  { week: "W3", positive: 64, neutral: 26, negative: 10 },
  { week: "W4", positive: 70, neutral: 22, negative: 8 },
  { week: "W5", positive: 68, neutral: 24, negative: 8 },
  { week: "W6", positive: 73, neutral: 20, negative: 7 },
];

export const healthScore = [
  { day: "Mon", score: 72 }, { day: "Tue", score: 74 }, { day: "Wed", score: 71 },
  { day: "Thu", score: 76 }, { day: "Fri", score: 78 }, { day: "Sat", score: 79 }, { day: "Sun", score: 81 },
];

export const sparkUp = [4, 6, 5, 8, 7, 9, 11, 10, 12, 14];
export const sparkDown = [12, 11, 10, 11, 9, 8, 7, 8, 6, 5];

export const interventions = [
  { id: "INT-2041", customer: "Northwind Labs", action: "Executive review call", manager: "A. Mehra", outcome: "Renewed", before: 92, after: 41, date: "Apr 28, 2026", notes: "Customer agreed to upgraded support tier and roadmap alignment." },
  { id: "INT-2040", customer: "Helios Banking", action: "Renewal discount 12%", manager: "S. Kapoor", outcome: "In Progress", before: 88, after: 64, date: "Apr 26, 2026", notes: "CFO reviewing proposal; follow-up scheduled." },
  { id: "INT-2039", customer: "Acme Retail", action: "Onboarding refresh", manager: "J. Lopez", outcome: "Renewed", before: 81, after: 38, date: "Apr 22, 2026", notes: "Two new admin trainings booked." },
  { id: "INT-2038", customer: "Vector Health", action: "Account health audit", manager: "R. Chen", outcome: "Churned", before: 74, after: 79, date: "Apr 18, 2026", notes: "Budget freeze; no decision-maker access." },
  { id: "INT-2037", customer: "Forge Logistics", action: "Premium support upgrade", manager: "P. Singh", outcome: "Renewed", before: 68, after: 33, date: "Apr 14, 2026", notes: "SLA met for two consecutive quarters." },
];

export const techStack = [
  "ServiceNow", "Predictive Intelligence", "Flow Designer", "IntegrationHub",
  "OpenAI GPT-4", "REST APIs", "Performance Analytics", "Virtual Agent",
];
