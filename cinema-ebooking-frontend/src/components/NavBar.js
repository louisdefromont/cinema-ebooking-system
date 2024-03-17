import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo_holder from './logo_holder.jpg';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import './NavBar.css'

export default function NavBar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:3000/users/me', { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setUser(response.data.user);
                }
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);

    return (
        <nav>
            <img src={logo_holder} alt="logo" length="50" width="50" />

            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href="/movie-search">Movies</a></li>
                <li><a href=' '>Showtimes</a></li>
            </ul>

            {user === null ? (
                <Link to="/login">
                    <Button className='nav_button' variant="contained">Login/Signup</Button>
                </Link>
            ) : (
                <Link to="/account">
                    <Button className='nav_button' variant="contained">Account</Button>
                </Link>
            )}
        </nav>);
}