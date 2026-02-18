import React, { use, useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Larget <br /> Crypto Marketplace
        </h1>
        <p>Buy and sell cryptocurrencies easily on crypto-app</p>
        <form>
          <input type="text" placeholder="Search crypto.." />
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
        {displayCoins.slice(0, 10).map((item, index) => (
          <div className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
                <img src={item.image} alt={item.name} className="coin-image" />
                <p>{item.name} - {item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price}</p>
            <p style={{ textAlign: "center", color: item.price_change_percentage_24h > 0 ? "green" : "red" }}>{item.price_change_percentage_24h.toFixed(2)}%</p>
            <p className="market-cap">{currency.symbol} {item.market_cap.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
