import React from 'react';
import { useState, useEffect } from 'react';
import './MovieSearch.css';
import NavBar from '../components/NavBar';
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
                    <div className='InputContainer'>
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
                    <form>
                        <fieldset>
                            <h2> Filter </h2>
                            <p>
                                <input type="checkbox" value=""/>
                                <label className='filter_label'> Action </label>
                            </p>
                            <p>
                                <input type="checkbox" value=""/>
                                <label className='filter_label'> Comedy </label>
                            </p>
                            <p>
                                <input type="checkbox" value=""/>
                                <label className='filter_label'> Drama </label>
                            </p>
                            <p>
                                <input type="checkbox" value=""/>
                                <label className='filter_label'> Fanstasy </label>
                            </p>
                            <p>
                                <input type="checkbox" value=""/>
                                <label className='filter_label'> Horror </label>
                            </p>
                            <p>
                                <input type="checkbox" value=""/>
                                <label className='filter_label'> Romance </label>
                            </p>
                            <p>
                                <input type="checkbox" value=""/>
                                <label className='filter_label'> Sci FI </label>
                            </p>
                            <p>
                                <input type="checkbox" value=""/>
                                <label className='filter_label'> Thriller </label>
                            </p>
                        </fieldset>
                    </form>
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

export default MovieSearch;