import React, { useState, useEffect } from 'react';

import './Homepage.css'
import Carousel from '../components/Carousel';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import AddShowing from '../components/AddShowing';


const Homepage = () => {

  //Carousel
  const [items, setItems] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [isAddingShowing, setIsAddingShowing] = useState(false);

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
            id: movie.id,
            imageUrl: movie.thumbnailUrl,
            title: movie.title,
            trailerUrl: movie.trailerUrl,
            date: movie.releaseDate,
            genres: movie.genres,
            description: movie.description,
            duration: movie.durationMinutes,
            showings: movie.showings
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

      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <div style={{ maxWidth: '600px', textAlign: 'center' }}>
          {user && (
            <h1 className='header_font' style={{ fontSize: '2.5rem' }}>Welcome {user.firstName && user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()}</h1>
          )}
        </div>
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
            <h2>{selectedMovie?.genres}</h2>
            <h3>Showtimes:</h3>
            <ul>
              {selectedMovie?.showings.map(showing => (
                <li key={showing.id}>
                  <span>{new Date(showing.dateTime).toLocaleString()}</span>
                  <Button color="primary" component="a" href="/select-age">
                    Buy Tickets
                  </Button>
                </li>
              ))}
              <li>
                <Button variant="contained" onClick={() => setIsAddingShowing(true)} color="primary">
                  Add showing
                </Button>
              </li>
            </ul>
          </div>
          <AddShowing isAddingShowing={isAddingShowing} setIsAddingShowing={setIsAddingShowing} movie={selectedMovie} />
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