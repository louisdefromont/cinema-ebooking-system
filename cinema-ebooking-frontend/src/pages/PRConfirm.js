import React, { useState } from 'react';
import './RegConfrim.css'
import NavBar from '../components/NavBar';

const PRConfrim = () => {
  

    return(
        <>
            <NavBar />

			<div class="form">
				<form class="login-form">
                <p className='mes1'> Password reset  has been sent. </p>
                <p className='mes2'> Check your email for a link to change your password. </p>
				</form>
			</div>
        </>
    )
};

export default PRConfrim;