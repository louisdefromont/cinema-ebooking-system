import React, { useState, useEffect } from 'react';

import './Homepage.css'
import logo_holder from './logo_holder.jpg'
import Carousel from '../Carousel';
import axios from 'axios';


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
                <img src={logo_holder} alt="logo" length="100" width="100" />
                <ul>
                    <li><a href=" ">Movies</a></li>
                    <li><a href=' '>Showtimes</a></li>
                    <li><a href=' '>Search</a></li>
                    <li><a href=' '>Login/Signup</a></li>
                </ul>
            </nav>

            <section>
                <Carousel items={items}/>
            </section>
        </>
    )
}

export default Homepage;