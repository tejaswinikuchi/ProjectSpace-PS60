import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/ai-insights")({
  component: AIInsightsPage,
});

function AIInsightsPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [recommendation, setRecommendation] =
    useState<any>(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await fetch(
          "http://localhost:5000/customers"
        );

        const data = await response.json();

        setCustomers(data);

        if (data.length > 0) {
          setSelectedCustomer(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCustomers();
  }, []);

  async function generateAIRecommendation() {
    if (!selectedCustomer) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/ai-recommendation",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(selectedCustomer),
        }
      );

      const data = await response.json();

      setRecommendation(data);

      console.log("AI Recommendation:", data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function createAIIntervention() {
    if (!recommendation) return;

    try {
      await fetch(
        "http://localhost:5000/interventions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customer: recommendation.company,
            action:
              recommendation.recommendations[0],
            manager: "AI Automation Engine",
            status: "AI Generated",
          }),
        }
      );

      setMessage(
        "AI intervention workflow created successfully."
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            AI Insights Engine
          </h1>

          <p className="text-sm text-muted-foreground">
            AI-generated churn retention recommendations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
            value={selectedCustomer?.id || ""}
            onChange={(e) => {
              const customer = customers.find(
                (c) =>
                  c.id === Number(e.target.value)
              );

              setSelectedCustomer(customer);
            }}
          >
            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.company}
              </option>
            ))}
          </select>

          <Button onClick={generateAIRecommendation}>
            {loading
              ? "Generating..."
              : "Generate Recommendation"}
          </Button>
        </div>
      </div>

      <Card className="glass p-6">
        {!recommendation ? (
          <div className="py-10 text-center text-muted-foreground">
            Select a customer and generate AI
            insights.
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">
                {recommendation.company}
              </h2>

              <div className="mt-2 flex items-center gap-3">
                <Badge>
                  {recommendation.riskCategory}
                </Badge>

                <span className="text-sm text-muted-foreground">
                  Risk Score:
                  {" "}
                  {recommendation.riskScore}
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">
                AI Recommendations
              </h3>

              <div className="space-y-3">
                {recommendation.recommendations.map(
                  (
                    rec: string,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-secondary/30 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-black">
                          {index + 1}
                        </div>

                        <div>
                          <p className="text-sm">
                            {rec}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={createAIIntervention}
              >
                Create AI Intervention
              </Button>

              {message && (
                <div className="flex items-center rounded border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                  {message}
                </div>
              )}
            </div>

            <div className="rounded-lg border border-border bg-secondary/20 p-4">
              <div className="mb-2 text-sm font-medium">
                AI Engine Status
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  AI Recommendation Engine
                </Badge>

                <Badge variant="outline">
                  Backend API Active
                </Badge>

                <Badge variant="outline">
                  Dynamic Inference
                </Badge>

                <Badge variant="outline">
                  Live Customer Selection
                </Badge>

                <Badge variant="outline">
                  Workflow Automation
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Card>
    </AppShell>
  );
}