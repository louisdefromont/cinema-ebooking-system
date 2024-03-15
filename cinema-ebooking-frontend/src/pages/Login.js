import React, { useState } from 'react';
import './Login.css'
import NavBar from '../components/NavBar';
import axios from 'axios'; 

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Send a POST request to the backend endpoint with the email and password
        const response = await axios.post('http://localhost:3000/login', {
            email: email,
            password: password,
        });

        console.log(response.data); // Log the response from the backend
        // Add logic to handle successful login (e.g., redirect to another page)
    } catch (error) {
        console.error('Error logging in:', error);
        // Add logic to handle login failure (e.g., display error message to the user)
        if (error.response && error.response.status === 400) {
            setErrorMessage('Invalid email or password');
        } else {
            setErrorMessage('Login failed. Please try again later.');
        }
        alert(errorMessage);

    }
};

	const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

	const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form" onSubmit={handleSubmit}>
					<input type="text" placeholder="email" value={email} onChange={handleEmailChange}/>
					<input type="password" placeholder="password" value={password} onChange={handlePasswordChange}/>
					<button className="ripple">login</button>
                    <p class="message">
                    <a href="/forgot-password">Forgot my password</a>
                    </p>
					<p class="message">Not registered? <a href="/register">Create an account</a></p>
				</form>
			</div>
        </>
    )
};

export default Login;