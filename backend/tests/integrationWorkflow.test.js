const {
  syncSalesforceCustomers,
} = require("../integrations/salesforce");

const {
  syncSupportTickets,
} = require("../integrations/zendesk");

const {
  syncBillingData,
} = require("../integrations/stripe");

console.log(
  "Running Integration Workflow Tests..."
);

const salesforceResult =
  syncSalesforceCustomers();

console.log(
  "Salesforce Integration:",
  salesforceResult
);

const zendeskResult =
  syncSupportTickets();

console.log(
  "Zendesk Integration:",
  zendeskResult
);

const stripeResult =
  syncBillingData();

console.log(
  "Stripe Integration:",
  stripeResult
);

console.log(
  "Integration Workflow Tests Completed"
);
