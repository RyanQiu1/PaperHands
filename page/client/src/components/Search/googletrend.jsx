import React from "react";
import GoogleTrends from "./GoogleTrends";
import "./Search.module.css";

export default function Google( stockInfo ) {
  console.log(stockInfo);
  return (
    <div id="widget" >
    <GoogleTrends
      type="TIMESERIES"
      keyword={""+stockInfo}
      url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
    />
    <GoogleTrends
      type="GEO_MAP"
      keyword={""+stockInfo}
      url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
    />
  </div>
  );
}

//https://codesandbox.io/embed/competent-cookies-v2kjz?fontsize=14&hidenavigation=1&theme=dark