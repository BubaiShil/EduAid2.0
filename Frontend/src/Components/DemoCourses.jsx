import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import udemyCourses from '../assets/csvjson.json';

const DemoCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredCourses = udemyCourses.filter(course =>
    course.course_title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

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
              className="btn btn-primary justify-start w-full text-left flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Courses
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="w-full max-w-7xl bg-base-100 shadow-2xl p-10 rounded-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-primary">🔥 Top Udemy Business Courses</h2>

          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.course_id}
                  className="card bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {course.course_title}
                  </h3>
                  <p className="badge badge-outline mb-3">{course.level}</p>
                  <p className="text-gray-600">💵 Price: ${course.price}</p>
                  <p className="text-gray-600">🎯 Subscribers: {course.num_subscribers}</p>
                  <p className="text-gray-600">📝 Reviews: {course.num_reviews}</p>
                  <p className="text-gray-600">📚 Lectures: {course.num_lectures}</p>
                  <p className="text-gray-600">🕒 Duration: {course.content_duration} hours</p>
                  <p className="text-gray-600">📘 Subject: {course.subject}</p>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-4 w-full text-center"
                  >
                    View Course
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No courses match your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoCourses;