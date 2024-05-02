import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import Axios from 'axios';

function UserTableManager({ rowHeaders, createCallback, readCallback, updateCallback, deleteCallback }) {
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
    
    const handleChangePassword = async (id) => {
        const currPassword = window.prompt("Enter current password to change:");
        try {
            const response = await Axios.put(`https://localhost:3000/checkpassword/${id}`, { currPassword });
            if (response.status === 200) {
                // Password check successful
                //window.alert("Current password is correct");
    
                const newPassword = window.prompt("Enter new password:");
                if (newPassword) {
                    // Handle the new password
                    console.log("New password:", newPassword);
                    return Axios.put(`https://localhost:3000/users/${id}`, { newPassword });

                } else {
                    window.alert("Nothing entered");
                }
            } else {
                // Password check unsuccessful
                window.alert("Current password is incorrect");
            }
        } catch (error) {
            console.error("Error checking password:", error);
            window.alert("Incorrect password or error ");
        }

    };
    
   
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
                            <TableCell>
								<Button onClick={() => handleChangePassword(row.id)}>Change Password</Button>
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

export default UserTableManager;
