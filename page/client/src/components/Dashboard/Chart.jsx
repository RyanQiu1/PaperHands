import React, { useState, useEffect, useRef, Component } from "react";
import Title from "../Template/Title.jsx";
import LineChart from "../Template/LineChart";
import Axios from "axios";
import config from "../../config/Config";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
/** 
const Chart = () => {
  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      const url = config.base_url + `/api/data/random`;
      const response = await Axios.get(url);
      if (response.data.status === "success") {
        setChartData(response.data);
      }
    };
    getData();
  }, []);


  return (
    <React.Fragment>
      {chartData && (
        <div style={{ minHeight: "240px" }}>
          <Title>Explore {chartData.name}'s Stock Chart</Title>

          <LineChart
            pastDataPeriod={chartData.data}
            stockInfo={{ ticker: chartData.ticker }}
            duration={"3 years"}
          />

          new Example
        </div>
      )}
    </React.Fragment>
  );
};**/


const Chart = () => {
  const tradingRef = useRef(null);
  const [symbol, setSymbol] = useState("AAPL");

  useEffect(() => {
    console.log(tradingRef.current.props.symbol);
  }, []);

  console.log(symbol);

  return (
    <TradingViewWidget
      symbol={symbol}
      theme={Themes.LIGHT}
      locale="en"
      ref={tradingRef}
      autosize
    />
  );
};

export default Chart;