function sendEmailAlert(customer) {
  return {
    status: "sent",
    channel: "email",
    customer,
    timestamp: new Date(),
  };
}

function sendSlackAlert(customer) {
  return {
    status: "sent",
    channel: "slack",
    customer,
    timestamp: new Date(),
  };
}

function sendTeamsAlert(customer) {
  return {
    status: "sent",
    channel: "teams",
    customer,
    timestamp: new Date(),
  };
}

module.exports = {
  sendEmailAlert,
  sendSlackAlert,
  sendTeamsAlert,
};