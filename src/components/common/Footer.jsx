export default function Footer() {
    return (
        <footer
            style={{
                textAlign: "center",
                padding: "20px",
                marginTop: "40px",
                background: "#111",
                color: "#fff",
            }}
        >
            <h3>Gaming Tech Store 🎮</h3>
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </footer>
    );
}
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TechHaven</h3>
            <p>Your premier destination for cutting-edge electronics</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/admin">Admin</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@techhaven.com</p>
            <p>Phone: 1-800-TECH-HVN</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TechHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
