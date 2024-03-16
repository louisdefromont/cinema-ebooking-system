import React, { useState, useEffect } from 'react';
import './PasswordReset.css'
import NavBar from '../components/NavBar';
import axios from 'axios'; 

const PasswordReset = ({ email }) => {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log('Email prop received:', email);
    }, [email]); // Log the email prop when it changes


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to the new endpoint (/change-password) with the email and password
            const response = await axios.post('http://localhost:3000//password-reset', {
                email: email, // Use the email received as a prop
                password: password,
            });
    
            console.log(response.data); // Log the response from the backend
            // Add logic to handle successful password change
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

    /** 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to the backend endpoint with the email and password
            const response = await axios.post('http://localhost:3000/forgot-password', {
                password: password,
            });
    
            console.log(response.data); // Log the response from the backend
            // Add logic to handle successful login (e.g., redirect to another page)
        } catch (error) {
            console.error('Error resetting password:', error);
            // Add logic to handle password reset failure (e.g., display error message to the user)
            if (error.response && error.response.status === 404) {
                alert('There is no account associated with that email');
            } else {
                console.log("YOOOO IM IN HERE");
                alert('Password reset failed. Please try again later.');
            }
        }
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
 
*/
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