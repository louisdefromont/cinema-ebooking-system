import React, { useState } from 'react';
import axios from 'axios';
import './EditShowing.css'
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

const EditShowing = ({editShowing, setEditShowing, movie}) => {
    const [currentTitle, setTitle] = useState(movie?.title);
    const [currentTrailerUrl, setTrailerUrl] = useState(movie?.trailerUrl);
    const [currentGenres, setGenres] = useState(movie?.genres);
    const [currentDescription, setDescription] = useState(movie?.description);

    function titleChange(e) {
        setTitle(e.target.value);
    }

    function trailerUrlChange(e) {
        setTrailerUrl(e.target.value)
    }

    function genresChange(e) {
        setGenres(e.target.value)
    }

    function descriptionChange(e) {
        setDescription(e.target.value)
    }

    function updateMovie(e) {
        e.preventDefault();
        axios.put('https://localhost:3000/movies/' + movie.id, {
            id: movie.id,
            title: currentTitle,
            trailerUrl: currentTrailerUrl,
            genres: currentGenres,
            description: currentDescription,
            /** */
            thumbnailUrl: movie.thumbnailUrl,
            releaseDate: movie.releaseDate,
            duration: movie.duration,
            showings: movie.showings

        })
        .then(response => {
            console.log("Movie Updated: ", response.data);
        })
        .catch(error => {
            console.log("Error Updating Movie: ", error);
        });
    }

	return (
        <>
            <Dialog open={editShowing} onClose={() => setEditShowing(false)}>
                <DialogTitle> Edit Showing </DialogTitle>
                <DialogContent className='content'>
                    <form className='form' onSubmit={updateMovie}>
                        <input onChange={titleChange} value={currentTitle}/>
                        <input onChange={trailerUrlChange} value={currentTrailerUrl}/>
                        <input onChange={genresChange} value={currentGenres}/>
                        <input onChange={descriptionChange} value={currentDescription}/>
                        <Button type="submit" onClick={() => setEditShowing(false)}> Save </Button>
                    </form>
                </DialogContent>
                
            </Dialog>
        </>
    )
}

export default EditShowing;