const Axios = require("axios");
const data = require("../config/stocksData");




exports.getStockMetaData = async (req, res) => {
  try {
    const url = `https://api.tiingo.com/tiingo/daily/${req.params.ticker}?token=${process.env.TIINGO_API_KEY}`;

    const response = await Axios.get(url);
    return res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
    });
  }
};

exports.getStockInfo = (req, res) => {
  let info;
  data.stockData.forEach((stock) => {
    if (stock.ticker.toLowerCase() === req.params.ticker.toLowerCase()) {
      info = stock;
    }
  });

  if (info) {
    return res.status(200).json({
      status: "success",
      data: info,
    });
  } else {
    return res.status(200).json({
      status: "fail",
    });
  }
};

// Data needed: average for each of the last 6 months + latest daily data + last month of data points + last 2 years of data points, sampled weekly
exports.getStockHistoricData = async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 2);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    const url = `https://api.tiingo.com/tiingo/daily/${req.params.ticker}/prices?startDate=${year}-${month}-${day}&token=${process.env.TIINGO_API_KEY}`;
    const response = await Axios.get(url);
    const data = response.data;

    // Last month
    const pastMonth = [];

    for (let i = 0; i < 25; i++) {
      pastMonth.push({
        date: data[data.length - 1 - i].date,
        adjClose: data[data.length - 1 - i].adjClose,
      });
    }

    // Average of last 6 months:
    const sixMonthAverages = [];
    let latestMonth = new Date(data[data.length - 1].date).getMonth();
    let index = data.length - 1;

    for (let i = 0; i < 6; i++) {
      let monthAverage = data[index].adjClose;
      let dataPoints = 1;
      index -= 1;
      while (new Date(data[index].date).getMonth() === latestMonth) {
        monthAverage += data[index].adjClose;
        dataPoints += 1;
        index -= 1;
      }

      sixMonthAverages.push({
        value:
          Math.round((monthAverage / dataPoints + Number.EPSILON) * 100) / 100,
        month: latestMonth,
      });
      latestMonth = new Date(data[index].date).getMonth();
    }

    // Past 2 years
    const pastTwoYears = [];
    for (let i = data.length - 1; i >= 0; i -= 5) {
      pastTwoYears.push({
        date: data[i].date,
        adjClose: Math.round((data[i].adjClose + Number.EPSILON) * 100) / 100,
      });
    }

    sixMonthAverages.reverse();
    pastMonth.reverse();
    pastTwoYears.reverse();

    // Return response
    return res.status(200).json({
      status: "success",
      pastDay: {
        date: data[data.length - 1].date,
        adjClose: data[data.length - 1].adjClose,
        adjOpen: data[data.length - 1].adjOpen,
        adjHigh: data[data.length - 1].adjHigh,
        adjLow: data[data.length - 1].adjLow,
      },
      pastMonth,
      pastTwoYears,
      sixMonthAverages,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "fail",
    });
  }
};

const getRandomTicker = () => {
  const randomIndex = Math.floor(
    Math.random() * Math.floor(data.stockData.length)
  );
  return {
    ticker: data.stockData[randomIndex].ticker,
    name: data.stockData[randomIndex].name,
  };
};


exports.getStockRecommendation = async (req, res) => {
  try{
  const axios = require("axios");
  const cheerio = require("cheerio");
  const express = require("express");
  const app = express();
  
  async function cryptopriceScraper() {
    const url = "https://www.fortunebuilders.com/best-stocks-to-buy/";
    const coinArray = [];
    await axios(url).then((response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);

      const selectedElem =
       "#wrapper > main > div:nth-child(4) > div > div.container.p-0.post-content > div.blog-content.pt-4.pb-4 > ol";
    const keys = [
      "name1",
      "name2",
      "name3",
      "name4",
      "name5",
    ];

    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const coinDetails = {};
      if (parentIndex <= 5) {
        $(parentElem)
          .children()
          .each((childId, childElem) => {
            const value = $(childElem).text();
            if (value) {
              coinDetails[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
        coinArray.push(coinDetails);
      }
    });
  });
    return coinArray;
  }
  const crypto = await cryptopriceScraper();
  console.log(crypto);
  return res.status(200).json({
      status: "success",
      informa: { 
        recommendat: crypto,
    },
  });
} catch (error) {
    return res.status(200).json({
      status: "fail",
    });
  }
};


exports.getStockFundamental = async (req, res) => {
  try {
    const url = `https://api.tiingo.com/tiingo/fundamentals/${req.params.ticker}/daily?&token=${process.env.TIINGO_API_KEY}`;

  const response = await Axios.get(url);
  const data = response.data;

  for (let i = response.data.length - 1; i >= 0; i -= 6) {
    data.push({
      date: response.data[i].date,
      marketCap: response.data[i-1],
      enterpriseVal: response.data[i-2],
      peRatio: response.data[i-3],
      pbRatio: response.data[i-4],
      trailingPEG1Y: response.data[i-5],
    });
  }

  return res.status(200).json({
    status: "success",
    informa: { 
      date: data[1].date,
      marketCap: data[1].marketCap,
      enterpriseVal: data[1].enterpriseVal,
      peRatio: data[1].peRatio,
      pbRatio: data[1].pbRatio,
      trailingPEG1Y: data[1].trailingPEG1Y,
    }
  });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
    });
  }
};


exports.getRandomStockData = async (req, res) => {
  try {
    const stock = getRandomTicker();

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 3);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    const url = `https://api.tiingo.com/tiingo/daily/${stock.ticker}/prices?startDate=${year}-${month}-${day}&token=${process.env.TIINGO_API_KEY}`;

    const response = await Axios.get(url);

    const data = [];
    for (let i = response.data.length - 1; i >= 0; i -= 5) {
      data.push({
        date: response.data[i].date,
        adjClose:
          Math.round((response.data[i].adjClose + Number.EPSILON) * 100) / 100,
      });
    }

    data.reverse();

    return res.status(200).json({
      status: "success",
      ticker: stock.ticker,
      name: stock.name,
      data,
    });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
    });
  }
};
