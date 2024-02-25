import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const Users = () => {
    const [rows, setRows] = useState([{ "id": 1, "title": "Dune", "trailerUrl": "https://youtu.be/n9xhJrPXop4", "thumbnailUrl": "https://m.media-amazon.com/images/I/61QbqeCVm0L.jpg", "releaseDate": "2024-02-18T05:19:03.000Z" },
    { "id": 2, "title": "Godzilla vs. Kong", "trailerUrl": "https://youtu.be/odM92ap8_c0", "thumbnailUrl": "https://m.media-amazon.com/images/M/MV5BZmYzMzU4NjctNDI0Mi00MGExLWI3ZDQtYzQzYThmYzc2ZmNjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg", "releaseDate": "2024-02-18T05:19:03.000Z" },
    { "id": 3, "title": "Kung Fu Panda 3", "trailerUrl": "https://youtu.be/10r9ozshGVE", "thumbnailUrl": "https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_FMjpg_UX1000_.jpg", "releaseDate": "2024-02-18T05:19:03.000Z" },
    { "id": 4, "title": "Deadpool", "trailerUrl": "https://youtu.be/ONHBaC-pfsk", "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png", "releaseDate": "2024-02-18T05:19:03.000Z" }]);

    const handleAddRow = () => {
        const newRow = { id: rows.length + 1, title: '', trailerUrl: '', thumbnailUrl: '', releaseDate: '' };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (id) => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    };

    const handleCellChange = (id, field, value) => {
        const updatedRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(updatedRows);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Trailer URL</TableCell>
                        <TableCell>Thumbnail URL</TableCell>
                        <TableCell>Release Date</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <TextField
                                    value={row.title}
                                    onChange={(e) => handleCellChange(row.id, 'title', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={row.trailerUrl}
                                    onChange={(e) => handleCellChange(row.id, 'trailerUrl', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={row.thumbnailUrl}
                                    onChange={(e) => handleCellChange(row.id, 'thumbnailUrl', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={row.releaseDate}
                                    onChange={(e) => handleCellChange(row.id, 'releaseDate', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeleteRow(row.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={handleAddRow}>Add Row</Button>
        </TableContainer>
    );
};

export default Users;
