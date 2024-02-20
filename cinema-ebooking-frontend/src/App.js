import React, { useState, useEffect } from 'react';
import Carousel from './components/Carousel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Homepage from './pages/Homepage'
import AdminControl from './pages/AdminControl';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/admin-control' element={<AdminControl />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
