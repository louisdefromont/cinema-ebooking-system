import React, { useState } from 'react';
import './RegConfrim.css'
import NavBar from '../components/NavBar';

const RegConfrim = () => {
  

    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form">
                <p className='mes1'> Your registration is complete.</p>
                <p className='mes2'> Check your email to activate account. A confrimation email has been sent. </p>
				</form>
			</div>
        </>
    )
};

export default RegConfrim;