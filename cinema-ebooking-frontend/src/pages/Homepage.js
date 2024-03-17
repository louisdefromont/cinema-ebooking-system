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
  const [user, setUser] = useState(null);

  const handleClickOnMovie = (movieTitle) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].title === movieTitle) {
        setSelectedMovie(items[i]);
        break;
      }
    }
  }

  useEffect(() => {
    axios.get('https://localhost:3000/movies')
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

  useEffect(() => {
    axios.get('https://localhost:3000/users/me', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []);

  for (let i = 0; i < items.length; i++) {
    items[i].onClick = () => handleClickOnMovie(items[i].title);
  }

  return (
    <>
      <NavBar />

      <section>
        {user && (
          <h1 className='header_font'>Welcome {user.firstName}</h1>
        )}
      </section>

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
          <div>
            <h3>Showtimes:</h3>
            <ul>
              <li>
                <span>Showtime 1: 3:00 PM</span>
                <Button color="primary" component="a" href="/select-age">
                  Buy Tickets
                </Button>
              </li>
              <li>
                <span>Showtime 2: 6:00 PM</span>
                <Button color="primary" component="a" href="/select-age">
                  Buy Tickets
                </Button>
              </li>
              {/* Add more showtimes as needed */}
            </ul>
          </div>
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