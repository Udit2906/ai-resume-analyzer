# 🧠 AI-Powered Resume Analyzer & ATS Job Matcher

[![Live Demo](https://img.shields.io/badge/Demo-Live_URL-blue?style=for-the-badge)](https://ai-resume-analyzer-ten-gules.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Hugging Face](https://img.shields.io/badge/AI-Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](#)

A full-stack, decoupled AI application designed to parse, analyze, and score PDF resumes against industry-standard roles using Natural Language Processing (NLP) and custom algorithmic matching.

## ✨ Core Features
- **Intelligent PDF Parsing:** Utilizes a custom Node.js/Express backend with `multer` and `pdf-parse` to convert binary PDF buffers into processable text streams.
- **AI NLP Integration:** Leverages the Hugging Face API to run deep semantic analysis, extracting an executive summary, key strengths, weaknesses, and missing skill sets.
- **Algorithmic ATS Scoring:** A custom weighting engine that matches extracted resume keywords against highly sought-after technical roles to simulate real-world Applicant Tracking Systems.
- **Premium 'Glassmorphism' UI:** A responsive, dark-mode-first frontend built with React, Vite, and Tailwind CSS, featuring fluid micro-interactions powered by Framer Motion.
- **Decoupled Architecture:** Cloud-native deployment with the client hosted on Vercel and the RESTful API backend hosted on Render.

## 🛠️ System Architecture & Tech Stack

**Frontend (Client)**
- React (Vite)
- Tailwind CSS (Custom Dark Mode Configuration)
- Framer Motion (State-driven animations)
- Lucide React (Iconography)
- Axios (Asynchronous data fetching)

**Backend (API)**
- Node.js & Express.js
- Multer (Multipart/form-data handling)
- PDF-Parse (Buffer extraction)
- Hugging Face Inference API
- CORS & Dotenv (Environment security)

## 🚀 How It Works (Data Flow)
1. **Client:** User uploads a `.pdf` file via a drag-and-drop dropzone. 
2. **Network:** React sends a `multipart/form-data` POST request to the Node.js API.
3. **Server:** Express intercepts the file, holds it in memory/disk, and parses the raw text.
4. **AI Processing:** The text payload is sent to Hugging Face models for summarization and entity extraction.
5. **Algorithmic Engine:** The server maps the AI output against a predefined schema to calculate an ATS Match Rate and Role Alignment percentages.
6. **Delivery:** The server returns a structured JSON object to the client.
7. **Render:** Framer Motion smoothly orchestrates the data visualization (SVG progress rings, staggered metric cards).

## 💻 Local Setup & Installation

To run this application locally, you will need Node.js installed.

**1. Clone the repository**
```bash
git clone [https://github.com/Udit2906/ai-resume-analyzer.git](https://github.com/Udit2906/ai-resume-analyzer.git)
cd ai-resume-analyzer
