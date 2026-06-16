import { FaFilm } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaFilm />
        <span>CimaVerse</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/favorites">
          Favorites ❤️
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;