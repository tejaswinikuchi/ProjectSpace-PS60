const {
  sendEmailAlert,
  sendSlackAlert,
  sendTeamsAlert,
} = require("../notificationService");

console.log(
  "Running Notification Workflow Tests..."
);

const customer = {
  company: "Northwind Labs",
  riskScore: 92,
  riskCategory: "Critical",
};

const emailResult =
  sendEmailAlert(customer);

console.log(
  "Email Notification:",
  emailResult
);

const slackResult =
  sendSlackAlert(customer);

console.log(
  "Slack Notification:",
  slackResult
);

const teamsResult =
  sendTeamsAlert(customer);

console.log(
  "Teams Notification:",
  teamsResult
);

console.log(
  "Notification Workflow Tests Completed"
);