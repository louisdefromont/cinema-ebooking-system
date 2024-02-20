import logo_holder from './logo_holder.jpg';

export default function NavBar() {
	return (
	<nav>
		<img src={logo_holder} alt="logo" length="100" width="100" />
		<ul>
			<li><a href=" ">Movies</a></li>
			<li><a href=' '>Showtimes</a></li>
			<li><a href=' '>Search</a></li>
			<li><a href=' '>Login/Signup</a></li>
		</ul>
	</nav>);
}