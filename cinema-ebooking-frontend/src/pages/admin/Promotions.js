import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import emailjs from 'emailjs-com';
import TableManager from './TableManager'; 

emailjs.init("9xrg1u7JrddOMAJz7")

const Promotions = () => {
    const [rows, setRows] = useState([]);
    const [rowHeaders, setRowHeaders] = useState([]);
    const [dbRows, setDbRows] = useState([]);

    useEffect(() => {
        readCallback().then((response) => {
            setRows(response.data);
            setDbRows(response.data);
            setRowHeaders(['id', 'expirationDate', 'discAmount', 'regExpression']); 
        });
    }, []);

    function createCallback(row) {
        return Axios.post('https://localhost:3000/promotions', row);
    }

    function readCallback() {
        return Axios.get('https://localhost:3000/promotions');
    }

    function updateCallback(row) {
        return Axios.put(`https://localhost:3000/promotions/${row.id}`, row);
    }

    function deleteCallback(row) {
        return Axios.delete(`https://localhost:3000/promotions/${row.id}`);
    }

    const sendMail = (email) => {
        let parms = {
            to_email: email,
        };

        emailjs.send("gmailkey", "passwordresettemp", parms)
            .then(() => alert('Email has been sent!'))
            .catch((error) => console.error('Error sending email:', error));
    }

    const handleAddRow = () => {
        const newRow = {
            ...Object.fromEntries(rowHeaders.map(
                function (header) {
                    if (header === "id") {			
                        return [header, rows.length + 1];
                    } else { 						
                        return [header, ""];
                    }
                }
            ))
        };
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

    const handleSubmitChanges = async () => {
        try {
            const newRows = rows.filter(
                function (row) {
                    for (let i = 0; i < dbRows.length; i++) {
                        if (row.id === dbRows[i].id) {
                            return false;
                        }
                    }
                    return true;
                }
            );
            const updatedRows = rows.filter(
                function (row) {
                    for (let i = 0; i < dbRows.length; i++) {
                        if (row.id === dbRows[i].id) {
                            for (let j = 0; j < rowHeaders.length; j++) {
                                if (row[rowHeaders[j]] !== dbRows[i][rowHeaders[j]]) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    }
                    return false;
                }
            );
            const deletedRows = dbRows.filter(
                function (row) {
                    for (let i = 0; i < rows.length; i++) {
                        if (row.id === rows[i].id) {
                            return false;
                        }
                    }
                    return true;
                }
            );
            newRows.forEach(row => createCallback(row));
            updatedRows.forEach(row => updateCallback(row));
            deletedRows.forEach(row => deleteCallback(row));
            const usersSubscribedToPromotions = rows.filter(row => row.regPromo).map(row => row.email);
            usersSubscribedToPromotions.forEach(email => sendMail(email));
            window.location.reload();
        } catch (error) {
            console.error('Error submitting changes:', error);
            alert('Failed to submit changes. Please try again later.');
        }
    };
    

    return (
        <div> 
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {rowHeaders.map(header => (
                                header !== "id" && <TableCell key={header}>{header}</TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                {rowHeaders.map(header => (
                                    header !== "id" && <TableCell key={header}>
                                        <TextField
                                            value={row[header]}
                                            onChange={(e) => handleCellChange(row.id, header, e.target.value)}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Button onClick={() => handleDeleteRow(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={handleAddRow}>Add Row</Button>
                <Button onClick={handleSubmitChanges}>Submit Changes</Button>
            </TableContainer>
            <div className='backButton' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <li>
                    <a href='/admin' style={{ display: 'inline-block', padding: '10px 20px', fontSize: '18px', border: '1px solid white', borderRadius: '5px', textDecoration: 'none', color: 'white' }}>Go Back</a>
                </li>
            </div>
        </div>
    );
};

export default Promotions;

