import React from 'react';
import { useState, useEffect } from 'react';
import './MovieSearch.css';
import NavBar from '../components/NavBar';
import Card from '@mui/material/Card';
import axios from 'axios';


const MovieSearch = () => {
    const [items, setItems] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([])
    const [searchItem, setSearchItem] = useState('')
    
    // Searchbar handler
    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = items.filter((item) => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setFilteredMovies(filteredItems);
    }

    // Connect and fetch movies from database
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
        setFilteredMovies(mappedItems);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
    }, []);

    return(
        <>
            <NavBar />

            <div  className='grid-container'>
                <div className="grid-item-1">
                <div  className='InputContainer'>
                    <input
                        type="text"
                        value={searchItem}
                        onChange={handleInputChange}
                        placeholder='Search Movies'
                        className='input'
                    />
                </div>
                </div>

                <div className="grid-item-2">
                    <Card selected className='filter-card'>
                        <h3> Card </h3>
                    </Card>
                </div>

                <div className="grid-item-3">
                    <ul>
                        {filteredMovies.map((item, index) => (
                            <li key={index}>
                                <img src={item.imageUrl} alt={item.title} />
						        <h3 className='dm-sans-medium'>{item.title}</h3>
                            </li>
				        ))}
                    </ul>
                </div>
            </div>

        </>
    );
};
// <li key={index}> {item.title} </li>
export default MovieSearch;