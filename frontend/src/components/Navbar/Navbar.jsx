import React, { useContext, useState } from 'react'; 
import './Navbar.css';
import { assets } from '../../assets/assets/frontend_assets/assets.js';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setShowlogin }) => { // Destructure setShowlogin prop
  const [menu, setMenu] = useState("menu");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const navigate = useNavigate();
  const logout= () => {
     localStorage.removeItem("token");
      setToken("");
      navigate("/");

  }
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="logo" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <Link to='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</Link>
        <Link to='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</Link>
        <Link to='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <Link to ='/cart'><img src={assets.basket_icon} alt="basket" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={() => setShowlogin(true)}>sign in</button>
        :<div className='navbar-profile'>
                     <img src={assets.profile_icon} alt="" />
                     <ul className="nav-profile-dropdown">
                       <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                       <hr />
                       <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                     </ul>

         </div>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
