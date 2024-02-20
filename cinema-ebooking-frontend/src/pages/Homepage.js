import React, { useState, useEffect } from 'react';

import './Homepage.css'
import logo_holder from '../components/logo_holder.jpg'
import Carousel from '../components/Carousel';
import axios from 'axios';
import Button from '@mui/material/Button'


const Homepage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:3000/movies')
      .then(response => {
        const movies = response.data;
        const mappedItems = movies.map(movie => {
          return {
            imageUrl: movie.thumbnailUrl,
            title: movie.title
          };
        });
        setItems(mappedItems);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
    }, []);

    return(
        <>
            <nav>
                <img src={logo_holder} alt="logo" length="50" width="50" />
                
                <ul>
                    <li><a href=" ">Movies</a></li>
                    <li><a href=' '>Showtimes</a></li>
                    <li><a href=' '>Search</a></li>
                    
                </ul>

                <Button variant="contained">Login/Signup</Button>
            </nav>

            <section>
                <Carousel items={items}/>
            </section>
        </>
    )
}

export default Homepage;