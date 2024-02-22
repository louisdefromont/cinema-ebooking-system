import logo_holder from './logo_holder.jpg';
import Button from '@mui/material/Button'

export default function NavBar() {
	return (
	<nav>
		<img src={logo_holder} alt="logo" length="50" width="50" />
                
                <ul>
                    <li><a href=" ">Movies</a></li>
                    <li><a href=' '>Showtimes</a></li>
                    <li><a href=' '>Search</a></li>
                </ul>

                <Button variant="contained">Login/Signup</Button>
	</nav>);
}