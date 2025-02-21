import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Mahdu Rahmah. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
