async function generateGPTRecommendation(customer) {
  return {
    provider: "OpenAI GPT-4",

    customer: customer.company,

    recommendation:
      "Offer retention discount and executive engagement strategy.",

    riskExplanation:
      "Customer exhibits high churn probability due to declining engagement, elevated support tickets, and low NPS score.",
  };
}

module.exports = {
  generateGPTRecommendation,
};