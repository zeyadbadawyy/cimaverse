import { FaFilm } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
     <Link to="/">
        <img
          src={logo}
          alt="CimaVerse"
          className="logo-image"
        />
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/favorites">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;