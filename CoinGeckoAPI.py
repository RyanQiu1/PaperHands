import datetime
import pandas as pd
import requests
import time


CSV_CRYPTO = "crpyto.csv"


def getCoinsFromMarket():
    """ Importing list of coins in the market using CoinGecko """
    coinsId = []
    urlCoins = "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
    coinsData = requests.get(urlCoins).json()
    for i in range(0, len(coinsData) - 1):
        coinsId.append(coinsData[i]['id'])
    return coinsId


def getDataFromCoin(coinId):
    """ Testing for bitcoin at the moment """
    """ Retrieving data from coin and store it in a csv(database) """
    date = "17-05-2022"
    url = "https://api.coingecko.com/api/v3/coins/" + coinId + "/history?date=" + date
    coinData = requests.get(url).json()
    coinPrice = coinData['market_data']['current_price']['usd']
    coinCap = coinData['market_data']['market_cap']['usd']
    coinTup = coinPrice, coinCap
    print(coinTup)


def main():
    # coins = getCoinsFromMarket()
    # for coin in coins:
    #     getDataFromCoin(coin)
    getDataFromCoin("bitcoin")


if __name__ == "__main__":
    main()
