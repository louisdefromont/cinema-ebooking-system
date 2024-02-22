import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'
import MovieSearch from './pages/MovieSearch';
import Login from './pages/Login'
import AdminControl from './pages/admin/AdminControl';
import AdminPromotions from './pages/admin/Promotions';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/movie-search' element={<MovieSearch />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminControl />} />
          <Route path='/admin/promotions' element={<AdminPromotions />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
