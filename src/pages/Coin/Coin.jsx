import React, { useContext, useEffect, useState } from "react";
import "./coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import Linechart from "../../components/Linechart/Linechart";

const Coin = () => {
  const { coinid } = useParams(); //yaha humne coinid ki value ko use kiya hai jise hum globally use karenge jise hum URL se get karenge jise hum globally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse URL me coinid ki value milegi jise hum globally use karenge
  const [coinData, setCoinData] = useState(null); //yaha humne coinData aur setCoinData state banaya hai jise hum locally use karenge jisme hum CoinGecko API se aane wala data ko store karenge jise hum locally use karenge
  const [historyData, setHistoryData] = useState(null); //yaha humne historyData aur setHistoryData state banaya hai jise hum locally use karenge jisme hum CoinGecko API se aane wala historical data ko store karenge jise hum locally use karenge

  const { currency } = useContext(CoinContext); //yaha humne CoinContextProvider component ko import kiya hai jise hum globally use karenge jisme humne currency state ko destructure kiya hai jise hum globally use karenge

  const currencyName = currency?.name || currency; //yaha humne currencyName variable banaya hai jisme humne currency state ke name property ko store kiya hai jise hum globally use karenge jisse jab bhi user select dropdown me currency change karega to currencyName variable automatically update hoga jise hum globally use karenge

  const fetchCoinData = async () => {
    //yaha humne fetchCoinData function banaya hai jisme hum CoinGecko API se data fetch karenge aur usse state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karke coinData state me store karenge jise hum locally use karenge
    try {
      const options = {
        //yaha humne options object banaya hai jisme humne method aur headers ko define kiya hai jise hum CoinGecko API se data fetch karne ke liye use karenge jise hum locally use karenge
        method: "GET",
        headers: { "x-cg-demo-api-key": "CG-gkmX7EG927cSpHwc2Rg9UTJN" },
      };

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinid}`, //yaha humne CoinGecko API se data fetch karne ke liye URL banaya hai jisme humne coinid ko dynamically use kiya hai jise hum globally change kar sakte hai jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karke coinData state me store karenge jise hum locally use karenge
        options,
      );
      const data = await res.json(); // API se response aane ke baad usse JSON format me convert karne ke liye .json() method use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karke coinData state me store karenge jise hum locally use karenge
      setCoinData(data); // API se aane wala data ko coinData state me store karne ke liye setCoinData() method use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karke coinData state me store karenge jise hum locally use karenge
    } catch (error) {
      console.error("Error fetching coin data:", error); // Agar API call me koi error aata hai to usse console me dekhne ke liye console.error() method use kiya hai jisme hum error ko console.error() method se print karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me agar koi error aata hai to usse console me dekhne ke liye console.error() method use kiya hai jise hum locally use karenge
    }
  };

  const fetchHistoryData = async () => {
    //yaha humne fetchHistoryData function banaya hai jisme hum CoinGecko API se historical data fetch karenge aur usse state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge
    const options = {
      //yaha humne options object banaya hai jisme humne method aur headers ko define kiya hai jise hum CoinGecko API se data fetch karne ke liye use karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge
      method: "GET",
      headers: { "x-cg-demo-api-key": "CG-gkmX7EG927cSpHwc2Rg9UTJN" },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currencyName}&days=10&interval=daily`, //yaha humne CoinGecko API se historical data fetch karne ke liye URL banaya hai jisme humne coinid, currencyName, days aur interval ko dynamically use kiya hai jise hum globally change kar sakte hai jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge
      options,
    )
      .then((res) => res.json()) // API se response aane ke baad usse JSON format me convert karne ke liye .json() method use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge
      .then((res) => {
        setHistoryData(res); // API se aane wala historical data ko historyData state me store karne ke liye setHistoryData() method use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge
      })
      .catch((err) => console.error(err)); // Agar API call me koi error aata hai to usse console me dekhne ke liye .catch() method use kiya hai jisme hum error ko console.error() method se print karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karne me agar koi error aata hai to usse console me dekhne ke liye .catch() method use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karne me agar koi error aata hai to usse console me dekhne ke liye .catch() method use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karne me agar koi error aata hai to usse console me dekhne ke liye .catch() method use kiya hai jise hum locally use karenge
  };

  useEffect(() => {
    // yaha humne useEffect hook use kiya hai jisme humne fetchCoinData() aur fetchHistoryData() functions ko call kiya hai jise hum coinid aur currency ke change hone par automatically call karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karke coinData aur historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karke coinData aur historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karke coinData aur historyData state me store karenge jise hum locally use karenge
    fetchCoinData(); // yaha humne fetchCoinData() function ko call kiya hai jise hum coinid aur currency ke change hone par automatically call karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karke coinData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karke coinData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karke coinData state me store karenge jise hum locally use karenge
    fetchHistoryData(); // yaha humne fetchHistoryData() function ko call kiya hai jise hum coinid aur currency ke change hone par automatically call karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karke historyData state me store karenge jise hum locally use karenge
  }, [coinid, currency]); // yaha humne useEffect hook ke dependency array me coinid aur currency ko add kiya hai jisse jab bhi coinid ya currency change hoga to useEffect hook automatically run hoga aur fetchCoinData() aur fetchHistoryData() functions call honge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karke coinData aur historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karke coinData aur historyData state me store karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karke coinData aur historyData state me store karenge jise hum locally use karenge

  if (!coinData || !historyData) {
    // yaha humne condition lagayi hai jisme hum check kar rahe hai ki agar coinData ya historyData state me data nahi hai to loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data aur historical data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge
    return (
      <div className="coin">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        {coinData?.image?.large && ( // yaha humne condition lagayi hai jisme hum check kar rahe hai ki agar coinData state me image.large property hai to usse image ko show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge
          <img src={coinData.image.large} alt={coinData?.name || "Coin"} /> // yaha humne img tag use karke coinData state me image.large property ke value ko src attribute me use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge
        )}
        <h1>{coinData?.name || ""}</h1>{" "}
        {/* yaha humne coinData state me name property ke value ko h1 tag me use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge */}
        <p>
          {coinData?.name || ""} ({coinData?.symbol?.toUpperCase() || ""}){" "}
          {/* yaha humne coinData state me name aur symbol properties ke value ko p tag me use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge */}
        </p>
      </div>
      <div className="coin-chart">
        {/* ✅ Fixed: prop name matches what Linechart expects */}
        <Linechart historydata={historyData} />{" "}
        {/* yaha humne Linechart component use kiya hai jisme humne historyData state ke data ko historydata prop me pass kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka historical data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge */}
      </div>
      <div className="coin-details">
        <h2>
          Current Price: {currency.symbol}{" "}
          {coinData?.market_data?.current_price?.[currencyName.toLowerCase()] ||
            "N/A"}
        </h2>{" "}
        {/* yaha humne coinData state me market_data.current_price property ke value ko h2 tag me use kiya hai jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge jisse jab bhi user kisi coin ke detail page par jayega to usse CoinGecko API se us coin ka data fetch karne me thoda time lagega to usse loading message show karenge jise hum locally use karenge */}
        <p>
          Market Cap: {currency.symbol}{" "}
          {coinData?.market_data?.market_cap?.[currencyName.toLowerCase()] ||
            "N/A"}
        </p>
        <p>
          24h Change:{" "}
          {coinData?.market_data?.price_change_percentage_24h?.toFixed(2) ||
            "N/A"}
          %
        </p>
        <p>
          24h High: {currency.symbol}{" "}
          {coinData?.market_data?.high_24h?.[currencyName.toLowerCase()] ||
            "N/A"}
        </p>
        <p>
          24h Low: {currency.symbol}{" "}
          {coinData?.market_data?.low_24h?.[currencyName.toLowerCase()] ||
            "N/A"}
        </p>
        <p>
          Circulating Supply:{" "}
          {coinData?.market_data?.circulating_supply?.toLocaleString() || "N/A"}
        </p>
        <p>
          Total Supply:{" "}
          {coinData?.market_data?.total_supply?.toLocaleString() || "N/A"}
        </p>
        <p>
          Max Supply:{" "}
          {coinData?.market_data?.max_supply?.toLocaleString() || "N/A"}
        </p>
        <p>
          Last Updated:{" "}
          {new Date(coinData?.last_updated).toLocaleString() || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default Coin;
