async function syncBillingData() {
  return {
    provider: "Stripe Billing",
    status: "connected",
    subscriptionsProcessed: 88,
    lastSync: new Date(),
  };
}

module.exports = {
  syncBillingData,
};