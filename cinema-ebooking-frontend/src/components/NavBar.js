import logo_holder from './logo_holder.jpg';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import './NavBar.css'

export default function NavBar() {
	return (
	<nav>
		<img src={logo_holder} alt="logo" length="50" width="50" />
                
                <ul>
                    <li><a href=" ">Movies</a></li>
                    <li><a href=' '>Showtimes</a></li>
                    <Link to='/movie-search'>
                        <li><a href=' '>Search</a></li>
                    </Link>
                </ul>

                <Link to="/login">
                    <Button className='nav_button' variant="contained">Login/Signup</Button>
                </Link>
	</nav>);
}