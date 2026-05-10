function calculateRiskScore(loginDays, tickets, nps, arr) {
  let score = 0;

  if (loginDays > 7) score += 25;

  if (tickets > 5) score += 30;

  if (nps < 20) score += 25;

  if (arr > 300000) score += 20;

  if (score >= 80) {
    return {
      score,
      category: "Critical",
    };
  }

  if (score >= 60) {
    return {
      score,
      category: "High",
    };
  }

  if (score >= 35) {
    return {
      score,
      category: "Medium",
    };
  }

  return {
    score,
    category: "Low",
  };
}

module.exports = {
  calculateRiskScore,
};