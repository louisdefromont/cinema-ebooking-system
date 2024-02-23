import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const Promotions = () => {
    const [rows, setRows] = useState([
        { id: 1, title: 'Dune', discount: '0.80', regex: '/dune/i' },
        { id: 2, title: 'Deadpool', discount: '0.50', regex: '/deadpool/i' }
    ]);

    const handleAddRow = () => {
        const newRow = { id: rows.length + 1, tilte: '', discount: '', regex: '//' };
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
                        <TableCell>Movie Title</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>REGEX</TableCell>
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
                                    value={row.discount}
                                    onChange={(e) => handleCellChange(row.id, 'discount', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={row.regex}
                                    onChange={(e) => handleCellChange(row.id, 'regex', e.target.value)}
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

export default Promotions;
