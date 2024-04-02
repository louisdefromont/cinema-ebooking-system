import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function AddShowing({ isAddingShowing, setIsAddingShowing, movie }) {
	const [showrooms, setShowrooms] = useState([]);
	const [selectedShowroom, setSelectedShowroom] = useState(null);

	useEffect(() => {
		axios.get('https://localhost:3000/showrooms')
			.then(response => {
				setShowrooms(response.data);
			})
			.catch(error => {
				console.error('Error fetching showrooms:', error);
			});
	}, []);

	function submitShowing(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const showtimeString = formData.get('showtime');
		const showtime = new Date(showtimeString).toISOString();
		axios.post('https://localhost:3000/showings', {
			dateTime: showtime,
			movieId: movie.id,
			showroomId: selectedShowroom
		})
			.then(response => {
				console.log('Showing added:', response.data);
			})
			.catch(error => {
				console.error('Error adding showing:', error);
			});
	}

	return <Dialog open={isAddingShowing} onClose={() => setIsAddingShowing(false)}>
		<DialogTitle>Add showing</DialogTitle>
		<DialogContent>
			<form onSubmit={submitShowing}>
				<label htmlFor="showtime">Showtime:</label>
				<DateTimePicker
					renderInput={(props) => <input {...props} />}
					id="showtime"
					name="showtime"
					disablePast
				/>
				<Select
					value={selectedShowroom}
					onChange={(event) => setSelectedShowroom(event.target.value)}
					id="showroomId"
				>
					{showrooms.map(showroom => (
						<MenuItem key={showroom.id} value={showroom.id}>{showroom.id}</MenuItem>
					))}
				</Select>
				<Button type="submit" color="primary">
					Add showing
				</Button>
			</form>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => setIsAddingShowing(false)} color="primary">
				Cancel
			</Button>
		</DialogActions>
	</Dialog>
}