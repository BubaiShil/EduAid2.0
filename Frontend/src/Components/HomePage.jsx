import React from 'react';
import { Link } from 'react-router-dom';
import App from '../App';

function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to EduAid: AI-powered Study Roadmap Generator
      </h1>
      <App /> {/* Embeds the App component for goal input */}
      <div className="text-center mt-8">
        <Link to="/premium" className="btn btn-accent">Go to Premium Features</Link>
      </div>
    </div>
  );
}

export default HomePage;
