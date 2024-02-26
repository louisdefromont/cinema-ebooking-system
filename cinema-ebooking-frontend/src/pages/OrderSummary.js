import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const OrderSummary = ({ orderDetails }) => {
	// Calculate total cost
	const totalCost = orderDetails.reduce((acc, cur) => acc + cur.cost, 0);

	return (
		<Paper>
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
			<Typography variant="h6" gutterBottom>
				Total Cost: ${totalCost}
			</Typography>
			<div>
				<Button variant="contained" color="primary" component='a' href='/select-seats'>
					Go Back
				</Button>
				<Button variant="contained" color="primary" component='a' href='/'>
					Confirm Order
				</Button>
			</div>
		</Paper>
	);
};

export default OrderSummary;
