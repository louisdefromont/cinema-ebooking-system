import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'
import MovieSearch from './pages/MovieSearch';
import Login from './pages/Login'
import Register from './pages/Register';
import UserAccount from './pages/UserAccount';
import AdminControl from './pages/admin/AdminControl';
import AdminPromotions from './pages/admin/Promotions';
import AdminUsers from './pages/admin/Users';
import AdminMovies from './pages/admin/Movies';
import AdminShowtimes from './pages/admin/Showtimes';
import AdminTickets from './pages/admin/Tickets';
import SelectAge from './pages/SelectAge';
import SelectSeats from './pages/SelectSeats';
import OrderSummary from './pages/OrderSummary';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';
import RegConfrim from './pages/RegConfrim';
import PRConfrim from './pages/PRConfirm';
import Activate from './pages/Activate';
import ActivateConfirm from './pages/ActivateConfirm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'




function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route path='/movie-search' element={<MovieSearch />} />
            <Route path='/login' element={<Login />} />
            <Route path='/account' element={<UserAccount />} />
            <Route path='/admin' element={<AdminControl />} />
            <Route path='/admin/promotions' element={<AdminPromotions />} />
            <Route path='/admin/users' element={<AdminUsers />} />
            <Route path='/admin/movies' element={<AdminMovies />} />
            <Route path='/admin/showtimes' element={<AdminShowtimes />} />
            <Route path='/admin/tickets' element={<AdminTickets />} />
            <Route path='/select-age' element={<SelectAge />} />
            <Route path='/select-seats' element={<SelectSeats />} />
            <Route path='/order-summary' element={<OrderSummary/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path='/reg-confrimation' element={<RegConfrim />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/password-reset' element={<PasswordReset />} />
            <Route path='/pr-confirmation' element={<PRConfrim />} />
            <Route path='/activate' element={<Activate />} />
            <Route path='/activate-confirmation' element={<ActivateConfirm />} />
          </Routes>
        </div>

      </Router>
    </LocalizationProvider>
  );

}

export default App;
