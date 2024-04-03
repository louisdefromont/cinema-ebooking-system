import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Seat({ number, status, onSeatClick }) {
	return (
		<Box
			sx={{
				width: 50,
				height: 50,
				border: '1px solid #ccc',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				margin: 1.8,
				bgcolor: status === 'available' ? 'white' : 'gray',
			}}
			onClick={() => onSeatClick(number)}
		>
			{number}
		</Box>
	);
}

function createSeats() {
	const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
	const seats = [];
	for (let row of rows) {
		for (let i = 1; i <= 6; i++) {
			seats.push({ number: `${row}${i}`, status: 'available' });
		}
	}
	return seats;
}

function getSeatsRemaining() {
	const selectedTickets = JSON.parse(sessionStorage.getItem('selectedTickets'));
	return selectedTickets.adultTickets + selectedTickets.childTickets + selectedTickets.seniorTickets;
}

export default function SelectSeats() {
	const [seats, setSeats] = React.useState(createSeats());
	const [seatsRemaining, setSeatsRemaining] = React.useState(getSeatsRemaining());
	const [selectedSeats, setSelectedSeats] = React.useState([]);

	function onSeatClick(seatNumber) {
		const newSeats = seats.map((seat) => {
			if (seat.number === seatNumber) {
				if (seat.status === 'available') {
					if (seatsRemaining === 0) {
						return seat;
					}
					setSeatsRemaining((prevSeatsRemaining) => prevSeatsRemaining - 1);
					setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNumber]);
					return { ...seat, status: 'selected' };
				} else if (seat.status === 'selected') {
					setSeatsRemaining((prevSeatsRemaining) => prevSeatsRemaining + 1);
					setSelectedSeats((prevSelectedSeats) =>
						prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatNumber)
					);
					return { ...seat, status: 'available' };
				}
			}
			return seat;
		});
		setSeats(newSeats);
	}

	function onSubmit() {
		sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
		window.location.href = '/order-summary';
	}

	// 2d array of seats
	const seatRows = [];
	for (let i = 0; i < seats.length; i += 6) {
		seatRows.push(seats.slice(i, i + 6));
	}
	// const checkoutButton
	return (
		<div>
			<Typography variant="h3" bgcolor={'white'}>Select Seats</Typography>
			<div>
				{seatRows.map((row, index) => (
					<div key={index} style={{ display: 'flex' }}>
						{row.map((seat, index) => (
							<Seat
								key={index}
								number={seat.number}
								status={seat.status}
								onSeatClick={onSeatClick}
							/>
						))}
					</div>
				))}
			</div>
			<Typography variant="h5" bgcolor={'white'}>Seats Remaining: {seatsRemaining}</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={onSubmit}
				disabled={seatsRemaining > 0}
			>
				Checkout
			</Button>
		</div>
	);
}