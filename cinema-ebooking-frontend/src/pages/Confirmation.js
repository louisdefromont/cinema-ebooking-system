import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Confirmation = () => {
    const selectedMovie = JSON.parse(sessionStorage.getItem('selectedMovie'));
    const selectedShowing = JSON.parse(sessionStorage.getItem('selectedShowing'));
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

    return (
        <Paper>
            <Typography variant="h6" gutterBottom>
                Order Confirmation
            </Typography>
            <Typography variant="body1">
                Thank you for your order!
            </Typography>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <Typography variant="body1">
                Selected Seats: {selectedSeats.map((seat, index) => (
                    <span key={index}>{seat}{index !== selectedSeats.length - 1 ? ', ' : ''}</span>
                ))}
            </Typography>
            <Typography variant="body1">
                Movie: {selectedMovie.title}
            </Typography>
            <Typography variant="body1">
                Showtime: {new Date(selectedShowing.dateTime).toLocaleString()}
            </Typography>
            <div>
                <Button variant="contained" color="primary" component={Link} to="/">
                    Back to Home
                </Button>
            </div>
        </Paper>
    );
};

export default Confirmation;
