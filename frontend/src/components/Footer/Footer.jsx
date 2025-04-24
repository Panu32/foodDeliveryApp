import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className='footer' id="footer"> {/* Add ID here for anchor scroll */}
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, dolores esse officiis voluptates sunt recusandae? Autem soluta ut voluptatum minus! Magni repellat veritatis, enim accusamus aliquid deserunt consequuntur dignissimos ullam!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 9307838999</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2024 - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
