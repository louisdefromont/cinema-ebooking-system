import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'
import MovieSearch from './pages/MovieSearch';
import Login from './pages/Login'
import Register from './pages/Register';
import AdminControl from './pages/admin/AdminControl';
import AdminPromotions from './pages/admin/Promotions';
import AdminUsers from './pages/admin/Users';
import AdminMovies from './pages/admin/Movies';
import SelectAge from './pages/SelectAge';
import SelectSeats from './pages/SelectSeats';
import OrderSummary from './pages/OrderSummary';


function App() {
  const orderDetails = [
    {
      seatNumber: 'A1',
      type: 'adult',
      cost: 10,
      movie: 'Avengers: Endgame',
      showtime: '12:00 PM',
    },
    {
      seatNumber: 'B3',
      type: 'child',
      cost: 8,
      movie: 'Avengers: Endgame',
      showtime: '12:00 PM',
    },
  ];

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/movie-search' element={<MovieSearch />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<AdminControl />} />
          <Route path='/admin/promotions' element={<AdminPromotions />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/movies' element={<AdminMovies />} />
          <Route path='/select-age' element={<SelectAge />} />
          <Route path='/select-seats' element={<SelectSeats />} />
          <Route path='/order-summary' element={<OrderSummary orderDetails={orderDetails} />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
