import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

function Seat({ seat, onSeatClick }) {
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
				bgcolor: seat.status === 'available' ? 'white' : seat.status === 'selected' ? '#b49ccc' : 'gray',
			}}
			onClick={() => onSeatClick(seat)}
		>
			{seat.name}
		</Box>
	);
}

function getSeatsRemaining() {
	const selectedTickets = JSON.parse(sessionStorage.getItem('selectedTickets'));
	return selectedTickets.adultTickets + selectedTickets.childTickets + selectedTickets.seniorTickets;
}

export default function SelectSeats() {
	const [allSeats, setAllSeats] = React.useState([]);
	const [seatsRemainingCount, setSeatsRemainingCount] = React.useState(getSeatsRemaining());
	const [selectedSeats, setSelectedSeats] = React.useState([]);

	React.useEffect(() => {
		const selectedShowing = JSON.parse(sessionStorage.getItem('selectedShowing'));
		const showroomId = selectedShowing.showroomId;
		axios.get(`https://localhost:3000/showrooms/${showroomId}`)
			.then((response) => {
				const seats = response.data.seats.map((seat) => {
					return {
						seatId: seat.seatId,
						name: seat.name,
						status: selectedShowing.bookedSeats.some(bookedSeat => bookedSeat.seatId === seat.seatId) ? 'booked' : 'available',
					};
				});
				setAllSeats(seats);
			})
			.catch((error) => {
				console.error('Error fetching showroom:', error);
			});
	}, []);



	function onSeatClick(clickedSeat) {
		const newSeats = allSeats.map((seat) => {
			if (seat.seatId === clickedSeat.seatId) {
				if (seat.status === 'available') {
					if (seatsRemainingCount === 0) {
						return seat;
					}
					setSeatsRemainingCount((prevSeatsRemaining) => prevSeatsRemaining - 1);
					setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, clickedSeat]);
					return { ...seat, status: 'selected' };
				} else if (seat.status === 'selected') {
					setSeatsRemainingCount((prevSeatsRemaining) => prevSeatsRemaining + 1);
					setSelectedSeats((prevSelectedSeats) =>
						prevSelectedSeats.filter((selectedSeat) => selectedSeat !== clickedSeat)
					);
					return { ...seat, status: 'available' };
				}
			}
			return seat;
		});
		setAllSeats(newSeats);
	}

	function onSubmit() {
		sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
		window.location.href = '/order-summary';
	}

	// 2d array of seats
	const seatRows = [];
	if (allSeats.length > 0) {
		var currentLetter = allSeats[0].name.charAt(0);
		var startOfRow = 0;
		for (var i = 0; i < allSeats.length; i++) {
			if (allSeats[i].name.charAt(0) !== currentLetter) {
				seatRows.push(allSeats.slice(startOfRow, i));
				startOfRow = i;
				currentLetter = allSeats[i].name.charAt(0);
			}
		}
		seatRows.push(allSeats.slice(startOfRow));
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
								seat={seat}
								onSeatClick={onSeatClick}
							/>
						))}
					</div>
				))}
			</div>
			<Typography variant="h5" bgcolor={'white'}>Seats Remaining: {seatsRemainingCount}</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={onSubmit}
				disabled={seatsRemainingCount > 0}
			>
				Checkout
			</Button>
		</div>
	);
}