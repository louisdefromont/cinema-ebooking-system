import React, { useState } from 'react';
import './Login.css'
import NavBar from '../components/NavBar';
import axios from 'axios'; 

const Login = () => {



    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form">
                <p className='mes1'> Your registration is complete. </p>
                <p className='mes2'> A confrimation email has been sent. </p>
				</form>
			</div>
        </>
    )
};

export default Login;