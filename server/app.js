require("dotenv").config({ path: __dirname + "/.env" });

console.log("API KEY CHECK:", process.env.OPENAI_API_KEY);

const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");


const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});