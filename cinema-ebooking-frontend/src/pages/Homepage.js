import React, { useState, useEffect, useRef } from 'react';

import './Homepage.css'
import Carousel from '../components/Carousel';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Modal from '../components/Modal';

const Homepage = () => {
  //VIEWPORT TEST
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

 
  //********************************************************************************* */

  //Carousel
  const [items, setItems] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const dummyHold = null;


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

 const dummyMappedItems = items.map(item => {
    return {
      ...item,
      imageUrl: "https://www.colorpalettestore.com/cdn/shop/products/444A50_1024x.png?v=1614624964",
      title: "Dummy Title",
      trailerUrl: "https://youtu.be/dQw4w9WgXcQ",
      genres: "none",
      description: "Dummy Description",
      date: "2024-05-10 05:19:03"
    };
  });

  function handleSelectShowing(showing) {
    sessionStorage.setItem('selectedShowing', JSON.stringify(showing));
    window.location.href = '/select-age';
  }


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
        <Carousel items={items} search={"<"}/>
      </section>

      <section className='soon_carousel'>
        <h2 className='header_font'>Coming Soon</h2>
        <Carousel items={items} search={">"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Adventure</h2>
        <Carousel items={items} search={"Adventure"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Action</h2>
        <Carousel items={scrollPosition < 400 ? dummyMappedItems : items} search={"Action"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Comedy</h2>
        <Carousel items={scrollPosition < 870 ? dummyMappedItems : items} search={"Comedy"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Drama</h2>
        <Carousel items={scrollPosition < 1320 ? dummyMappedItems : items} search={"Drama"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Fantasy</h2>
        <Carousel items={scrollPosition < 1795 ? dummyMappedItems : items} search={"Fantasy"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Horror</h2>
        <Carousel items={scrollPosition < 2280 ? dummyMappedItems : items} search={"Horror"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Romance</h2>
        <Carousel items={scrollPosition < 2750 ? dummyMappedItems : items} search={"Romance"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Sci-FI</h2>
        <Carousel items={scrollPosition < 3220 ? dummyMappedItems : items} search={"Sci-FI"}/>
      </section>

      <section className='playing_carousel'>
        <h2 className='header_font'>Thriller</h2>
        <Carousel items={scrollPosition < 3700 ? dummyMappedItems : items} search={"Thriller"}/>
      </section>

      <Modal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} handleSelectShowing={handleSelectShowing} />
    </>
  )
}

export default Homepage;