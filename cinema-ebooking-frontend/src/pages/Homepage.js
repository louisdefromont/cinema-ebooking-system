import React, { useState, useEffect } from 'react';

import './Homepage.css'
import Carousel from '../components/Carousel';
import NavBar from '../components/NavBar';
import axios from 'axios';


const Homepage = () => {
    //Carousel
    const [items, setItems] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:3000/movies')
      .then(response => {
        const movies = response.data;
        const mappedItems = movies.map(movie => {
          return {
            imageUrl: movie.thumbnailUrl,
            title: movie.title,
            trailerUrl: movie.trailerUrl
          };
        });
        setItems(mappedItems);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
    }, []);

    console.log(items)

    return(
        <>
            <NavBar />

            <section className='playing_carousel'>
              <h2 className='header_font'>Now Showing</h2>
              <Carousel items={items}/>
            </section>

            <section className='soon_carousel'>
              <h2 className='header_font'>Coming Soon</h2>
              <Carousel items={items}/>
            </section>

            
        </>
    )
}

export default Homepage;