async function syncSupportTickets() {
  return {
    provider: "Zendesk Support",
    status: "connected",
    ticketsProcessed: 42,
    lastSync: new Date(),
  };
}

module.exports = {
  syncSupportTickets,
};