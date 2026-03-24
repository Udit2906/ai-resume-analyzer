import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file); // 'resume' must match your backend multer config!

    try {
      // Make sure your backend is running on port 5000!
      const response = await axios.post('https://ai-resume-api-l0on.onrender.com/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to upload and analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">AI Resume Analyzer</h1>
          <p className="mt-2 text-lg text-gray-600">Upload your resume to get AI feedback and instant job matches.</p>
        </div>

        {/* Upload Card */}
        <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-200">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 bg-gray-50 hover:bg-gray-100 transition-colors">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange} 
              className="mb-6 text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer transition-colors"
            />
            
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Analyzing with AI...
                </>
              ) : 'Analyze Resume'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {/* 🎨 The Beautiful Dashboard (Only shows when result exists) */}
        {result && result.data && (
          <div className="space-y-6 animate-fade-in-up">
            
            {/* Score & Summary Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 relative w-28 h-28 flex items-center justify-center bg-blue-50 rounded-full border-4 border-blue-500 shadow-inner">
                <div className="text-center">
                  <span className="text-3xl font-black text-blue-700">{result.data.score}</span>
                  <span className="text-xs text-blue-500 block -mt-1">/ 100</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">Resume Score</h2>
                <p className="text-gray-600 mt-2 leading-relaxed">{result.data.summary}</p>
              </div>
            </div>

            {/* 3-Column Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Strengths */}
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">💪 Strengths</h3>
                <ul className="list-disc pl-5 text-green-700 space-y-2 text-sm">
                  {result.data.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              
              {/* Weaknesses */}
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">⚠️ Needs Work</h3>
                <ul className="list-disc pl-5 text-orange-700 space-y-2 text-sm">
                  {result.data.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">🔍 Missing Skills</h3>
                <ul className="list-disc pl-5 text-red-700 space-y-2 text-sm">
                  {result.data.missingSkills?.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>

            {/* Job Matches (The Recruiter Hook) */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">🎯 Top Job Matches</h3>
              <div className="space-y-4">
                {result.jobMatches?.map((job, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-800 mb-2 sm:mb-0">{job.title}</span>
                    <div className="flex items-center gap-4 w-full sm:w-1/2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-2.5 rounded-full ${job.matchScore > 75 ? 'bg-green-500' : job.matchScore > 50 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                          style={{ width: `${job.matchScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-700 min-w-[3rem] text-right">{job.matchScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;