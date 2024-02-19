import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import axios from 'axios';
import Homepage from './components/Homepage'


function App() {
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

  return (
    <Homepage />
    
    
  );

}

export default App;
