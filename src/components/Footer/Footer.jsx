import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />

          <p>
            From breakfast to late-night cravings, we ensure every bite is
            fresh, every meal satisfying, and every order delivered with care!
            With top-quality ingredients, trusted restaurants, and fast
            delivery, we bring comfort, convenience, and delicious flavors
            straight to your doorstep—because great food should always be
            hassle-free!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91-7708520329</li>
            <li>abhishekkunwar363@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />{" "}
      <p className="footer-copyright">
        Copyright 2023 &copy; Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
