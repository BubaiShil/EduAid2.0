// src/Pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'daisyui';

function Home() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('eduAidUser'));
    if (user) {
      navigate('/landing');
    }
  }, [navigate]);

  const handleGetStarted = () => {
    setShowSignup(true);
  };

  const handleSignupComplete = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    const userData = { name, email };
    localStorage.setItem('eduAidUser', JSON.stringify(userData));
    setShowSignup(false);
    navigate('/landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
      <div className="text-center max-w-3xl bg-base-100 shadow-2xl p-12 rounded-3xl">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Welcome to EduAid 🚀
          </h1>
          <p className="text-lg text-base-content mb-8">
            Unlock your potential with personalized AI-powered learning roadmaps. Reach your goals faster and smarter!
          </p>
          {/* Optional Illustration - Uncomment and import if you have an image */}
          {/* <img src={LearningIllustration} alt="Learning Illustration" className="max-w-md mx-auto mb-6" /> */}
          <button
            onClick={handleGetStarted}
            className="btn btn-primary btn-lg"
          >
            Get Started
          </button>
        </div>

        {/* Key Features Section (Example) */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-12">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-2 4l-2 2m0 0l2 2m-2-2h4" />
            </svg>
            <h3 className="font-semibold text-lg text-base-content">Personalized Paths</h3>
            <p className="text-sm text-base-content/80">AI-driven roadmaps tailored to your goals.</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="font-semibold text-lg text-base-content">Learn At Your Own Pace</h3>
            <p className="text-sm text-base-content/80">Efficient learning strategies and resources.</p>
          </div>
         
        </div>

        
      </div>

     
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg w-96 text-center scale-100 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <p className="mb-6 text-base-content/70">
              Create your account to unlock personalized learning!
            </p>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full mb-4"
            />

            <button
              onClick={handleSignupComplete}
              className="btn btn-primary w-full"
            >
              Sign Up & Continue
            </button>

            <button
              onClick={() => setShowSignup(false)}
              className="btn btn-ghost w-full mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;