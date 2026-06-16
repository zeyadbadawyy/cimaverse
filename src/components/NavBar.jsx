import { FaFilm } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaFilm />
        <span>CimaVerse</span>
      </div>

      <div className="nav-links">
        <span>Home</span>
        <span>Favorites</span>
      </div>
    </nav>
  );
}

export default Navbar;