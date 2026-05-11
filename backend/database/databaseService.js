const fs = require("fs");

function loadCustomers() {
  return JSON.parse(
    fs.readFileSync("./data/customers.json")
  );
}

function loadInterventions() {
  return JSON.parse(
    fs.readFileSync("./data/interventions.json")
  );
}

function saveInterventions(data) {
  fs.writeFileSync(
    "./data/interventions.json",
    JSON.stringify(data, null, 2)
  );
}

module.exports = {
  loadCustomers,
  loadInterventions,
  saveInterventions,
};