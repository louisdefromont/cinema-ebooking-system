import React, { useState } from 'react';
import './Activate.css'
import NavBar from '../components/NavBar';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';


const Login = () => {
    const location = useLocation();
	const email = new URLSearchParams(location.search).get('email');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to activate account
            const response = await axios.post('https://localhost:3000/activate', {
                email: email,
            });
            console.log(response.data); // Log the response from the backend
           // window.location.href = '/';
            // Add logic to handle successful login (e.g., redirect to another page)
            
        } catch (error) {
            console.error('Error logging in:', error);
            // Add logic to handle login failure (e.g., display error message to the user)
            if (error.response && error.response.status === 404) {
                alert('Invalid email');
            } else {
                alert('Activate failed. Please try again later.');
            }
        }
    };
    

  

    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form" onSubmit={handleSubmit}>
					<button className="ripple">Activate Account</button>
				</form>
			</div>
        </>
    )
};

export default Login;