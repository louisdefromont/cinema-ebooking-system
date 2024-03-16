import React, { useState } from 'react';
import TableManager from './TableManager';

const Users = () => {
    const [rows, setRows] = useState([{ "id": 1, "title": "Dune", "trailerUrl": "https://youtu.be/n9xhJrPXop4", "thumbnailUrl": "https://m.media-amazon.com/images/I/61QbqeCVm0L.jpg", "releaseDate": "2024-02-18T05:19:03.000Z" },
    { "id": 2, "title": "Godzilla vs. Kong", "trailerUrl": "https://youtu.be/odM92ap8_c0", "thumbnailUrl": "https://m.media-amazon.com/images/M/MV5BZmYzMzU4NjctNDI0Mi00MGExLWI3ZDQtYzQzYThmYzc2ZmNjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg", "releaseDate": "2024-02-18T05:19:03.000Z" },
    { "id": 3, "title": "Kung Fu Panda 3", "trailerUrl": "https://youtu.be/10r9ozshGVE", "thumbnailUrl": "https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_FMjpg_UX1000_.jpg", "releaseDate": "2024-02-18T05:19:03.000Z" },
    { "id": 4, "title": "Deadpool", "trailerUrl": "https://youtu.be/ONHBaC-pfsk", "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png", "releaseDate": "2024-02-18T05:19:03.000Z" }]);

    return (
        <TableManager rows={rows} setRows={setRows} rowHeaders={["id", "title", "trailerUrl", "thumbnailUrl", "releaseDate"]} />
    );
};

export default Users;
