import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage'


function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
        </Routes>
      </div>
    </Router>
    
    
    
  );

}

export default App;
