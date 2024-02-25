import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const Users = () => {
    const [rows, setRows] = useState([
        { id: 1, name: 'Louis', type: 'registered' },
        { id: 2, name: 'Dev', type: 'admin' }
    ]);

    const handleAddRow = () => {
        const newRow = { id: rows.length + 1, name: '', type : 'registered' };
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
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <TextField
                                    value={row.name}
                                    onChange={(e) => handleCellChange(row.id, 'name', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={row.type}
                                    onChange={(e) => handleCellChange(row.id, 'type', e.target.value)}
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
