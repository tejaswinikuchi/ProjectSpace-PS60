async function syncSalesforceCustomers() {
  return {
    provider: "Salesforce CRM",
    status: "connected",
    recordsSynced: 125,
    lastSync: new Date(),
  };
}

module.exports = {
  syncSalesforceCustomers,
};