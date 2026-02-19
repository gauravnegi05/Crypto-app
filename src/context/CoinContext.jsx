import { createContext, useEffect, useState } from "react";

// 1️⃣ Create a Context object
// This is like a global store that any component can subscribe to
export const CoinContext = createContext(); //yaha humne CoinContext create kiya hai jise hum globally use karenge

const CoinContextProvider = (props) => {
  //yaha humne CoinContextProvider component banaya hai jise hum globally use karenge jisme hum apne global state aur functions ko define karenge jise hum globally use karenge
  // 2️⃣ Local state that will be shared globally through Context
  const [allCoins, setAllCoins] = useState([]); // in state me humne allCoins aur setAllCoins banaya hai jise hum globally use karenge
  const [currency, setCurrency] = useState({
    // in state me humne currency aur setCurrency banaya hai jise hum globally use karenge
    name: "USD", // selected currency jise hum globally use karenge
    symbol: "$", // selected currency ka symbol jise hum globally use karenge
  });

  // 3️⃣ Function to fetch coin data from CoinGecko API
  // This data will be stored in state and shared via Context
  const fetchAllCoins = async () => {
    //idhar humne fetchAllCoins function banaya hai jisme hum CoinGecko API se data fetch karenge aur usse state me store karenge
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": "CG-gkmX7EG927cSpHwc2Rg9UTJN" }, //iss header me humne CoinGecko API key provide ki hai jise hum API se data fetch karne ke liye use karenge
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h`,
      options,
    ) //yaha humne CoinGecko API se data fetch karne ke liye URL banaya hai jisme humne currency.name ko dynamically use kiya hai jise hum globally change kar sakte hai
      .then((res) => res.json()) // API se response aane ke baad usse JSON format me convert karne ke liye .json() method use kiya hai
      .then((res) => {
        console.log(res); // API se aane wala data console me dekhne ke liye console.log() method use kiya hai
        // 4️⃣ Update the shared state
        // Any component using this context will re-render automatically
        setAllCoins(res); // API se aane wala data ko allCoins state me store karne ke liye setAllCoins() method use kiya hai jise hum globally use karenge
      })
      .catch((err) => console.error(err)); // Agar API call me koi error aata hai to usse console me dekhne ke liye .catch() method use kiya hai jisme hum error ko console.error() method se print karenge
  };

  // 5️⃣ useEffect runs whenever "currency" changes
  // This keeps the global data in sync with selected currency
  useEffect(() => {
    // yaha humne useEffect hook use kiya hai jisme humne fetchAllCoins() function ko call kiya hai jise hum currency ke change hone par automatically call karenge jisse humara global data selected currency ke sath sync me rahega
    fetchAllCoins(); // yaha humne fetchAllCoins() function ko call kiya hai jise hum currency ke change hone par automatically call karenge jisse humara global data selected currency ke sath sync me rahega
  }, [currency]); // yaha humne useEffect hook ke dependency array me currency ko add kiya hai jisse jab bhi currency change hoga to useEffect hook automatically run hoga aur fetchAllCoins() function call hoga jisse humara global data selected currency ke sath sync me rahega

  // 6️⃣ This object holds all the values you want to share globally
  const contextValue = {
    // yaha humne contextValue object banaya hai jisme humne allCoins, setAllCoins, currency, setCurrency ko store kiya hai jise hum globally use karenge
    allCoins, // API se aane wala data jise hum globally use karenge
    setAllCoins, // API se aane wala data ko update karne ke liye function jise hum globally use karenge
    currency, // selected currency jise hum globally use karenge
    setCurrency, // selected currency ko update karne ke liye function jise hum globally use karenge
  };

  return (
    // 7️⃣ Provider makes the context data available to all child components
    // Any component wrapped inside CoinContext.Provider can access this data
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider> // yaha humne CoinContext.Provider component use kiya hai jisme humne value prop me contextValue object pass kiya hai jise hum globally use karenge aur props.children ko render kiya hai jise humare app ke sare components is context ke andar aayenge jisse wo is context ke data ko access kar sakte hai
  );
};

export default CoinContextProvider; // yaha humne CoinContextProvider component ko export kiya hai jise hum apne app me import karke use karenge jisse humara global data app ke sare components me available ho jayega
