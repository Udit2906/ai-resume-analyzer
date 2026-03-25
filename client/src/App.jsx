import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, XCircle, Target, Briefcase, Sparkles, Loader2 } from 'lucide-react';

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
    formData.append('resume', file);

    try {
      // Pointing to your live backend!
      const response = await axios.post('https://ai-resume-api-l0on.onrender.com/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  // 🎬 Elite Animation Variants
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-blue-500/30 relative overflow-hidden pb-24">
      
      {/* 🌌 Ambient AI Glowing Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djp1xuw6p/image/upload/v1711475711/grid-pattern_qev83s.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 space-y-16">
        
        {/* ✨ Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-blue-400 text-sm font-medium border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <Sparkles className="w-4 h-4" /> Proprietary AI Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
            Unfair <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">Advantage.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Deploy advanced NLP to extract actionable insights, uncover blind spots, and algorithmically match your resume to elite technical roles.
          </p>
        </motion.div>

        {/* 🚀 The Glassmorphism Dropzone */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-2 border border-white/10 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="bg-[#0A0A0A] rounded-[1.75rem] p-8 md:p-12 relative overflow-hidden">
              <div className="relative flex flex-col items-center justify-center border border-dashed border-slate-700/50 rounded-2xl p-12 bg-slate-900/30 hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300 group/dropzone cursor-pointer">
                
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="flex flex-col items-center text-center space-y-4 group-hover/dropzone:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-inner border border-white/5 group-hover/dropzone:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                    <UploadCloud className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      {file ? <span className="text-blue-400 flex items-center gap-2"><FileText className="w-4 h-4"/> {file.name}</span> : "Drop your PDF here or browse"}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-mono">Maximum size: 5MB</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className={`mt-6 w-full py-4 rounded-2xl text-white font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading || !file 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                    : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:-translate-y-1 active:translate-y-0 border border-white/10'
                }`}
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing parameters...</>
                ) : (
                  'Initialize Analysis'
                )}
              </button>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 flex items-start gap-3 text-sm overflow-hidden">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* 📊 The "Bento Box" Dashboard */}
        {result && result.data && (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6 pt-12 border-t border-white/10">
            
            {/* Top Row: Score & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Score Ring */}
              <motion.div variants={fadeUp} className="col-span-1 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
                <h3 className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-6 z-10">ATS Match Rate</h3>
                <div className="relative w-40 h-40 flex items-center justify-center z-10">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="transparent" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 440 }}
                      animate={{ strokeDashoffset: 440 - (440 * result.data.score) / 100 }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                      strokeDasharray="440"
                      className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-white tracking-tighter">{result.data.score}</span>
                  </div>
                </div>
              </motion.div>

              {/* Executive Summary */}
              <motion.div variants={fadeUp} className="col-span-1 lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-center">
                <h3 className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-4">Executive Summary</h3>
                <p className="text-slate-300 leading-relaxed text-lg font-light">
                  {result.data.summary}
                </p>
              </motion.div>
            </div>

            {/* Middle Row: Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={fadeUp} className="bg-emerald-500/5 rounded-3xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                <h3 className="font-semibold text-emerald-400 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5"/> Key Strengths</h3>
                <ul className="space-y-3">
                  {result.data.strengths?.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> 
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div variants={fadeUp} className="bg-amber-500/5 rounded-3xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-colors">
                <h3 className="font-semibold text-amber-400 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Areas to Improve</h3>
                <ul className="space-y-3">
                  {result.data.weaknesses?.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.8)]" /> 
                      <span className="leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-rose-500/5 rounded-3xl p-6 border border-rose-500/10 hover:border-rose-500/30 transition-colors">
                <h3 className="font-semibold text-rose-400 mb-4 flex items-center gap-2"><XCircle className="w-5 h-5"/> Missing Skills</h3>
                <ul className="space-y-3">
                  {result.data.missingSkills?.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.8)]" /> 
                      <span className="leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Bottom Row: Job Matches */}
            <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20"><Target className="w-5 h-5" /></div>
                <div>
                  <h3 className="text-xl font-bold text-white">Algorithmic Role Alignment</h3>
                  <p className="text-sm text-slate-500">Based on semantic keyword matching</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {result.jobMatches?.map((job, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-end mb-3">
                      <span className="font-medium text-slate-300 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-500" /> {job.title}
                      </span>
                      <span className="font-mono text-sm text-white">{job.matchScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${job.matchScore}%` }}
                        transition={{ duration: 1.2, delay: 0.8 + (index * 0.15), ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 relative" 
                      >
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        )}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-slate-500 font-light tracking-wide">
            &copy; 2026 AI Resume Analyzer — Udit Kumar Sharma
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;