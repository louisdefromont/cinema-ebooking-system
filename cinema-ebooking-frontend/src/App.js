import React, { useState, useEffect } from 'react';
import Carousel from './components/Carousel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Homepage from './components/Homepage'
import AdminMainScreen from './components/AdminMainScreen';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/AdminMainScreen' element={<AdminMainScreen />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
