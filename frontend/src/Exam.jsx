import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Bookmark, Globe, ChevronRight, HelpCircle } from 'lucide-react';

export default function Exam() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [statuses, setStatuses] = useState({}); // 'answered', 'review', 'review-answered', 'not-visited'
  const [lang, setLang] = useState('En'); // 'En' or 'Hi'
  const [timeLeft, setTimeLeft] = useState(5400); // 90 mins

  // Fetch standard patterns out of backend node
  useEffect(() => {
    fetch('https://rrb-mock-platform-production.up.railway.app/api/exam/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        const initialStatuses = {};
        data.forEach((_, i) => { initialStatuses[i] = 'not-visited'; });
        initialStatuses[0] = 'not-answered';
        setStatuses(initialStatuses);
      })
      .catch(err => console.error("Error communicating with mock engine API:", err));
  }, []);

  // Timer Countdown loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading official TCS iON secure terminal template...</div>;
  }

  const q = questions[currentIdx];

  // Exam Event Handler Controls
 const handleNextQuestion = () => {
  // Guard Rail: If we are on the very last question, stop the page navigation loop!
  if (currentQuestionIndex === questions.length - 1) {
    alert("You have completed all available questions! Please click 'SUBMIT TEST PAPER' to finish.");
    return;
  }
  
  // Otherwise, proceed safely to the next question object index
  setCurrentQuestionIndex(prev => prev + 1);
};

  const saveAndNext = () => {
    const updatedStatuses = { ...statuses };
    if (selectedAnswers[currentIdx] !== undefined) {
      updatedStatuses[currentIdx] = 'answered';
    } else {
      updatedStatuses[currentIdx] = 'not-answered';
    }
    
    if (currentIdx + 1 < questions.length) {
      if (updatedStatuses[currentIdx + 1] === 'not-visited') {
        updatedStatuses[currentIdx + 1] = 'not-answered';
      }
      setCurrentIdx(currentIdx + 1);
    }
    setStatuses(updatedStatuses);
  };

  const markForReview = () => {
    const updatedStatuses = { ...statuses };
    if (selectedAnswers[currentIdx] !== undefined) {
      updatedStatuses[currentIdx] = 'review-answered';
    } else {
      updatedStatuses[currentIdx] = 'review';
    }
    
    if (currentIdx + 1 < questions.length) {
      if (updatedStatuses[currentIdx + 1] === 'not-visited') {
        updatedStatuses[currentIdx + 1] = 'not-answered';
      }
      setCurrentIdx(currentIdx + 1);
    }
    setStatuses(updatedStatuses);
  };

  const clearResponse = () => {
    const updatedAnswers = { ...selectedAnswers };
    delete updatedAnswers[currentIdx];
    setSelectedAnswers(updatedAnswers);
    
    const updatedStatuses = { ...statuses };
    updatedStatuses[currentIdx] = 'not-answered';
    setStatuses(updatedStatuses);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans select-none text-slate-800">
      {/* Official Top Status Ribbon Header */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-4 py-2 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-amber-400 text-slate-950 px-2 py-0.5 text-xs font-black rounded uppercase tracking-wider">RRB Mock Engine</div>
          <h1 className="text-sm font-bold tracking-tight">NTPC STAGE-1 COMPUTER BASED TEST (CBT)</h1>
        </div>
        <div className="flex items-center gap-6 text-xs font-medium">
          <div className="bg-black/20 px-3 py-1.5 rounded-md border border-white/10 flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-blue-300" />
            <span>Language:</span>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent font-bold outline-none cursor-pointer text-amber-300">
              <option value="En" className="text-slate-900">English</option>
              <option value="Hi" className="text-slate-900">हिन्दी (Hindi)</option>
            </select>
          </div>
          <div className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-md font-bold flex items-center gap-2 shadow">
            <Clock className="h-4 w-4 animate-pulse" />
            <span className="font-mono text-sm tracking-widest">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      {/* Primary Simulator Panel Splits */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left 75%: Official Question Context Console Area */}
        <section className="w-3/4 flex flex-col bg-white border-r border-slate-200 overflow-y-auto">
          {/* Active Subject Bar */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex justify-between items-center">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Section: <span className="text-blue-700">{q.subject}</span></span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
              <span>Question Type: 4 Option Multiple Choice Question</span>
            </div>
          </div>

          {/* Question Text Viewer Panel */}
          <div className="p-6 flex-1 space-y-6">
            <div className="flex gap-3 items-start">
              <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded">Q.{currentIdx + 1}</span>
              <h3 className="text-base font-semibold leading-relaxed text-slate-900">
                {lang === 'En' ? q.questionEn : q.questionHi}
              </h3>
            </div>

            {/* Answer Multiple Choice Options Radio Stack */}
            <div className="space-y-3 pl-9">
              {(lang === 'En' ? q.optionsEn : q.optionsHi).map((option, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                return (
                  <button key={idx} onClick={() => handleOptionSelect(idx)} className={`w-full text-left p-3.5 rounded-lg border text-sm transition flex items-center gap-3 ${isSelected ? 'border-blue-600 bg-blue-50/70 font-semibold text-blue-900 shadow-sm' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'}`}>
                    <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-400 bg-white'}`}>
                      {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer Control Ribbon */}
          <footer className="bg-slate-50 border-t border-slate-200 p-3.5 flex justify-between items-center">
            <div className="flex gap-2">
              <button onClick={markForReview} className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded shadow transition uppercase tracking-wide flex items-center gap-1.5">
                <Bookmark className="h-3.5 w-3.5" /> Mark for Review & Next
              </button>
              <button onClick={clearResponse} className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 text-xs font-bold px-4 py-2.5 rounded shadow-sm transition uppercase tracking-wide">
                Clear Response
              </button>
            </div>
            <button onClick={saveAndNext} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-6 py-2.5 rounded shadow-md hover:shadow-lg transition uppercase tracking-wide flex items-center gap-1">
              Save & Next <ChevronRight className="h-4 w-4" />
            </button>
          </footer>
        </section>

        {/* Right 25%: Question Grid Summary Palette Box */}
        <section className="w-1/4 bg-slate-50 flex flex-col overflow-y-auto border-l border-slate-200">
          {/* Profile Header Thumbnail Card */}
          <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center gap-3">
            <div className="h-11 w-11 bg-slate-300 rounded-md border border-slate-400 overflow-hidden shrink-0 flex items-center justify-center font-bold text-slate-600 text-sm tracking-tighter uppercase">Photo</div>
            <div className="text-xs">
              <p className="text-slate-400 font-medium uppercase tracking-wider">Candidate Name</p>
              <p className="font-bold text-slate-800 text-sm">PRASAD KUMAR</p>
            </div>
          </div>

          {/* Palette Color Legends Breakdown Box */}
          <div className="p-4 border-b border-slate-200 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
            <div className="flex items-center gap-2"><div className="h-5 w-5 bg-emerald-600 text-white rounded font-bold flex items-center justify-center shadow-sm text-[10px]">0</div><span>Answered</span></div>
            <div className="flex items-center gap-2"><div className="h-5 w-5 bg-rose-600 text-white rounded font-bold flex items-center justify-center shadow-sm text-[10px]">0</div><span>Not Answered</span></div>
            <div className="flex items-center gap-2"><div className="h-5 w-5 bg-indigo-600 text-white rounded font-bold flex items-center justify-center shadow-sm text-[10px]">0</div><span>Marked Review</span></div>
            <div className="flex items-center gap-2"><div className="h-5 w-5 bg-slate-200 border border-slate-300 text-slate-600 rounded font-bold flex items-center justify-center shadow-sm text-[10px]">0</div><span>Not Visited</span></div>
          </div>

          {/* Interactive Core Question Selector Grid */}
          <div className="p-4 flex-1">
            <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Choose a Question:</p>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((_, idx) => {
                const status = statuses[idx];
                let bgClass = 'bg-slate-200 text-slate-600 border border-slate-300';
                if (status === 'answered') bgClass = 'bg-emerald-600 text-white font-bold shadow';
                if (status === 'not-answered') bgClass = 'bg-rose-600 text-white font-bold shadow';
                if (status === 'review') bgClass = 'bg-indigo-600 text-white font-bold shadow';
                if (status === 'review-answered') bgClass = 'bg-purple-600 text-white font-bold border-2 border-emerald-400 shadow';
                if (currentIdx === idx) bgClass += ' ring-2 ring-offset-2 ring-blue-600 scale-105';

                return (
                  <button key={idx} onClick={() => setCurrentIdx(idx)} className={`h-9 rounded flex items-center justify-center text-xs font-bold transition-all ${bgClass}`}>
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Platform Submission Form Button Wrapper */}
          <div className="p-4 bg-slate-100 border-t border-slate-200">
            <button onClick={() => alert("Are you sure you want to end this exam mock terminal stream? Your results will be saved instantly.")} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-2.5 rounded shadow text-xs uppercase tracking-wider transition">
              Submit Test Paper
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}