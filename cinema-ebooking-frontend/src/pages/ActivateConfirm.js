import React, { useState } from 'react';
import './ActivateConfirm.css'
import NavBar from '../components/NavBar';

const ActivateConfirm = () => {
  

    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form">
                <p className='mes1'> Your activation is complete.</p>
				</form>
			</div>
        </>
    )
};

export default ActivateConfirm;