const {
  runNightlyRiskScoring,
} = require("../scheduler");

console.log(
  "Starting Scheduler Tests..."
);

runNightlyRiskScoring();

console.log(
  "Scheduler Tests Completed"
);