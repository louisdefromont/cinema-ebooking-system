import React, { useState, useEffect } from 'react';
import './PasswordReset.css'
import NavBar from '../components/NavBar';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');
    console.log("resetEmail =" + email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to the new endpoint (/change-password) with the email and password
            const response = await axios.post('https://localhost:3000/password-reset', {
                email: email, // Use the email received as a prop
                password: password,
            });
            
            console.log(response.data); // Log the response from the backend
            alert('Succesfully changed password');
            window.location.href = '/login';
            
        } catch (error) {
            console.error('Error resetting password:', error);
            // Add logic to handle password reset failure (e.g., display error message to the user)
            if (error.response && error.response.status === 404) {
                console.error('Error 1');
                alert('There is no account associated with that email');
            } else {
                console.error('Error 2');
                alert('Password reset failed. Please try again later.');
            }
        }
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form" onSubmit={handleSubmit}>
                    <p className='prompt'> Reset Password</p>
					<input type="password" placeholder="enter new password" value={password} onChange={handlePasswordChange}/>
					<button className="ripple">Reset</button>
				</form>
			</div>
        </>
    )
};

export default PasswordReset;