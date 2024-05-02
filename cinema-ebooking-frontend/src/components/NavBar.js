import React, { useState, useEffect } from 'react';
import axios from 'axios';
import website_logo from './website_logo.jpg';
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
            <img src={website_logo} alt="logo" length="50" width="50" />

            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href="/movie-search">Movies</a></li>
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