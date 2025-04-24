import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets/frontend_assets/assets.js';

const LoginPopup = ({ setShowlogin }) => {
  const [currState, setCurrState] = useState("Sign up");

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => setShowlogin(false)} 
            src={assets.cross_icon} 
            alt="Close" 
            className="close-icon"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input type="text" placeholder='Your Name' required />
          )}
          <input type="email" placeholder='Your Email' required />
          <input type="password" placeholder='Password' required />
        </div>

        <button type="submit">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
