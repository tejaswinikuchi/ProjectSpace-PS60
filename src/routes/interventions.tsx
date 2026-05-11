import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/interventions")({
  component: InterventionsPage,
});

function InterventionsPage() {
  const [interventions, setInterventions] =
    useState<any[]>([]);

  const [customer, setCustomer] = useState("");

  const [action, setAction] = useState("");

  const [manager, setManager] = useState("");

  async function loadInterventions() {
    try {
      const response = await fetch(
        "http://localhost:5000/interventions"
      );

      const data = await response.json();

      setInterventions(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadInterventions();
  }, []);

  async function createIntervention() {
    if (!customer || !action || !manager) {
      return;
    }

    try {
      await fetch(
        "http://localhost:5000/interventions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customer,
            action,
            manager,
            status: "Pending",
          }),
        }
      );

      setCustomer("");
      setAction("");
      setManager("");

      loadInterventions();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Intervention Workflows
          </h1>

          <p className="text-sm text-muted-foreground">
            Backend-driven intervention management
          </p>
        </div>
      </div>

      <Card className="glass mb-6 p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Create New Intervention
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value)
            }
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />

          <input
            type="text"
            placeholder="Intervention Action"
            value={action}
            onChange={(e) =>
              setAction(e.target.value)
            }
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />

          <input
            type="text"
            placeholder="Manager Name"
            value={manager}
            onChange={(e) =>
              setManager(e.target.value)
            }
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <Button onClick={createIntervention}>
            Create Intervention
          </Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {interventions.map((item) => (
          <Card
            key={item.id}
            className="glass p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {item.customer}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.action}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Managed by:
                  {" "}
                  {item.manager}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge>
                  {item.status}
                </Badge>

                <Badge variant="outline">
                  Workflow Active
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}