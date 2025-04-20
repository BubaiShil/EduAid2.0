import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import JobListing from './Components/JobListing';
import Home from './Pages/Home';
import DemoCourses from './Components/demoCourses';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/landing' element={<App />}/>
      <Route path='/joblisting' element={<JobListing/>}/>
      <Route path='/courses' element={<DemoCourses />}/>
      <Route path='/higlited' element={<DemoCourses />}/>

    </Routes>
    
  
  </BrowserRouter>
  
);
