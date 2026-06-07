import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">VD</Link>
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
