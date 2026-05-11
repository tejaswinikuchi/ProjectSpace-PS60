const {
  loadCustomers,
} = require("./database/databaseService");

const {
  calculateRiskScore,
} = require("./riskEngine");

function runNightlyRiskScoring() {
  console.log(
    "Running automated nightly churn scoring..."
  );

  const customers = loadCustomers();

  const scoredCustomers = customers.map(
    (customer) => {
      const risk = calculateRiskScore(
        customer.loginDays,
        customer.tickets,
        customer.nps,
        customer.arr
      );

      return {
        company: customer.company,
        riskScore: risk.score,
        riskCategory: risk.category,
      };
    }
  );

  console.log(
    "Nightly scoring completed"
  );

  console.log(scoredCustomers);

  return scoredCustomers;
}

module.exports = {
  runNightlyRiskScoring,
};