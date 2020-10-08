import React, { useState, useEffect } from 'react'
import { postData } from '../../services/api-service'
import { commafy } from '../../utils/helpers'
import { ReactComponent as MarketIcon } from '../icon/1F433.svg'
import './market-widget.scss'

type Market = {
  total_market_cap: number
  total_volume_24h: number
  market_cap_percentage: {
    btc: number
    eth: number
    usdt: number
  }
  market_cap_change_percentage_24h_usd: number
  fng: number
  btc_tx_24h: number
  eth_tx_24h: number
}

type GeckoCoin = {
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

const MarketWidget = () => {

  const [ market, setMarket ] = useState<Market | undefined>()
  const [ btcCoin, setBtcCoin ] = useState<GeckoCoin>()
  const [ ethCoin, setEthCoin ] = useState<GeckoCoin>()
  

  useEffect(() => {
    getMarket()
    getCoin('bitcoin')
    getCoin('ethereum')
  }, [])

  const getMarket = async () => {
    try {
      const res = await postData({
        query: `
          query {
            globals {
              total_market_cap
              total_volume_24h
              market_cap_percentage {
                btc
                eth
                usdt
              }
              market_cap_change_percentage_24h_usd
              fng
              btc_tx_24h
              eth_tx_24h
            }
          }
        `
      })

      setMarket(res.data.globals[0])
    } catch(err) {
      console.log(err)
    }
  }

  const getCoin = async (coin: string) => {
    try {
      const res = await postData({
        query: `
          query {
            geckoCoins(params: {id: "${coin}"}){
              symbol
              name
              image
              current_price
              price_change_percentage_24h
            }
          }
        `
      })

      if (coin === 'bitcoin') {
        setBtcCoin(res.data.geckoCoins[0])
      }

      if (coin === 'ethereum') {
        setEthCoin(res.data.geckoCoins[0])
      }
     

    } catch(err) {
      console.log(err)
    }
  }


  if (!market) return <div>undefined (loading)</div>

  let fngText, fngClass

  if (market.fng < 45) {
    fngText = 'Страх'
    fngClass = 'red'
  }
  if (market.fng >= 45 && market.fng <= 55 ) {
    fngText = 'Нейтрально'
    fngClass = 'blue'
  }
  if (market.fng > 55) {
    fngText = 'Жадность'
    fngClass = 'green'
  }

  return <div className="market widget w-1 h-1">
    <div className="market-header">
      <MarketIcon className="icon" />Рынок
    </div>
    <div className="market-line">
      {btcCoin && <>BTC: 
        <div>
          <b>$ {btcCoin.current_price}</b>
          <span className={btcCoin.price_change_percentage_24h >= 0 ? 'green' : 'red'}>
            {btcCoin.price_change_percentage_24h.toFixed(2)} %
          </span>
        </div>
      </>
      }
      
      {ethCoin && <>ETH: 
        <div>
          <b>$ {ethCoin.current_price}</b>
          <span className={ethCoin.price_change_percentage_24h >= 0 ? 'green' : 'red'}>
            {ethCoin.price_change_percentage_24h.toFixed(2)} %
          </span>
        </div>
      </>
      }
    </div>
    <div className="market-line">
      Страх и жадность: <div>
        <b>{market.fng} %</b>
        <span className={fngClass}>{fngText}</span>
      </div>
    </div>
    <div className="market-line">
      Глобальный рынок: <div>
        <b>$ {commafy(market.total_market_cap)}</b>
        <span className={market.market_cap_change_percentage_24h_usd >= 0 ? 'green' : 'red'}>
          {market.market_cap_change_percentage_24h_usd.toFixed(2)}%
        </span>
      </div>
    </div>
    

    <div className="market-line">
      BTC: <b>{market.market_cap_percentage.btc.toFixed(2)} %</b>
      ETH: <b>{market.market_cap_percentage.eth.toFixed(2)} %</b>
      USDT: <b>{market.market_cap_percentage.usdt.toFixed(2)} %</b>
    </div>

    <div className="market-line">
      Глобальный объем за 24ч: <b>$ {commafy(market.total_volume_24h)}</b>
    </div>
    <div className="market-line">
      Транзакции BTC за 24ч: <b>{commafy(market.btc_tx_24h)}</b>
    </div>
    <div className="market-line">
      Транзакции ETH за 24ч: <b>{commafy(market.eth_tx_24h)}</b>
    </div>

    <div className="bottom-line">Обновленовляется раз в 2 минуты</div>
    
  </div>
}

export default MarketWidget