import React from "react";
import './Login.css'
import NavBar from '../components/NavBar';

const Login = () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
	    container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
	    container.classList.remove("right-panel-active");
    });

    return(
        <>
            <NavBar />
            
            <div class="container" id="container">
	            <div class="form-container sign-up-container">
		            <form action="#">
			            <h1>Create Account</h1>
			            <input type="text" placeholder=" First Name" />
			            <input type="text" placeholder="Last Name" />
			            <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Re-Enter Password" />
			            <button>Sign Up</button>
		            </form>
	            </div>
	            <div class="form-container sign-in-container">
		            <form action="#">
			            <h1>Sign in</h1>
			            <input type="text" placeholder="Username" />
			            <input type="password" placeholder="Password" />
			            <a href="ha">Forgot your password?</a>
			            <button>Sign In</button>
		            </form>
	            </div>
	            <div class="overlay-container">
		            <div class="overlay">
			            <div class="overlay-panel overlay-left">
				            <h1>Welcome Back!</h1>
				            <p>To keep connected with us please login with your personal info</p>
				            <button class="ghost" id="signIn">Sign In</button>
			            </div>
			            <div class="overlay-panel overlay-right">
				            <h1>Hello, Friend!</h1>
				            <p>Enter your personal details and start journey with us</p>
				            <button class="ghost" id="signUp">Sign Up</button>
			            </div>
		            </div>
	            </div>
            </div>
        </>
    )
};

export default Login;