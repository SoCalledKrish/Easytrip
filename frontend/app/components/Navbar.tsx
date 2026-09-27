export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="/" className="brand">
          <span className="brand-logo">A</span>
          <span className="brand-name">EasyTrip</span>
        </a>

        <nav className="nav-links">
          <a href="#countries">Explore</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}