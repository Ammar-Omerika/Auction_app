import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>AUCTION</h3>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>

      <div className="footer-right">
        <h3 className="footer-title">GET IN TOUCH</h3>
        <p>Call us at +123 797-567-2535</p>
        <p>support@auction.com</p>
        <div className="social-media">
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
      </div>
    </footer>
  );
}

export default Footer;
