import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import './navbar.css'; 

function Navbar() {
  const { isLoggedIn} = useContext(AuthContext);

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
         {isLoggedIn ? (
            <>
              <NavLink to="/profile" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
                MY ACCOUNT
              </NavLink>
            </>
          ) : (
            <>
            </>
          )}
      </div>
    </nav>
  );
}

export default Navbar;