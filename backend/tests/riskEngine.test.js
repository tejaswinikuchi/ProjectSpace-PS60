const {
  calculateRiskScore,
} = require("../riskEngine");

function runRiskEngineTests() {
  console.log(
    "Running Risk Engine Tests..."
  );

  const highRisk =
    calculateRiskScore(
      14,
      8,
      10,
      480000
    );

  console.log(
    "High Risk Customer:",
    highRisk
  );

  const mediumRisk =
    calculateRiskScore(
      5,
      3,
      35,
      180000
    );

  console.log(
    "Medium Risk Customer:",
    mediumRisk
  );

  const lowRisk =
    calculateRiskScore(
      1,
      1,
      70,
      100000
    );

  console.log(
    "Low Risk Customer:",
    lowRisk
  );

  console.log(
    "Risk Engine Tests Completed"
  );
}

runRiskEngineTests();