import React, { useState } from 'react';
import './Login.css'
import NavBar from '../components/NavBar';
import axios from 'axios'; 

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to check if the user is an admin
            const isAdminResponse = await axios.post('https://localhost:3000/checkAdmin', {
                email: email,
            });
    
            const { isAdmin } = isAdminResponse.data;
    
            // If the user is an admin, log the status and do not proceed with login
            if (isAdmin) {
                window.location.href = '/admin';
                console.log('User is an admin');
                // Optionally display a message or take specific action for admin users
                return;
            }
    
            // Proceed with login if the user is not an admin
            const response = await axios.post('https://localhost:3000/login', {
                email: email,
                password: password,
            }, { withCredentials: true });
            
            console.log(response.data); // Log the response from the backend
            window.location.href = '/';
            // Add logic to handle successful login (e.g., redirect to another page)
            
        } catch (error) {
            console.error('Error logging in:', error);
            // Add logic to handle login failure (e.g., display error message to the user)
            if (error.response && error.response.status === 401) {
                alert('Invalid email or password');
            } else {
                alert('Login failed. Please try again later.');
            }
        }
    };
    

    /** 
   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
 

        // Send a POST request to the backend endpoint with the email and password
        const response = await axios.post('https://localhost:3000/login', {
            email: email,
            password: password,
        }, { withCredentials: true });
        
       
        console.log(response.data); // Log the response from the backend
        window.location.href = '/';
        // Add logic to handle successful login (e.g., redirect to another page)
        
    } catch (error) {
        console.error('Error logging in:', error);
        // Add logic to handle login failure (e.g., display error message to the user)
        if (error.response && error.response.status === 401) {
            alert('Invalid email or password');
        } else {
            alert('Login failed. Please try again later.');
        }

    }
};
*/
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
					<button className="ripple">Activate Account</button>
				</form>
			</div>
        </>
    )
};

export default Login;