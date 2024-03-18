import React, { useState } from 'react';
import './ForgotPassword.css'
import NavBar from '../components/NavBar';
import axios from 'axios'; 
import emailjs from 'emailjs-com';

emailjs.init("9xrg1u7JrddOMAJz7")


const ForgotPassword = () => { // Receive onEmailEntered as a prop
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
   
   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Send a POST request to the backend endpoint with the email and password
        const response = await axios.post('https://localhost:3000/forgot-password', {
            email: email,
        });

        console.log(response.data); // Log the response from the backend
        // Add logic to handle successful login (e.g., redirect to another page)
        window.location.href = '/reg-confrimation';
    } catch (error) {
        console.error('Error checking email:', error);
        if (error.response && error.response.status === 404) {
            console.error('Error 1');
            alert('There is no account associated with that email');
        } else if (error.response && error.response.status === 404) {
            console.error('Error 2');
            alert('Enter an email');
        } else {
            alert('Email check failed. Please try again later.');
        }
    }
};


    const sendMail = () => {
     let parms = {
        to_email : email,
        }

        emailjs.send("gmailkey", "passwordresettemp", parms)
        .then(alert('Email has been sent!'))
        .catch((error) => console.error('Error sending email:', error));
    }




    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form" onSubmit={handleSubmit}>
                    <p className='prompt'> Enter the email address associated with your account and we will send you a link to reset your password</p>
					<input id="email" type="text" placeholder="email" value={email} onChange={handleEmailChange} />
                    <button className="ripple" onClick={sendMail}>Continue</button>                    
				</form>
			</div>
        </>
    )
};

export default ForgotPassword;