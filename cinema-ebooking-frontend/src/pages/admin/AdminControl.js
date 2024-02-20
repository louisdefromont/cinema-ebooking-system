import WebsiteLogo from '../../components/WebsiteLogo';
import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function AdminControl() {
	const rootStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '2rem',
		padding: '2rem',
		border: '1px solid #ccc',
		borderRadius: '8px',
		backgroundColor: '#f9f9f9',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	};

	const buttonStyle = {
		margin: '0.5rem',
	};

	const titleStyle = {
		marginBottom: '1.5rem',
		fontSize: '1.5rem',
		fontWeight: 'bold',
		color: '#333',
	};

	return (
		<div style={rootStyle}>
			<h3 style={titleStyle}>Admin Control Panel</h3>
			<Button
				variant="contained"
				color="primary"
				style={buttonStyle}
				component={Link}
				to="/admin/movies"
			>
				Manage Movies
			</Button>
			<Button
				variant="contained"
				color="primary"
				style={buttonStyle}
				component={Link}
				to="/admin/users"
			>
				Manage Users
			</Button>
			<Button
				variant="contained"
				color="primary"
				style={buttonStyle}
				component={Link}
				to="/admin/promotions"
			>
				Manage Promotions
			</Button>
			<Button
				variant="contained"
				color="primary"
				style={buttonStyle}
				component={Link}
				to="/"
			>
				Return to Homepage
			</Button>
		</div>
	);
}