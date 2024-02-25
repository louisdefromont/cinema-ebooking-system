import React from "react";
import './Login.css'
import NavBar from '../components/NavBar';

const Login = () => {

    return(
        <>
            <NavBar />

			
			<div class="form">
				<form class="login-form">
					<input type="text" placeholder="username"/>
					<input type="password" placeholder="password"/>
					<button className="ripple">login</button>
					<p class="message">Not registered? <a href="#">Create an account</a></p>
				</form>
			</div>
        </>
    )
};

export default Login;