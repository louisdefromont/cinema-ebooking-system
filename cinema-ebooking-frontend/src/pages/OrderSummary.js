import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const OrderSummary = () => {
	// Calculate total cost
	const selectedShowing = JSON.parse(sessionStorage.getItem('selectedShowing'));
	const selectedTickets = JSON.parse(sessionStorage.getItem('selectedTickets'));
	const selectedMovie = JSON.parse(sessionStorage.getItem('selectedMovie'));
	const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
	var ticketCost = selectedTickets.adultTickets * 12 + selectedTickets.childTickets * 6 + selectedTickets.seniorTickets * 6;
	var salesTax = ticketCost * 0.074;
	const [discountAmount, setDiscountAmount] = useState(0);

	function handleSubmitPromo(e) {
		e.preventDefault();
		const promoCode = e.target.promoCode.value;
		axios.get(`https://localhost:3000/promotions/${promoCode}`)
			.then((response) => {
				if (response.data) {
					setDiscountAmount(response.data.discountAmount);
				}
			})
	}

	var totalCost = ticketCost + salesTax - discountAmount;

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
				Ticket Cost: ${ticketCost.toFixed(2)} <br />
				Sales Tax: ${salesTax.toFixed(2)} <br />
				Total Cost: ${totalCost.toFixed(2)}
			</Typography>
			<form onSubmit={handleSubmitPromo}>
				<TextField
					id="promoCode"
					name="promoCode"
					label="Promo Code"
				/>
				<Button type="submit">Submit</Button>
			</form>
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
