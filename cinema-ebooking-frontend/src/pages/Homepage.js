import React, { useState, useEffect } from 'react';

import './Homepage.css'
import Carousel from '../components/Carousel';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';


const Homepage = () => {

  //Carousel
  const [items, setItems] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClickOnMovie = (movieTitle) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].title === movieTitle) {
        setSelectedMovie(items[i]);
        break;
      }
    }
  }

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
        console.log(items);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  for (let i = 0; i < items.length; i++) {
    items[i].onClick = () => handleClickOnMovie(items[i].title);
  }

  return (
    <>
      <NavBar />

      <section className='playing_carousel'>
        <h2 className='header_font'>Now Showing</h2>
        <Carousel items={items} />
      </section>

      <section className='soon_carousel'>
        <h2 className='header_font'>Coming Soon</h2>
        <Carousel items={items} />
      </section>
      <Dialog open={selectedMovie !== null} onClose={() => setSelectedMovie(null)}>
        <DialogTitle>{selectedMovie?.title}</DialogTitle>
        <DialogContent>
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + selectedMovie?.trailerUrl.replace("https://youtu.be/", "")}
            title={selectedMovie?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedMovie(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Homepage;