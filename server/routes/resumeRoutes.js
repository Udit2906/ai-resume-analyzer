const { matchJobs } = require("../services/matchService");
const express = require("express");
const multer = require("multer");
const { extractTextFromPDF } = require("../services/resumeService");
const { analyzeResume } = require("../services/aiService");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const filePath = req.file.path;

    const text = await extractTextFromPDF(req.file.path);

    const aiResult = await analyzeResume(text.substring(0, 1500));

    const jobMatches = matchJobs(text);

    let parsed;
    try {
      parsed = JSON.parse(aiResult);
    } catch (e) {
      parsed = { raw: aiResult }; // fallback
    }

    res.json({
      message: "Resume analyzed successfully",
      data: JSON.parse(aiResult),
      jobMatches: jobMatches,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ error: error.message || "Failed to analyze resume", });
  }
});

module.exports = router;