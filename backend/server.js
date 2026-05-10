const express = require("express");
const cors = require("cors");
const fs = require("fs");

const { calculateRiskScore } = require("./riskEngine");
const { generateRecommendation } = require("./aiEngine");

const app = express();

app.use(cors());
app.use(express.json());

const rawCustomers = JSON.parse(
  fs.readFileSync("./data/customers.json")
);

let interventions = JSON.parse(
  fs.readFileSync("./data/interventions.json")
);

const customers = rawCustomers.map((customer) => {
  const risk = calculateRiskScore(
    customer.loginDays,
    customer.tickets,
    customer.nps,
    customer.arr
  );

  return {
    id: customer.id,
    company: customer.company,
    riskScore: risk.score,
    riskCategory: risk.category,
    arr: customer.arr,
    industry: customer.industry,
    tickets: customer.tickets,
    nps: customer.nps,
  };
});

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.post("/ai-recommendation", (req, res) => {
  const customer = req.body;

  const result = generateRecommendation(customer);

  res.json(result);
});

app.get("/interventions", (req, res) => {
  res.json(interventions);
});

app.post("/interventions", (req, res) => {
  const intervention = {
    id: interventions.length + 1,
    ...req.body,
  };

  interventions.push(intervention);

  fs.writeFileSync(
    "./data/interventions.json",
    JSON.stringify(interventions, null, 2)
  );

  res.json({
    message: "Intervention saved successfully",
    intervention,
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "Backend running successfully",
    apis: [
      "/customers",
      "/health",
      "/ai-recommendation",
      "/interventions",
    ],
    persistence: "JSON database connected",
    architecture: "Full-stack REST architecture active",
  });
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});