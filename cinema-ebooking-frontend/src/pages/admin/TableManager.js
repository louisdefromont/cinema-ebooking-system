import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import emailjs from 'emailjs-com';

emailjs.init("9xrg1u7JrddOMAJz7")

function TableManager({ rowHeaders, createCallback, readCallback, updateCallback, deleteCallback }) {
	const [rows, setRows] = useState([]);
	const [dbRows, setDbRows] = useState([]);
	useEffect(() => {
		readCallback().then((response) => {
			setRows(response.data);
			setDbRows(response.data);
		});
	}, []);
	const handleAddRow = () => {
		const newRow = {
			...Object.fromEntries(rowHeaders.map(
				function (header) {
					if (header === "id") {			// If the header is "id", then the value is the length of the rows array plus 1
						return [header, rows.length + 1];
					} else { 						// Otherwise, the value is an empty string
						return [header, ""];
					}
				}
			))
		};
		setRows([...rows, newRow]);
	};

	const handleDeleteRow = (id) => {
		const updatedRows = rows.filter(row => row.id !== id);
		setRows(updatedRows);
	};

	const handleCellChange = (id, field, value) => {
		const updatedRows = rows.map(row => {
			if (row.id === id) {
				return { ...row, [field]: value };
			}
			return row;
		});
		setRows(updatedRows);
	};

	const sendMail = (email) => {
		let parms = {
			to_email : email,
			}
	
			emailjs.send("gmailkey", "passwordresettemp", parms)
			.then(alert('Email has been sent!'))
			.catch((error) => console.error('Error sending email:', error));
	}

	function handleSubmitChanges() {
		const newRows = rows.filter(
			function (row) {
				for (let i = 0; i < dbRows.length; i++) {
					if (row.id === dbRows[i].id) {
						return false;
					}
				}
				return true;
			}
		);
		const updatedRows = rows.filter(
			function (row) {
				for (let i = 0; i < dbRows.length; i++) {
					if (row.id === dbRows[i].id) {
						for (let j = 0; j < rowHeaders.length; j++) {
							if (row[rowHeaders[j]] !== dbRows[i][rowHeaders[j]]) {
								return true;
							}
						}
						return false;
					}
				}
				return false;
			}
		);
		const deletedRows = dbRows.filter(
			function (row) {
				for (let i = 0; i < rows.length; i++) {
					if (row.id === rows[i].id) {
						return false;
					}
				}
				return true;
			}
		);
		newRows.forEach(row => createCallback(row));
		updatedRows.forEach(row => updateCallback(row));
		deletedRows.forEach(row => deleteCallback(row));
		const usersSubscribedToPromotions = rows.filter(row => row.subscribedToPromotions).map(row => row.email);
		// Send email to each user subscribed to promotions
		usersSubscribedToPromotions.forEach(email => sendMail(email));
		// Refresh the current page
		window.location.reload();

	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						{rowHeaders.map(
							function (header) {
								if (header !== "id") {
									return <TableCell key={header}>{header}</TableCell>
								}
							}
						)}
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.id}>
							{rowHeaders.map(
								function (header) {
									if (header === "id") {
										return null;
									}
									return <TableCell>
										<TextField
											value={row[header]}
											onChange={(e) => handleCellChange(row.id, header, e.target.value)}
										/>
									</TableCell>
								}
							)}
							<TableCell>
								<Button onClick={() => handleDeleteRow(row.id)}>Delete</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Button onClick={handleAddRow}>Add Row</Button>
			<Button onClick={handleSubmitChanges}>Submit Changes</Button>
		</TableContainer>
	);
};

export default TableManager;