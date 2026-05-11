const {
  generateRecommendation,
} = require("../aiEngine");

const {
  generateGPTRecommendation,
} = require("../openaiService");

console.log(
  "Running AI Workflow Tests..."
);

const customer = {
  company: "Northwind Labs",
  riskScore: 92,
  riskCategory: "Critical",
  tickets: 8,
  nps: 10,
};

const aiEngineResult =
  generateRecommendation(customer);

console.log(
  "AI Engine Recommendation:",
  aiEngineResult
);

const gptResult =
  generateGPTRecommendation(customer);

console.log(
  "OpenAI Service Recommendation:",
  gptResult
);

console.log(
  "AI Workflow Tests Completed"
);