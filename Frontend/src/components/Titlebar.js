import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './titlebar.css';

function Titlebar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error with fetching profile!");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  return (
    <nav className="titlebar">
      <div className="titlebar-left">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="media-link">
          <img src="/images_layout/Icon_facebook.png" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="media-link">
          <img src="/images_layout/Icon_instagram.png" alt="Instagram" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"  className="media-link">
          <img src="/images_layout/Icon_twitter.png" alt="Twitter" />
        </a>
      </div>

      <div className="titlebar-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="title-link">Login</Link>
            <span className="the-or"> or </span>
            <Link to="/register" className="title-link">Create an account</Link>
          </>
        ) : (
          <>
            {profile && (
              <span>
                Hi, {profile.firstName} {profile.lastName}
              </span>
            )}
            <button onClick={logout}>X</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Titlebar;
