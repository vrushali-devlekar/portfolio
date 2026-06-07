import { Link, useLocation } from "react-router-dom";
import logoImg from "../../public/tap.png";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logoImg} alt="VD Logo" className="logo-img" />
      </Link>
      <div className="nav-links">
        <Link className={pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={pathname.includes("/projects") ? "active" : ""} to="/projects">My Catalog</Link>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
