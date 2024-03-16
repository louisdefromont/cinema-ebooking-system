import React, { useState, useEffect } from 'react';
import TableManager from './TableManager';
import Axios from 'axios';

const Users = () => {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:3000/movies').then((response) => {
            setRows(response.data);
        });
    }, []);

    return (
        <TableManager rows={rows} setRows={setRows} rowHeaders={["id", "title", "trailerUrl", "thumbnailUrl", "releaseDate"]} />
    );
};

export default Users;
