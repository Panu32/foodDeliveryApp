import React, { useState } from 'react'; 
import './Navbar.css';
import { assets } from '../../assets/assets/frontend_assets/assets.js';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowlogin }) => { // Destructure setShowlogin prop
  const [menu, setMenu] = useState("menu");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="logo" className='logo' />
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <Link to='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</Link>
        <Link to='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</Link>
        <Link to='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="basket" />
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowlogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
