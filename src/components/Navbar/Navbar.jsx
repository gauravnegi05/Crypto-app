import React, { useContext } from "react";
import "./Navbar.css";
import { CoinContext } from "../../context/CoinContext";

const Navbar = () => {

    const {setCurrency} = useContext(CoinContext)  //yaha humne CoinContextProvider component ko import kiya hai jise hum globally use karenge

    const handleCurrencyChange = (e) => {  //yaha humne handleCurrencyChange function banaya hai jisme humne select dropdown ke change hone par selected currency ko update karne ke liye setCurrency() method use kiya hai jise hum globally use karenge
        switch (e.target.value) {  // yaha humne switch case statement use kiya hai jisme humne selected currency ke value ke basis par setCurrency() method ko call kiya hai jise hum globally use karenge
            case "usd":  // agar selected currency ka value "usd" hai to setCurrency() method ko call karke currency state ko update karenge jise hum globally use karenge
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
        <select onChange={handleCurrencyChange}>  {/* yaha humne select dropdown banaya hai jisme humne onChange event handler me handleCurrencyChange function ko call kiya hai jise hum globally use karenge jisse jab bhi user select dropdown me currency change karega to handleCurrencyChange function call hoga jisme hum selected currency ko update karenge jise hum globally use karenge */}
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
