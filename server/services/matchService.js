const jobs = require("../utils/jobs");

const matchJobs = (resumeText) => {
  const results = [];

  const lowerText = resumeText.toLowerCase();

  jobs.forEach((job) => {
    let score = 0;

    const keywords = job.description.toLowerCase().split(", ");

    // 🔑 Keyword matching
    keywords.forEach((keyword) => {
      if (lowerText.includes(keyword)) {
        score += 25;
      }
    });

    // 🚀 Bonus intelligent signals
    if (lowerText.includes("project")) score += 10;
    if (lowerText.includes("experience")) score += 10;
    if (lowerText.includes("internship")) score += 10;
    if (lowerText.includes("aws")) score += 10;
    if (lowerText.includes("react")) score += 10;
    if (lowerText.includes("node")) score += 10;

    results.push({
      title: job.title,
      matchScore: Math.min(score, 100),
    });
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = { matchJobs };