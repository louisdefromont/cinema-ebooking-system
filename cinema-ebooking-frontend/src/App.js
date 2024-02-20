import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
