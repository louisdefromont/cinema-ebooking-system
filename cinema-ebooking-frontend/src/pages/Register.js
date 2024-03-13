import React, { useState } from 'react';
import './Register.css'
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';

const Register = () => {

    // Define state variables for input fields
    const [email, setEmail] = useState('');
    const [repeatEmail, setRepeatEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    // Add other state variables for personal and payment details if needed

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Log the saved information from the input fields
        console.log("Email:", email);
        console.log("Repeat Email:", repeatEmail);
        console.log("Password:", password);
        console.log("Repeat Password:", repeatPassword);
        // Add logging for other input fields if needed
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatEmailChange = (event) => {
        setRepeatEmail(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

  
    return(
        <>
            <NavBar />

            <form action="" class="register" onSubmit={handleSubmit}>
                <h1> Registration </h1>
                <fieldset class="row1">
                    <legend> Account Details </legend>
                    <p>
                        <label> Email * </label>
                        <input 
                            type="text" 
                            value={email}
                            onChange={handleEmailChange} 
                            placeholder="Enter your email"
                        />
                        <label> Repeat email * </label>
                        <input 
                            type="text" 
                            value={repeatEmail} 
                            onChange={handleRepeatEmailChange} 
                            placeholder="Repeat your email" 
                        />
                    </p>
                    <p>
                        <label> Password * </label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            placeholder="Enter your password" 
                        />                        
                        <label> Repeat Password * </label>
                        <input 
                            type="password" 
                            value={repeatPassword} 
                            onChange={handleRepeatPasswordChange} 
                            placeholder="Repeat your password" 
                        />                        
                        <label class="obinfo"> * obligatory fields </label>
                    </p>
                </fieldset>
                <fieldset class="row2">
                    <legend> Personal Details </legend>
                    <p>
                        <label> First Name * </label>
                        <input type="text" class="long"/>
                    </p>
                    <p>
                        <label> Last Name * </label>
                        <input type="text" class="long"/>
                    </p>
                    <p>
                        <label> Phone * </label>
                        <input type="text" maxlength="10"/>
                    </p>
                    <p>
                        <label class="optional"> Street </label>
                        <input type="text" class="long"/>
                    </p>
                    <p>
                        <label class="optional"> City </label>
                        <input type="text" class="long"/>
                    </p>
                    <p>
                        <label class="optional"> State </label>
                        <select>
                            <option></option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </p>
                </fieldset>
                <fieldset class="row3">
                    <legend> Payment Information </legend>
                    <p>
                        <label class="optional"> Card Holder Name </label>
                        <input type="text" class="long"/>
                    </p>
                    <p>
                        <label class="optional"> Card Number </label>
                        <input type="text" class="long"/>
                    </p>
                    <p>
                        <label class="optional"> CVV </label>
                        <input type="text" class="short"/>
                        <label class="optional"> EXP Date </label>
                        <input type="text" class="short"/>
                    </p>
                    <p>
                        <label class="optional"> Billing Address </label>
                        <input type="text" class="long"/>
                    </p>
                    <p>
                        <label class="optional"> City </label>
                        <input type="text" class="long"/>
                    </p>
                    <p>
                        <label class="optional"> State </label>
                        <select>
                            <option></option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </p>
                </fieldset>
                <div><Button className='button' type="submit" variant="contained">Register</Button></div>

            </form>
        </>
    )
};

export default Register;
