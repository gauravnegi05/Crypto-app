import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CoinContextProvider from "./context/CoinContext.jsx";

createRoot(document.getElementById("root")).render(
  // yaha humne createRoot() method use kiya hai jise hum globally use karenge jisme humne document.getElementById('root') diya hai jise hum locally use karenge jisse hum apne HTML file me root id ke element ko target karenge jise hum locally use karenge aur uske baad .render() method use karke StrictMode component me BrowserRouter component me CoinContextProvider component me App component ko wrap kiya hai jise hum globally use karenge jisse hum apne app me routing ka use kar sakte hai aur apne app ke sare components ko CoinContextProvider ke andar la sakte hai jisse wo CoinContext ke data ko access kar sakte hai jise hum globally use karenge
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* yaha humne BrowserRouter component use kiya hai jisme humne App component ko wrap kiya hai jise hum locally use karenge jisse hum apne app me routing ka use kar sakte hai jise hum locally use karenge */}
      <CoinContextProvider>
        {" "}
        {/* yaha humne CoinContextProvider component ko import kiya hai jise hum globally use karenge */}
        <App />{" "}
        {/* yaha humne App component ko import kiya hai jise hum globally use karenge */}
      </CoinContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
