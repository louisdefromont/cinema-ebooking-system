import React, { useState, useEffect } from 'react';

import './Homepage.css'
import NavBar from '../components/NavBar';
import Carousel from '../components/Carousel';
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
            <NavBar />

            <section>
                <Carousel items={items}/>
            </section>
        </>
    )
}

export default Homepage;