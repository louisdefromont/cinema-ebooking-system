import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function AddShowing({ isAddingShowing, setIsAddingShowing}) {
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

	return <Dialog open={isAddingShowing} onClose={() => setIsAddingShowing(false)}>
		<DialogTitle>Add showing</DialogTitle>
		<DialogContent>
			<form>
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
				>
					{showrooms.map(showroom => (
						<MenuItem key={showroom.id} value={showroom.id}>{showroom.name}</MenuItem>
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