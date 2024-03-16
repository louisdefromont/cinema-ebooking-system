import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

function TableManager({ rows, setRows, rowHeaders }) {
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

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						{rowHeaders.map(
							function (header) {
								if (header != "id") {
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
									if (header == "id") {
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
		</TableContainer>
	);
};

export default TableManager;
