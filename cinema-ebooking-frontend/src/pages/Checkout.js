import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Checkout = ({ orderDetails }) => {
    const selectedShowing = JSON.parse(sessionStorage.getItem('selectedShowing'));
	const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
    const selectedTickets = JSON.parse(sessionStorage.getItem('selectedTickets'));
    const user = JSON.parse(sessionStorage.getItem('user'));


    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleSubmit = () => {
        // Handle submission of payment information
        // You can implement your logic for submitting the order here
        console.log('Payment Info:', paymentInfo);

        Axios.post('https://localhost:3000/book-tickets', {
            showingId: selectedShowing.id,
            userId: user.id,
            selectedSeats: selectedSeats,
            selectedTickets: selectedTickets,
        })
            .then((response) => {
                console.log('Order submitted successfully:', response.data);
                // Save the order details to pass to the confirmation page
                const orderDetails = {
                    showing: selectedShowing,
                    seats: selectedSeats,
                    tickets: selectedTickets,
                };
                // Redirect the user to the confirmation page and pass orderDetails
                navigate('/confirmation', { state: { orderDetails } });
            })
            .catch((error) => {
                console.error('Error submitting order:', error);
                alert('Failed to submit order. Please try again later.');
            });

        // Redirect the user to the confirmation page and pass orderDetails
        navigate('/confirmation', { state: { orderDetails } });
    };

    const handleCancel = () => {
        // Redirect the user back to the select-seats page
        navigate('/select-seats');
    };

    return (
        <Paper>
            <Typography variant="h6" gutterBottom>
                Checkout
            </Typography>
            <div>
                <TextField
                    label="Card Number"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField
                    label="Expiration Date"
                    name="expirationDate"
                    value={paymentInfo.expirationDate}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField
                    label="CVV"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit Order
                </Button>
            </div>
        </Paper>
    );
};

export default Checkout;
