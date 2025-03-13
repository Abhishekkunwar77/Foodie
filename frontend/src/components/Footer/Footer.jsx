import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
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
            <a
              href="https://www.facebook.com/nishu.kunwar.31"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a
              href="https://x.com/abhi__shek23"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-kunwar55/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li onClick={() => window.scrollTo({ top: 0,  behavior: "smooth" })}>
              Home
            </li>
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
        Copyright 2025 &copy; Foodie.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
