import React, { useContext } from "react";
import "./Navbar.css";
import { CoinContext } from "../../context/CoinContext";

const Navbar = () => {

    const {setCurrency} = useContext(CoinContext)

    const handleCurrencyChange = (e) => {
        switch (e.target.value) {
            case "usd":
                setCurrency({name:"usd", symbol:"$"})
                break;
            case "eur":
                setCurrency({name:"eur", symbol:"€"})
                break;
            case "inr":
                setCurrency({name:"inr", symbol:"₹"})
                break;
            default:
                setCurrency({name:"usd", symbol:"$"})
                break;
        }
    }

  return (
    <div className="navbar">
      <img src="src\assets\logo.png" alt="logo" className="logo" />
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Login <img src="src\assets\arrow_icon.png" alt="arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
