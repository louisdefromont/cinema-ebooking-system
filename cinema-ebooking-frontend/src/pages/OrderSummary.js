import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const OrderSummary = () => {
	// Calculate total cost
	const selectedShowing = JSON.parse(sessionStorage.getItem('selectedShowing'));
	const selectedTickets = JSON.parse(sessionStorage.getItem('selectedTickets'));
	const selectedMovie = JSON.parse(sessionStorage.getItem('selectedMovie'));
	const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));

	return (
		<Paper>
			<Typography variant="h6" gutterBottom>
				Order Summary
			</Typography>
			<Typography variant="body1">
				Movie: {selectedMovie.title}
			</Typography>
			<Typography variant="body1">
				Showtime: {new Date(selectedShowing.dateTime).toLocaleString()}
			</Typography>
			<Typography variant="h6" gutterBottom>
				Total Cost: ${selectedTickets.adultTickets * 12 + selectedTickets.childTickets * 6 + selectedTickets.seniorTickets * 6}
			</Typography>
			<div>
				<Button variant="contained" color="primary" component='a' href='/select-seats'>
					Go Back
				</Button>
				<Button variant="contained" color="primary" component='a' href='/checkout'>
					Confirm Order
				</Button>
			</div>
		</Paper>
	);
};

export default OrderSummary;
