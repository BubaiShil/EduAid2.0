import React from 'react';
// import RoadmapDisplay from './Components/RoadDisplay';
// import DemoCourses from './Components/demoCourses';
// import HighlitedText from './Components/HighlitedText';

import DemoCourses from './demoCourses';
import HighlitedText from './HighlitedText';
import RoadmapDisplay from './RoadDisplay';

const PremiumPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex flex-col items-center justify-start p-8">
      <div className="w-full max-w-7xl bg-base-100 shadow-2xl p-10 rounded-3xl">
        <h1 className="text-4xl font-bold text-primary mb-6">Premium Content</h1>
        <RoadmapDisplay />
        <DemoCourses />
        <HighlitedText />
      </div>
    </div>
  );
};

export default PremiumPage;
