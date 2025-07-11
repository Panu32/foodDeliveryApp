import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets/frontend_assets/assets.js';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios';

const LoginPopup = ({ setShowlogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const newUrl = `${url}/api/user/${currState === 'Login' ? 'login' : 'register'}`;
    const payload = currState === 'Login'
      ? { email: data.email, password: data.password }
      : data;

    try {
      const response = await axios.post(newUrl, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowlogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
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
          {currState !== "Login" && (
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
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
