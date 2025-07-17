import React, { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import './navbar.css'; 

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images_layout/auction-app-logo 1.png" alt="Logo" className="logo" />
      </div>

      <div className="navbar-right">
        <img src="/images_layout/Search bar.png" alt="Search" className="search-icon" />

        <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
          HOME
        </NavLink>

        <NavLink to="/shop" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
          SHOP
        </NavLink>

        {isLoggedIn && (
          <div
            className="navbar-dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="navbar-link dropdown-toggle">MY ACCOUNT</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                <NavLink to="/sell-item" className="dropdown-item">Become Seller</NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
