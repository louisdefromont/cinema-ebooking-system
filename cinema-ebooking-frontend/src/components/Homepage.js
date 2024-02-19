import React from 'react';

import './Homepage.css'
import logo_holder from './logo_holder.jpg'

const Homepage = () => {

    return(
        <>
            <nav>
                <img src={logo_holder} alt="logo" length="100" width="100" />
                <ul>
                    <li><a href=" ">Movies</a></li>
                    <li><a href=' '>Showtimes</a></li>
                    <li><a href=' '>Search</a></li>
                    <li><a href=' '>Login/Signup</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Homepage;