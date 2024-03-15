import React, { useState } from 'react';
import './ForgotPassword.css'
import NavBar from '../components/NavBar';
import axios from 'axios'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

   
   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Send a POST request to the backend endpoint with the email and password
        const response = await axios.post('http://localhost:3000/forgot-password', {
            email: email,
        });

        console.log(response.data); // Log the response from the backend
        // Add logic to handle successful login (e.g., redirect to another page)
        //        window.location.href = 'http://example.com/reset-password'; // Replace 'http://example.com/reset-password' with your desired URL

    } catch (error) {
        console.error('Error checking email:', error);
        if (error.response && error.response.status === 404) {
            console.error('Error 1');
            setErrorMessage('There is no account associated with that email');
        } else {
            setErrorMessage('Email check failed. Please try again later.');
        }
        alert(errorMessage);
    }
};

	




    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form" onSubmit={handleSubmit}>
                    <p className='prompt'> Enter the email address associated with your account and we will send you a link to reset your password</p>
					<input type="text" placeholder="email" value={email} onChange={handleEmailChange}  />
					<button className="ripple">Continue</button>
				</form>
			</div>
        </>
    )
};

export default ForgotPassword;