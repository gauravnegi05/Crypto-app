import React, { use, useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoins, currency } = useContext(CoinContext); //yaha humne CoinContextProvider component ko import kiya hai jise hum globally use karenge jisme humne allCoins aur currency state ko destructure kiya hai jise hum globally use karenge
  const [displayCoins, setDisplayCoins] = useState([]); //yaha humne displayCoins aur setDisplayCoins state banaya hai jise hum locally use karenge jisme hum allCoins state se data ko filter karke display karenge jise hum locally use karenge

  const [input, setInput] = useState(""); //yaha humne input aur setInput state banaya hai jise hum locally use karenge jisme hum search input ke value ko store karenge jise hum locally use karenge

  const inputHandler = (e) => {
    //yaha humne inputHandler function banaya hai jisme humne search input ke change hone par input state ko update karne ke liye setInput() method use kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karega to input state automatically update hoga jise hum locally use karenge
    setInput(e.target.value); //yaha humne setInput() method use karke search input ke value ko input state me store kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karega to input state automatically update hoga jise hum locally use karenge
    if (e.target.value === "") {
      //yaha humne condition lagayi hai jisme hum check kar rahe hai ki agar search input ke value empty hai to displayCoins state ko allCoins state ke data se update karenge jise hum locally use karenge jisse jab bhi user search input me kuch type karega aur usse delete karega to displayCoins state automatically update hoga jise hum locally use karenge
      setDisplayCoins(allCoins); //yaha humne setDisplayCoins() method use karke allCoins state ke data ko displayCoins state me store kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karega aur usse delete karega to displayCoins state automatically update hoga jise hum locally use karenge
    }
  };

  const searchHandler = async (e) => {
    //yaha humne searchHandler function banaya hai jisme humne search input ke submit hone par displayCoins state ko update karne ke liye setDisplayCoins() method use kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karke submit karega to displayCoins state automatically update hoga jise hum locally use karenge
    e.preventDefault(); //yaha humne e.preventDefault() method use kiya hai jisse jab bhi user search input me kuch type karke submit karega to page refresh nhi hoga jise hum locally use karenge
    const filteredCoins = allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(input.toLowerCase()),
    ); //yaha humne allCoins state ke data ko filter() method use karke search input ke value ke basis par filter kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karke submit karega to displayCoins state automatically update hoga jise hum locally use karenge
    setDisplayCoins(filteredCoins); //yaha humne setDisplayCoins() method use karke filteredCoins array ke data ko displayCoins state me store kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karke submit karega to displayCoins state automatically update hoga jise hum locally use karenge
  };

  useEffect(() => {
    // yaha humne useEffect hook use kiya hai jisme humne allCoins state ke change hone par displayCoins state ko update karne ke liye setDisplayCoins() method use kiya hai jise hum locally use karenge jisse jab bhi allCoins state change hoga to displayCoins state automatically update hoga jise hum locally use karenge
    setDisplayCoins(allCoins); // yaha humne setDisplayCoins() method use karke allCoins state ke data ko displayCoins state me store kiya hai jise hum locally use karenge jisse jab bhi allCoins state change hoga to displayCoins state automatically update hoga jise hum locally use karenge
  }, [allCoins]); // yaha humne useEffect hook ke dependency array me allCoins ko add kiya hai jisse jab bhi allCoins state change hoga to useEffect hook automatically run hoga aur setDisplayCoins() method call hoga jisse displayCoins state automatically update hoga jise hum locally use karenge

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Larget <br /> Crypto Marketplace
        </h1>
        <p>Buy and sell cryptocurrencies easily on crypto-app</p>
        <form onSubmit={searchHandler}>
          {" "}
          {/* yaha humne form element banaya hai jisme humne onSubmit event handler me searchHandler function ko call kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karke submit karega to searchHandler function call hoga jisme hum displayCoins state ko update karenge jise hum locally use karenge */}
          <input
            onChange={inputHandler} // yaha humne search input ke onChange event handler me inputHandler function ko call kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karega to inputHandler function call hoga jisme hum search input ke value ko input state me store karenge jise hum locally use karenge
            list="coinlist"
            value={input} // yaha humne search input ke value prop me input state ko pass kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karega to input state automatically update hoga jise hum locally use karenge aur search input ke value ko control karne ke liye use kiya hai jise hum locally use karenge
            type="text"
            placeholder="Search crypto.."
            required
          />
          <datalist id="coinlist">
            {allCoins.map(
              (
                coin,
                index, // yaha humne allCoins state ke data ko map() method use karke datalist me option elements ke form me display kiya hai jise hum locally use karenge jisse jab bhi user search input me kuch type karega to usse matching coins ke options show honge jise hum locally use karenge
              ) => (
                <option key={index} value={coin.name}>
                  {coin.name} - {coin.symbol}
                </option> // yaha humne option element ke key prop me index ko value di hai jise hum locally use karenge jisse React ko pata chalega ki har option element ke data ko uniquely identify karne ke liye index ka use ho raha hai jise hum locally use karenge aur value prop me coin ke name ko use kiya hai jise hum locally use karenge aur option element ke content me coin ke name aur symbol ko display kiya hai jise hum locally use karenge
              ),
            )}
          </datalist>
          <button>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoins.slice(0, 10).map(
          (
            item,
            index, // yaha humne displayCoins state ke data ko slice() method use karke first 10 coins tak limit kiya hai jise hum locally use karenge jisse hum apne table me sirf top 10 coins hi display karenge jise hum locally use karenge aur map() method use karke har coin ke data ko table me display karenge jise hum locally use karenge
          ) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              {" "}
              {/* yaha humne table-layout class ke div me key prop use kiya hai jisme humne index ko value di hai jise hum locally use karenge jisse React ko pata chalega ki har coin ke data ko uniquely identify karne ke liye index ka use ho raha hai jise hum locally use karenge */}
              <p>{item.market_cap_rank}</p>{" "}
              {/* yaha humne market_cap_rank property ka use karke coin ke rank ko display kiya hai jise hum locally use karenge */}
              <div>
                <img src={item.image} alt={item.name} className="coin-image" />{" "}
                {/* yaha humne image property ka use karke coin ke image ko display kiya hai jise hum locally use karenge aur alt attribute me coin ke name ko use kiya hai jise hum locally use karenge aur coin-image class ka use karke image ko style kiya hai jise hum locally use karenge */}
                <p>
                  {item.name} - {item.symbol}
                </p>{" "}
                {/* yaha humne name aur symbol property ka use karke coin ke name aur symbol ko display kiya hai jise hum locally use karenge */}
              </div>
              <p>
                {currency.symbol} {item.current_price}
              </p>{" "}
              {/* yaha humne current_price property ka use karke coin ke current price ko display kiya hai jise hum locally use karenge aur currency.symbol ka use karke selected currency ke symbol ko display kiya hai jise hum globally use karenge */}
              <p
                style={{
                  textAlign: "center",
                  color: item.price_change_percentage_24h > 0 ? "green" : "red",
                }}
              >
                {item.price_change_percentage_24h.toFixed(2)}%
              </p>{" "}
              {/* yaha humne price_change_percentage_24h property ka use karke coin ke 24h price change percentage ko display kiya hai jise hum locally use karenge aur textAlign style ka use karke usse center align kiya hai jise hum locally use karenge aur color style ka use karke uska color green ya red set kiya hai jise hum locally use karenge jisse agar price change percentage positive hoga to color green hoga aur agar negative hoga to color red hoga jise hum locally use karenge */}
              <p className="market-cap">
                {currency.symbol} {item.market_cap.toFixed(2)}
              </p>{" "}
              {/* yaha humne market_cap property ka use karke coin ke market cap ko display kiya hai jise hum locally use karenge aur toFixed(2) method ka use karke usse 2 decimal places tak limit kiya hai jise hum locally use karenge aur currency.symbol ka use karke selected currency ke symbol ko display kiya hai jise hum globally use karenge aur market-cap class ka use karke usse style kiya hai jise hum locally use karenge */}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default Home;
