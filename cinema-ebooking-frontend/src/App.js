import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
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
import AdminPaymentcard from './pages/admin/Paymentcard';
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
            <Route path='/admin' element={<AdminRoute component={AdminControl} />} />
            <Route path='/admin/promotions' element={<AdminRoute component={AdminPromotions} />} />
            <Route path='/admin/users' element={<AdminRoute component={AdminUsers} />} />
            <Route path='/admin/movies' element={<AdminRoute component={AdminMovies} />} />
            <Route path='/admin/showtimes' element={<AdminRoute component={AdminShowtimes} />} />
            <Route path='/admin/tickets' element={<AdminRoute component={AdminTickets} />} />
            <Route path='/admin/payment' element={<AdminRoute component={AdminPaymentcard} />} />
            <Route path='/select-age' element={<UserRoute component={SelectAge} />} />
            <Route path='/select-seats' element={<UserRoute component={SelectSeats} />} />
            <Route path='/order-summary' element={<UserRoute component={OrderSummary} />} />
            <Route path='/checkout' element={<UserRoute component={Checkout} />} />
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
