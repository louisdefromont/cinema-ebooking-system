import React from 'react';
import { useState, useEffect } from 'react';
import './MovieSearch.css';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Modal from '../components/Modal';
import ReactPlayer from 'react-player';
import Button from '@mui/material/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const MovieSearch = () => {
    const [items, setItems] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [tUrl, setTUrl] = useState("");
	const [openTrailer, setOpenTrailer] = useState(false);
    const [date, setDate] = useState(new Date());
    
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

    // Filter Checkbox handler
    const filterHandler = (filter) => {
        const filterTerm = filter.target.value;
        const filteredItems = filteredMovies.filter((item) =>
            item.genres.toLowerCase().includes(filterTerm.toLowerCase())
        );
        
        setFilteredMovies(filteredItems);
    }

    const dateChange = (e) => {
        setDate(e);
        const filteredItems = filteredMovies.filter((item) =>
            new Date(item.date) - new Date(e) < 0
        );
        setFilteredMovies(filteredItems);
    }

    const [genres, setGenres] = useState({
        adventure: false,
        action: false,
        comedy: false,
        drama: false,
        fantasy: false,
        horror: false,
        romace: false,
        sciFi: false,
        thriller: false
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setGenres({
          ...genres,
          [name]: checked
        });

        filterHandler(e);
    };

    const handleReset = () => {
        setGenres({
            adventure: false,
            action: false,
            comedy: false,
            drama: false,
            fantasy: false,
            horror: false,
            romance: false,
            sciFi: false,
            thriller: false
        });
        setDate(new Date());
        setFilteredMovies(items);
    };

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
                                <input type="checkbox" name="adventure" checked={genres.adventure} value="Adventure" onChange={handleChange}/>
                                <label className='filter_label'> Adventure </label>
                            </p>
                            <p>
                                <input type="checkbox" name="action" checked={genres.action} value="Action" onChange={handleChange}/>
                                <label className='filter_label'> Action </label>
                            </p>
                            <p>
                                <input type="checkbox" name='comedy' checked={genres.comedy} value="Comedy" onChange={handleChange}/>
                                <label className='filter_label'> Comedy </label>
                            </p>
                            <p>
                                <input type="checkbox" name='drama' checked={genres.drama} value="Drama" onChange={handleChange}/>
                                <label className='filter_label'> Drama </label>
                            </p>
                            <p>
                                <input type="checkbox" name='fantasy' checked={genres.fantasy} value="Fantasy" onChange={handleChange}/>
                                <label className='filter_label'> Fantasy </label>
                            </p>
                            <p>
                                <input type="checkbox" name='horror' checked={genres.horror} value="Horror" onChange={handleChange}/>
                                <label className='filter_label'> Horror </label>
                            </p>
                            <p>
                                <input type="checkbox" name='romance' checked={genres.romance} value="Romance" onChange={handleChange}/>
                                <label className='filter_label'> Romance </label>
                            </p>
                            <p>
                                <input type="checkbox" name='sciFi' checked={genres.sciFi} value="Sci-Fi" onChange={handleChange}/>
                                <label className='filter_label'> Sci-FI </label>
                            </p>
                            <p>
                                <input type="checkbox" name='thriller' checked={genres.thriller} value="Thriller" onChange={handleChange}/>
                                <label className='filter_label'> Thriller </label>
                            </p>
                            <p>
                                <Calendar onChange={dateChange} value={date} />
                            </p>
                            <p>
                                <Button onClick={handleReset}> Reset Filter </Button>
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