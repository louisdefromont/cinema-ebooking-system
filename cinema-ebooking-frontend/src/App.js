import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'
import MovieSearch from './pages/MovieSearch';
import Login from './pages/Login'
import Register from './pages/Register';
import UserAccount from './UserAccount';
import AdminControl from './pages/admin/AdminControl';
import AdminPromotions from './pages/admin/Promotions';
import AdminUsers from './pages/admin/Users';
import AdminMovies from './pages/admin/Movies';
import SelectAge from './pages/SelectAge';
import SelectSeats from './pages/SelectSeats';
import OrderSummary from './pages/OrderSummary';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';
import RegConfrim from './pages/RegConfrim';
import Payment2 from './pages/Payment2';
import Payment3 from './pages/Payment3';



function App() {

  const [email, setEmail] = useState('');

// Function to receive the email from the Register component
const handleEmailChange = (newEmail) => {
  setEmail(newEmail);
  console.log('Email received in App component:', newEmail);
};

useEffect(() => {
  console.log('Email prop after state update:', email);
}, [email]); // This useEffect will run whenever 'email' state changes


  /** 
  // Function to receive the email from the Register component
  const handleEmailChange = (newEmail) => {
        //setEmail('wassupp');

      setEmail(newEmail);
      console.log('Email received in App component:', newEmail); 
      if (email === newEmail) {
        console.log('Email prop has been set correctly:', email);
    } else {
        console.log('Email prop has not been set correctly. Expected:', newEmail, 'but received:', email);
    }
  };
 */

  const handleForgotPassword = (enteredEmail) => {
    setEmail(enteredEmail); // Update email state with the entered email
    console.log('Entered email:', enteredEmail);
  };

  const orderDetails = [
    {
      seatNumber: 'A1',
      type: 'adult',
      cost: 12,
      movie: 'Dune',
      showtime: '6:00 PM',
    },
    {
      seatNumber: 'B3',
      type: 'child',
      cost: 6,
      movie: 'Dune',
      showtime: '6:00 PM',
    },
  ];

  return (
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
          <Route path='/select-age' element={<SelectAge />} />
          <Route path='/select-seats' element={<SelectSeats />} />
          <Route path='/order-summary' element={<OrderSummary orderDetails={orderDetails} />} />
          <Route path='/checkout' element={<Checkout orderDetails={orderDetails} />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/reg-confrimation' element={<RegConfrim />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/password-reset' element={<PasswordReset />} />                   
        </Routes>
      </div>

    </Router>
  );

}

export default App;
