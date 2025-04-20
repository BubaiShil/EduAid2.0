import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const navigate = useNavigate();

  const jobListings = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Co.',
      location: 'Remote',
      description: 'Join our growing team as a software engineer.',
      questions: [
        { question: 'What does React primarily help developers build?', answer: 'user interfaces' },
        { question: 'Which keyword creates a constant in JavaScript?', answer: 'const' },
        { question: 'Which array method adds an element to the end?', answer: 'push' },
        { question: 'HTTP stands for?', answer: 'hypertext transfer protocol' },
        { question: 'What is JSX?', answer: 'javascript xml' },
        { question: 'Name the function to update state in React hooks?', answer: 'setstate' },
        { question: 'What does API stand for?', answer: 'application programming interface' },
        { question: 'Which tag is used to include JavaScript in HTML?', answer: 'script' },
        { question: 'Which company maintains React?', answer: 'meta' },
        { question: 'Which hook is used for side effects in React?', answer: 'useeffect' },
      ],
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'Data Co.',
      location: 'New York, NY',
      description: 'We are looking for a skilled data scientist to analyze large datasets.',
      questions: [
        { question: 'What is the primary use of pandas in Python?', answer: 'data analysis' },
        { question: 'What does SQL stand for?', answer: 'structured query language' },
        { question: 'Which algorithm is used for classification in machine learning?', answer: 'decision tree' },
        { question: 'What is a p-value?', answer: 'probability value' },
        { question: 'What does "overfitting" mean in machine learning?', answer: 'model is too complex' },
        { question: 'What is supervised learning?', answer: 'training with labeled data' },
        { question: 'What is the purpose of the K-means algorithm?', answer: 'clustering' },
        { question: 'Which language is commonly used for deep learning?', answer: 'python' },
        { question: 'What is a confusion matrix?', answer: 'performance evaluation tool' },
        { question: 'Which Python library is used for machine learning?', answer: 'scikit-learn' },
      ],
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Product Co.',
      location: 'San Francisco, CA',
      description: 'Looking for a dynamic product manager to drive product strategy.',
      questions: [
        { question: 'What does MVP stand for in product management?', answer: 'minimum viable product' },
        { question: 'What is A/B testing?', answer: 'comparing two versions to determine the best' },
        { question: 'What is Agile methodology?', answer: 'iterative development process' },
        { question: 'What is the purpose of a product roadmap?', answer: 'strategic planning of product features' },
        { question: 'What is a user story?', answer: 'description of a feature from a users perspective' },
        { question: 'What is the primary focus of user-centered design?', answer: 'user needs' },
        { question: 'What is product-market fit?', answer: 'when a product meets market demand' },
        { question: 'What does KPI stand for?', answer: 'key performance indicator' },
        { question: 'What is a Gantt chart?', answer: 'visual project schedule' },
        { question: 'What is a feature backlog?', answer: 'list of product features to develop' },
      ],
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      company: 'Design Co.',
      location: 'Los Angeles, CA',
      description: 'Join our design team to create exceptional user experiences.',
      questions: [
        { question: 'What does UI stand for?', answer: 'user interface' },
        { question: 'What is a wireframe?', answer: 'low-fidelity design blueprint' },
        { question: 'What is the primary focus of UX design?', answer: 'user satisfaction' },
        { question: 'What is a persona in design?', answer: 'fictional representation of a user type' },
        { question: 'What is usability testing?', answer: 'evaluating product by testing it with users' },
        { question: 'What is responsive design?', answer: 'designing for multiple screen sizes' },
        { question: 'What is Figma?', answer: 'design and prototyping tool' },
        { question: 'What is a prototype?', answer: 'interactive version of a product design' },
        { question: 'What is heuristic evaluation?', answer: 'usability inspection method' },
        { question: 'What is the main goal of user research?', answer: 'understanding user needs' },
      ],
    },
    {
      id: 5,
      title: 'Marketing Manager',
      company: 'Market Co.',
      location: 'Chicago, IL',
      description: 'Seeking a strategic marketing manager to enhance brand presence.',
      questions: [
        { question: 'What is SEO?', answer: 'search engine optimization' },
        { question: 'What does PPC stand for?', answer: 'pay-per-click' },
        { question: 'What is a marketing funnel?', answer: 'model describing customer journey' },
        { question: 'What is content marketing?', answer: 'creating valuable content to attract customers' },
        { question: 'What is Google Analytics used for?', answer: 'tracking website traffic' },
        { question: 'What is a target audience?', answer: 'specific group of potential customers' },
        { question: 'What is influencer marketing?', answer: 'collaborating with influencers to promote a brand' },
        { question: 'What is the main goal of email marketing?', answer: 'nurturing leads and retaining customers' },
        { question: 'What is brand awareness?', answer: 'extent to which people recognize a brand' },
        { question: 'What is a CTA?', answer: 'call to action' },
      ],
    },
    {
      id: 6,
      title: 'Web Developer',
      company: 'Dev Co.',
      location: 'Austin, TX',
      description: 'We are looking for a full-stack web developer to join our team.',
      questions: [
        { question: 'What does HTML stand for?', answer: 'hypertext markup language' },
        { question: 'What is CSS used for?', answer: 'styling web pages' },
        { question: 'What does API stand for?', answer: 'application programming interface' },
        { question: 'What is JavaScript used for?', answer: 'adding interactivity to web pages' },
        { question: 'What is a DOM?', answer: 'document object model' },
        { question: 'What is the difference between a GET and POST request?', answer: 'GET retrieves data, POST sends data' },
        { question: 'What is responsive web design?', answer: 'design that adapts to different screen sizes' },
        { question: 'What is Node.js?', answer: 'JavaScript runtime for server-side development' },
        { question: 'What is Express.js?', answer: 'web framework for Node.js' },
        { question: 'What is a RESTful API?', answer: 'API that adheres to REST principles' },
      ],
    },
  ];

  const fuzzyMatch = (input, correct) => {
    const a = input.toLowerCase().replace(/[^a-zA-Z ]/g, '').split(' ');
    const b = correct.toLowerCase().replace(/[^a-zA-Z ]/g, '').split(' ');
    const matchCount = b.filter(word => a.includes(word)).length;
    return matchCount / b.length >= 0.6;
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setCurrentQuestionIndex(0);
    setIsTestCompleted(false);
    setIsAnswerCorrect(false);
    setUserAnswer('');
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const correct = selectedJob.questions[currentQuestionIndex].answer;
    if (fuzzyMatch(userAnswer, correct)) {
      setIsAnswerCorrect(true);
      if (currentQuestionIndex + 1 === selectedJob.questions.length) {
        setIsTestCompleted(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setUserAnswer('');
      }
    } else {
      alert('Incorrect answer. Try again!');
      setIsAnswerCorrect(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully!');
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-base-100 shadow-xl p-4 sticky top-0 flex flex-col border-r border-gray-200">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-8 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-xl font-bold">EduAid Menu</h2>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-ghost justify-start w-full text-left flex items-center gap-2 hover:bg-base-200 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </button>
            <button 
              onClick={() => navigate('/courses')} 
              className="btn btn-ghost justify-start w-full text-left flex items-center gap-2 hover:bg-base-200 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Courses
            </button>
            <button 
              onClick={() => navigate('/joblisting')} 
              className="btn btn-primary justify-start w-full text-left flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Job Listings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="w-full max-w-7xl bg-base-100 shadow-2xl p-10 rounded-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Job Openings</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobListings.map((job) => (
              <div key={job.id} className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="card-body">
                  <h3 className="card-title text-xl font-semibold">{job.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{job.company}</span>
                    <span className="badge badge-outline badge-sm">{job.location}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{job.description}</p>
                  <div className="card-actions justify-end mt-4">
                    <button 
                      onClick={() => handleApplyClick(job)} 
                      className="btn btn-primary"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Application Modal */}
          {isModalOpen && (
            <div className="modal modal-open">
              <div className="modal-box max-w-2xl">
                {!isTestCompleted ? (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Screening Test for {selectedJob.title}</h2>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Question {currentQuestionIndex + 1} of {selectedJob.questions.length}
                        </span>
                        <span className="text-sm font-medium">
                          {Math.round(((currentQuestionIndex) / selectedJob.questions.length) * 100)}% Complete
                        </span>
                      </div>
                      <progress 
                        className="progress progress-primary w-full" 
                        value={currentQuestionIndex} 
                        max={selectedJob.questions.length - 1}
                      ></progress>
                    </div>
                    <p className="mb-4 text-lg font-medium">
                      {selectedJob.questions[currentQuestionIndex].question}
                    </p>
                    <form onSubmit={handleAnswerSubmit}>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Your answer..."
                        className="input input-bordered w-full mb-4"
                        required
                        autoFocus
                      />
                      <div className="modal-action">
                        <button 
                          type="button" 
                          onClick={handleCloseModal} 
                          className="btn btn-ghost"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                        >
                          Submit Answer
                        </button>
                      </div>
                    </form>
                    {isAnswerCorrect && (
                      <div className="alert alert-success mt-4">
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Correct! Moving to next question...</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-4">Application for {selectedJob.title}</h2>
                    <form onSubmit={handleFormSubmit}>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text">Full Name</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Enter your full name" 
                          className="input input-bordered w-full" 
                          required 
                        />
                      </div>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text">Email Address</span>
                        </label>
                        <input 
                          type="email" 
                          placeholder="Enter your email" 
                          className="input input-bordered w-full" 
                          required 
                        />
                      </div>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text">Why are you interested in this position?</span>
                        </label>
                        <textarea 
                          className="textarea textarea-bordered h-24" 
                          placeholder="Your answer..."
                          required
                        ></textarea>
                      </div>
                      <div className="modal-action">
                        <button 
                          type="button" 
                          onClick={handleCloseModal} 
                          className="btn btn-ghost"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListing;