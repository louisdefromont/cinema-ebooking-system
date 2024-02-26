import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
    const location = useLocation();
    const { orderDetails } = location.state;

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
            {orderDetails.map((ticket, index) => (
                <div key={index}>
                    <Typography variant="body1">
                        Seat: {ticket.seatNumber} - Type: {ticket.type} - Cost: ${ticket.cost}
                    </Typography>
                </div>
            ))}
            <Typography variant="body1">
                Movie: {orderDetails[0].movie}
            </Typography>
            <Typography variant="body1">
                Showtime: {orderDetails[0].showtime}
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
