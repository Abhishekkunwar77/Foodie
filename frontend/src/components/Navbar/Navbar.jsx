import React, { useContext, useState } from 'react';
import './Navbar.css'; 
import { assets } from '../../assets/assets';
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';
import { toast } from "react-toastify";

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const{getTotalCartAmount,token, setToken}=useContext(StoreContext);

  const navigate=useNavigate();
  const logout=()=>{
      localStorage.removeItem("token");
      setToken("");
      toast.success("Logout Successfully!")
navigate("/");
  }

  return (
    <div className="navbar">
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src={assets.logo} alt="Website Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="#header"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="Search Icon"
          className="search-icon"
        />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              alt="Shopping Basket"
              style={{ height: "27px", width: "27px" }}
            />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
      {!token?<button onClick={() => setShowLogin(true)}>Sign in</button>
:<div className='navbar-profile'>
  <img src={assets.profile_icon} alt=""/>
  <ul className="nav-profile-dropdown">
    <li onClick={()=>navigate('/myorders')} > <img src={assets.bag_icon} alt=""/><p>Orders</p></li>
    <hr/>
    <li>  <img onClick={logout} src={assets.logout_icon} alt=""/><p>Logout</p></li>
  </ul>
        </div>
      }
    </div>
    </div>
  );
};

export default Navbar;
