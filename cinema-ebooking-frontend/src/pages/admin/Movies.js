import React from 'react';
import TableManager from './TableManager';
import Axios from 'axios';

const Movies = () => {
    function createCallback(row) {
        return Axios.post('https://localhost:3000/movies', row);
    }
    function readCallback() {
        return Axios.get('https://localhost:3000/movies');
    }
    function updateCallback(row) {
        return Axios.put(`https://localhost:3000/movies/${row.id}`, row);
    }
    function deleteCallback(row) {
        return Axios.delete(`https://localhost:3000/movies/${row.id}`);
    }

    return (
        <TableManager rowHeaders={["id", "title", "trailerUrl", "thumbnailUrl", "releaseDate"]} createCallback={createCallback} readCallback={readCallback} updateCallback={updateCallback} deleteCallback={deleteCallback} />
    );
};

export default Movies;