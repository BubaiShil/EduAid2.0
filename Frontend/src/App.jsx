import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'daisyui';
import RoadmapDisplay from './Components/RoadDisplay';
import { useNavigate } from 'react-router-dom';

function App() {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState({});
  const [isPremium, setIsPremium] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const navigate = useNavigate();

  const inputRef = useRef(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem('eduaid_progress');
    if (savedProgress) setProgress(JSON.parse(savedProgress));

    const savedRoadmap = localStorage.getItem('eduaid_roadmap');
    if (savedRoadmap) setRoadmap(savedRoadmap);

    const savedGoal = localStorage.getItem('eduaid_goal');
    if (savedGoal) setGoal(savedGoal);

    const savedPremium = localStorage.getItem('eduaid_premium');
    if (savedPremium) setIsPremium(true);

    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (goal) localStorage.setItem('eduaid_goal', goal);
  }, [goal]);

  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem('eduaid_progress', JSON.stringify(progress));
    }
  }, [progress]);

  useEffect(() => {
    if (roadmap) localStorage.setItem('eduaid_roadmap', roadmap);
  }, [roadmap]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setError('');
    setRoadmap('');
    try {
      const res = await axios.post('https://eduaid.onrender.com/generate', { goal, level });
      setRoadmap(res.data.roadmap);
    } catch (err) {
      setError("Error generating roadmap! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const cleanRoadmap = (text) => {
    const labels = [
      "Assumptions", "Roadmap Structure", "Goal", "Topics", "Exercises",
      "Online", "Resources", "Books", "Important Notes",
      "Contribute to Open Source Projects", "Activities", "Milestone"
    ];
    const regex = new RegExp(`(${labels.join('|')}):([\\s\\S]+?)(?=${labels.join('|')}|$)`, 'g');
    let matches = [...text.matchAll(regex)];
    let roadmapSections = {};

    matches.forEach(match => {
      const label = match[1].trim();
      let content = match[2].trim().replace(/(\*\*|__)/g, '').trim();
      if (!roadmapSections[label]) roadmapSections[label] = [];
      roadmapSections[label].push(content);
    });

    return Object.keys(roadmapSections).map(label => ({
      label,
      content: roadmapSections[label].join('\n\n')
    }));
  };

  const toggleTask = (sectionLabel, lineIndex) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      const key = `${sectionLabel}-${lineIndex}`;
      newProgress[key] = !newProgress[key];
      return newProgress;
    });
  };

  const formatContentWithCheckboxes = (sectionLabel, content) => {
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') return null;
      return (
        <label key={index} className="flex items-start gap-3 mb-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={progress[`${sectionLabel}-${index}`] || false}
            onChange={() => toggleTask(sectionLabel, index)}
          />
          <span className={progress[`${sectionLabel}-${index}`] ? "line-through opacity-60" : ""}>
            {line}
          </span>
        </label>
      );
    });
  };

  const clearAll = () => {
    setGoal('');
    setRoadmap('');
    setProgress({});
    setIsPremium(false);
    localStorage.removeItem('eduaid_goal');
    localStorage.removeItem('eduaid_roadmap');
    localStorage.removeItem('eduaid_progress');
    localStorage.removeItem('eduaid_premium');
    inputRef.current?.focus();
  };

  const unlockPremium = () => {
    setIsPremium(true);
    localStorage.setItem('eduaid_premium', 'true');
    setShowPricingModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex">
      {/* Enhanced Sidebar */}
      <div className="w-64 min-h-screen bg-base-100 shadow-xl p-4 sticky top-0 flex flex-col border-r border-gray-200">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-8 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-xl font-bold">EduAid Menu</h2>
          </div>
        
          {isPremium ? (
            <div className="space-y-2">
              <button
                onClick={() => navigate('/courses')}
                className="btn btn-ghost justify-start w-full text-left flex items-center gap-2 hover:bg-base-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Courses
              </button>
              <button
                onClick={() => navigate('/higlitedtext')}
                className="btn btn-ghost justify-start w-full text-left flex items-center gap-2 hover:bg-base-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Local Search
              </button>
              <button
                onClick={() => navigate('/joblisting')}
                className="btn btn-ghost justify-start w-full text-left flex items-center gap-2 hover:bg-base-200 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Job Listings
              </button>
            </div>
          ) : (
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20 mt-4">
              <h3 className="font-medium mb-2">Unlock Premium Features</h3>
              <button
                onClick={() => setShowPricingModal(true)}
                className="btn btn-warning btn-sm w-full mt-2">
                Upgrade Now 🚀
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={clearAll}
            className="btn btn-outline btn-error btn-sm w-full">
            Clear All Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="w-full max-w-7xl bg-base-100 shadow-2xl p-10 rounded-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-primary">EduAid — AI Study Roadmap Generator</h1>
            {isPremium ? (
              <div className="badge badge-success gap-2 text-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Premium User
              </div>
            ) : (
              <button
                className="btn btn-accent gap-2"
                onClick={() => setShowPricingModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Unlock Premium
              </button>
            )}
          </div>

          {/* Pricing Modal */}
          {showPricingModal && (
            <div className="modal modal-open">
              <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-2xl mb-4">Upgrade to Premium</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg mb-2">Basic</h4>
                    <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal">/month</span></p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Unlimited Roadmaps
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Progress Tracking
                      </li>
                    </ul>
                    <button 
                      className="btn btn-outline w-full"
                      onClick={unlockPremium}>
                      Select Plan
                    </button>
                  </div>
                  
                  <div className="border border-primary rounded-lg p-6 hover:shadow-lg transition-shadow relative">
                    <div className="badge badge-primary absolute -top-3 right-4">POPULAR</div>
                    <h4 className="font-bold text-lg mb-2">Pro</h4>
                    <p className="text-3xl font-bold mb-4">$19.99<span className="text-sm font-normal">/month</span></p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Everything in Basic
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Premium Courses
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Job Listings
                      </li>
                    </ul>
                    <button 
                      className="btn btn-primary w-full"
                      onClick={unlockPremium}>
                      Select Plan
                    </button>
                  </div>
                  
                  <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg mb-2">Enterprise</h4>
                    <p className="text-3xl font-bold mb-4">$49.99<span className="text-sm font-normal">/month</span></p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Everything in Pro
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Team Collaboration
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Priority Support
                      </li>
                    </ul>
                    <button 
                      className="btn btn-outline w-full"
                      onClick={unlockPremium}>
                      Select Plan
                    </button>
                  </div>
                </div>
                
                <div className="modal-action">
                  <button 
                    className="btn"
                    onClick={() => setShowPricingModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-8 w-full">
            <div className="flex flex-col gap-3 w-full md:flex-1">
              <input
                ref={inputRef}
                type="text"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="Enter your learning goal (e.g. Learn Python for Data Science)"
                required
                className="input input-bordered input-lg w-full focus:ring-2 focus:ring-primary"
              />
            </div>

            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="select select-bordered select-lg w-full md:w-1/3 focus:ring-2 focus:ring-primary"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full md:w-auto gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                  Generate Roadmap
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="alert alert-error shadow-lg my-6 text-lg font-semibold">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {roadmap && (
            <div className="flex flex-col gap-8 items-center justify-center mt-6">
              <RoadmapDisplay
                roadmap={roadmap}
                isPremium={isPremium}
                progress={progress}
                toggleTask={toggleTask}
                cleanRoadmap={cleanRoadmap}
                formatContentWithCheckboxes={formatContentWithCheckboxes}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;