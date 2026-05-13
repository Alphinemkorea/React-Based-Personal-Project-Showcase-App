import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">TechHaven</Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;