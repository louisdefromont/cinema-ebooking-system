import React, { useState, useEffect } from 'react';
import './Payment2.css';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';
import axios from 'axios'; 



const Payment2 = ({ email }) => {
    useEffect(() => {
        if (email === null) {
            console.log('Email prop is null in Payment2 component');
        } else if (email === '') {
            console.log('Email prop is an empty string in Payment2 component');
        } else {
            console.log('Email received in Payment2 component:', email);
        }
    }, [email]);
    
    /** 
    useEffect(() => {
        console.log('Email received in Payment2 component:', email);
      }, [email]);
*/
   // Define state variables for input fields 
    const [cardName, setCardName] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardExpDate, setCardExpDate] = useState('');
    const [billAdd, setBillAdd] = useState('');
    const [billCity, setBillCity] = useState('');
    const [billState, setBillState] = useState('');
    

    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const buttonClicked = event.target.type === 'submit' ? event.target.name : null;
            if (buttonClicked === 'add') {
                if (!cardName || !cardNo || !cvv || !cardExpDate || !billAdd || !billCity || !billState) {
                    window.alert("Some payment information is missing");
                    throw new Error("Pay info missing");
                }
            }
    
            // Send a POST request to the new endpoint for adding payment cards
            const response = await axios.post('http://localhost:3000/paymentcards', {
                email: email,
                //userId: 15,
                cardName: cardName,
                cardNum: cardNo,
                cvv: cvv,
                expirationDate: cardExpDate,
                billingAddress: billAdd,
                billCity: billCity,
                billState: billState
            });
    
            console.log(response.data); // Log the response from the backend
    
            // Redirect based on button clicked
            if (buttonClicked === 'register') {
              //  window.location.href = '/reg-confrimation';
            } else if (buttonClicked === 'add') {
             //   window.location.href = '/payment3';
            } 
    
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("err 1");
                if (error.response.data.error === 'Email already exists') {
                    window.alert('An account with the email already exists');
               // } else if (error.response.data.error === 'Required fields are missing') {
               //     window.alert('Please fill out all required fields');
               } else {
                    window.alert('Please fill out all required fields');
                }
            } else {
                console.log("err 2");
                console.error('Error adding payment card:', error);
                window.alert('Error adding payment card. Please try again later.');
            }
        }
    };
    
  
    const handleCardNameChange = (event) => {
        setCardName(event.target.value);
    };
    const handleCardNoChange = (event) => {
        setCardNo(event.target.value);
    };
    const handleCvvChange = (event) => {
        setCvv(event.target.value);
    };
    const handleCardExpDateChange = (event) => {
        setCardExpDate(event.target.value);
    };
    const handleBillAddChange = (event) => {
        setBillAdd(event.target.value);
    };
    const handleBillCityChange = (event) => {
        setBillCity(event.target.value);
    };
    const handleBillStateChange = (event) => {
        setBillState(event.target.value);
    };
 
    

 
   return(
       <>
           <NavBar />


           <form action="" class="register" onSubmit={handleSubmit}>
               <h1> Payment Method 2 </h1>
               <fieldset class="row3">
                   <legend> Payment Information </legend>
                   <p>
                       <label class="optional"> Card Holder Name </label>
                       <input 
                            type="text" 
                            class="long"
                            value={cardName}
                            onChange={handleCardNameChange}
                       />
                   </p>
                   <p>
                       <label class="optional"> Card Number </label>
                       <input 
                            type="text" 
                            class="long"
                            value={cardNo}
                            onChange={handleCardNoChange}
                       />
                    </p>
                   <p>
                       <label class="optional"> CVV </label>
                       <input 
                            type="text" 
                            class="short"
                            value={cvv}
                            onChange={handleCvvChange}
                       />
                       <label class="optional"> EXP Date </label>
                       <input type="text" class="short"/>
                       <input 
                            type="text" 
                            class="short"
                            value={cardExpDate}
                            onChange={handleCardExpDateChange}
                       />
                   </p>
                   <p>
                       <label class="optional"> Billing Address </label>
                       <input 
                            type="text" 
                            class="long"
                            value={billAdd}
                            onChange={handleBillAddChange}
                       />
                   </p>
                   <p>
                       <label class="optional"> City </label>
                       <input 
                            type="text" 
                            class="long"
                            value={billCity}
                            onChange={handleBillCityChange}
                       />
                   </p>
                   <p>
                       <label class="optional"> State </label>
                       <select value={billState} onChange={handleBillStateChange}>
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

               <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}><Button className='button' type="submit" variant="contained" name="register" onClick={handleSubmit}>Register</Button></div>
               <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}><Button className='button' type="submit" variant="contained" name="add" onClick={handleSubmit}>Add 3rd Payment Method</Button></div>
               <p>Your email: {email}</p>
           </form>
       </>
   )
};


export default Payment2;
