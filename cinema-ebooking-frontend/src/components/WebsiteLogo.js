import logo from './logo_holder.jpg';

export default function WebsiteLogo() {
  return (
	<a href="/">
	  <img src={logo} alt="Website logo" />
	</a>
  );
}