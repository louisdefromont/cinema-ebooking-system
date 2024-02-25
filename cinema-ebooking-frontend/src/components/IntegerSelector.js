import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './IntegerSelector.css';

export default function IntegerSelector({ value, setValue}) {

	const handleIncrement = () => {
		setValue((prevValue) => prevValue + 1);
	};

	const handleDecrement = () => {
		setValue((prevValue) => Math.max(0, prevValue - 1));
	};

	return (
			<TextField
				type="number"
				value={value}
				InputProps={{
					inputProps: { // Set inputProps to disable the spinners
						style: { textAlign: 'center' }, // Optionally, you can center the text
					},
					endAdornment: (
						<>
							<IconButton onClick={handleIncrement} size="small">
								<AddIcon />
							</IconButton>
							<IconButton onClick={handleDecrement} size="small">
								<RemoveIcon />
							</IconButton>
						</>
					),
				}}
				sx={{ bgcolor: 'white' }} // Apply white background color
			/>
	);
}