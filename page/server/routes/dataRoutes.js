const express = require("express");
const router = express.Router();
const {
  getStockInfo,
  getStockHistoricData,
  getRandomStockData,
  getStockFundamental,
  getStockRecommendation,
} = require("../controllers/dataController");

router.route("/prices/:ticker").get(getStockInfo);
router.route("/prices/:ticker/full").get(getStockHistoricData);
router.route("/random").get(getRandomStockData);
router.route("/fundamentals/:ticker").get(getStockFundamental);
router.route("/stockrecommendation").get(getStockRecommendation);


module.exports = router;
