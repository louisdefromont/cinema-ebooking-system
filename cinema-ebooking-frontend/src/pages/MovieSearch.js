import React from 'react';
import { useState, useEffect } from 'react';
import './MovieSearch.css';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Modal from '../components/Modal';
import ReactPlayer from 'react-player';


const MovieSearch = () => {
    const [items, setItems] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [selectedMovie, setSelectedMovie] = useState(null);
    const[tUrl, setTUrl] = useState("");
	const[openTrailer, setOpenTrailer] = useState(false);
    
    // Connect and fetch movies from database
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
        setFilteredMovies(mappedItems);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
    }, []);

    // Clicked movie for modal
    const handleClickOnMovie = (movieTitle) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].title === movieTitle) {
            setSelectedMovie(items[i]);
            break;
          }
        }
    }
    for (let i = 0; i < items.length; i++) {
        items[i].onClick = () => handleClickOnMovie(items[i].title);
    }
    function handleSelectShowing(showing) {
        sessionStorage.setItem('selectedShowing', JSON.stringify(showing));
        window.location.href = '/select-age';
    }
    
    // Searchbar handler
    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = items.filter((item) => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setFilteredMovies(filteredItems);
    }

    

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
                            <li key={index} onClick={item.onClick} >
                                <img src={item.imageUrl} alt={item.title}/>
						        <h3 className='dm-sans-medium'>{item.title}</h3>
                            </li>
				        ))}
                    </ul>
                </div>
            </div>

            <div className='tContainer'>
			
			{openTrailer && <button
            	onClick={() => {
                setOpenTrailer(false);
              	}}
				className='titleCloseBtn'
            	> close </button>
			}
			{openTrailer && <ReactPlayer className='trailer' url={tUrl} />}
			
		    </div>

            <Modal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} handleSelectShowing={handleSelectShowing} />

        </>
    );
};

export default MovieSearch;