import React, { useState } from 'react';
import './Login.css'
import NavBar from '../components/NavBar';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email:", email); 	
		console.log("Password:", password);
		setEmail('');
        setPassword('');
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
					<p class="message">Not registered? <a href="/register">Create an account</a></p>
				</form>
			</div>
        </>
    )
};

export default Login;