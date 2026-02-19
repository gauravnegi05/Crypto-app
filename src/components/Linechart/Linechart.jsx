import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Linechart = ({ historydata }) => {
  //yaha humne Linechart component banaya hai jisme hum historydata prop ko receive karenge jise hum Coin component se pass karenge jisme hum CoinGecko API se coin ke price history data ko fetch karenge jise hum Linechart component me chart me display karenge
  const [chartData, setChartData] = useState([["Date", "Price"]]); //yaha humne chartData state banaya hai jisme hum chart me display karne ke liye data ko store karenge jise hum locally use karenge jisme humne initial value me [["Date", "Price"]] diya hai jise hum locally use karenge jisse hum apne chart me date aur price ke columns ko define karenge jise hum locally use karenge

  useEffect(() => {
    //yaha humne useEffect hook use kiya hai jisme humne historydata ke change hone par chartData state ko update karne ke liye code likha hai jise hum locally use karenge jisse jab bhi historydata change hoga to useEffect hook automatically run hoga aur chartData state ko update karega jise hum locally use karenge
    if (historydata?.prices?.length) {
      //yaha humne condition lagayi hai jisme hum check kar rahe hai ki agar historydata me prices array hai aur usme data hai to hi chartData state ko update karenge jise hum locally use karenge jisse jab bhi historydata change hoga to useEffect hook automatically run hoga aur agar historydata me prices array hai aur usme data hai to hi chartData state ko update karega jise hum locally use karenge
      const formattedData = historydata.prices.map((item) => [
        //yaha humne historydata ke prices array ke data ko map() method use karke formattedData array me convert kiya hai jisme humne har item ke first element ko date me convert kiya hai aur second element ko price me convert kiya hai jise hum locally use karenge jisse jab bhi historydata change hoga to useEffect hook automatically run hoga aur agar historydata me prices array hai aur usme data hai to hi chartData state ko update karega jise hum locally use karenge
        new Date(item[0]),
        item[1],
      ]);
      setChartData([["Date", "Price"], ...formattedData]); //yaha humne setChartData() method use karke chartData state ko update kiya hai jisme humne first element me ["Date", "Price"] diya hai jise hum locally use karenge jisse hum apne chart me date aur price ke columns ko define karenge jise hum locally use karenge aur uske baad ...formattedData diya hai jise hum locally use karenge jisse hum apne chart me historydata ke prices array ke data ko display karenge jise hum locally use karenge
    }
  }, [historydata]); //yaha humne useEffect hook ke dependency array me historydata ko add kiya hai jisse jab bhi historydata change hoga to useEffect hook automatically run hoga aur chartData state ko update karega jise hum locally use karenge

  if (!historydata) {
    //yaha humne condition lagayi hai jisme hum check kar rahe hai ki agar historydata undefined hai to chart me "Loading chart..." message display karenge jise hum locally use karenge jisse jab bhi historydata change hoga to useEffect hook automatically run hoga aur agar historydata undefined hai to hi chart me "Loading chart..." message display karega jise hum locally use karenge
    return <p>Loading chart...</p>;
  }

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData} //yaha humne Chart component ke data prop me chartData state ko pass kiya hai jise hum locally use karenge jisse hum apne chart me historydata ke prices array ke data ko display karenge jise hum locally use karenge
        options={{
          title: "Price History (10 Days)",
          curveType: "function",
          hAxis: {
            title: "Date",
            format: "MMM dd",
          },
          vAxis: {
            title: "Price",
            format: "short",
          },
          legend: { position: "none" },
          colors: ["#2979ff"],
          backgroundColor: "transparent",
          chartArea: { width: "85%", height: "75%" },
        }}
      />
    </div>
  );
};

export default Linechart;
