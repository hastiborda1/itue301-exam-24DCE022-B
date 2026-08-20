import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/">Shelfwise</NavLink>
      <nav aria-label="Main navigation">
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/">Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/books">Book information</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/borrow">Borrow</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
