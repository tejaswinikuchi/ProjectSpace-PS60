function generateRecommendation(customer) {
  const recommendations = [];

  if (customer.riskScore >= 80) {
    recommendations.push(
      "Schedule executive retention call immediately."
    );

    recommendations.push(
      "Offer premium support upgrade."
    );
  }

  if (customer.tickets > 5) {
    recommendations.push(
      "Assign dedicated support engineer."
    );
  }

  if (customer.nps < 20) {
    recommendations.push(
      "Trigger customer satisfaction recovery workflow."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Customer health stable. Continue monitoring."
    );
  }

  return {
    company: customer.company,
    riskScore: customer.riskScore,
    riskCategory: customer.riskCategory,
    recommendations,
    generatedBy: "AI Recommendation Engine",
  };
}

module.exports = {
  generateRecommendation,
};