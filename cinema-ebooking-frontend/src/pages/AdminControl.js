import WebsiteLogo from '../components/WebsiteLogo';
import Button from '@mui/material/Button';

export default function AdminControl() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<WebsiteLogo />
			<h1>(Admin Name)</h1>
			<Button variant="contained"> Manage Movies </Button>
			<Button variant="contained"> Manage Users </Button>
			<Button variant="contained"> Manage Promotions </Button>
			<Button href='/' variant="outlined"> Return to Homepage </Button>
		</div>
	);
}