import React from 'react'
import './portfolio-widget-item.scss'
import { Portfolio, Coin } from '../../pages/portfolios-page'
import { Link } from 'react-router-dom'

type Props = {
  portfolio: Portfolio
}

const PortfolioWidgetItem = (props: Props) => {
  const { portfolio } = props

  const activeTrades = portfolio.trades.filter((x) => {
    if (!x.isClosed) return x
  })

  const soldTrades = portfolio.trades.filter((x) => {
    if (x.isClosed) return x
  })

  const acquisitionPrice = activeTrades.reduce((prev, curr) => {
    return prev += curr.price
  }, 0)

  const currentPrice = activeTrades.reduce((prev, curr) => {
    return prev += curr.quantity * curr.coin.current_price
  }, 0)

  const soldPrice = soldTrades.reduce((prev, curr) => {
    const prevPrice = curr.closePrice || 0
    return prev += curr.quantity * prevPrice
  }, 0)

  const uniqueCoins: Array<{ coin: Coin, totalPrice: number}> = []

  activeTrades.map((x) => {
    const idx = uniqueCoins.findIndex((y) => y.coin._id === x.coin._id )
    const tPrice = x.quantity * x.coin.current_price

    if (idx === -1) {
      uniqueCoins.push({ coin: x.coin, totalPrice: tPrice })
    } else {
      uniqueCoins[idx] = {
        ...uniqueCoins[idx],
        totalPrice: uniqueCoins[idx].totalPrice + tPrice
      }
    }
  })

  const coinImages = uniqueCoins.slice(0, 3).map((x) => x.coin.image)

  const profit = currentPrice - acquisitionPrice

  const profitPercent = Math.round( profit / (acquisitionPrice / 100) )

  const date = portfolio.updatedAt || portfolio.createdAt

  return <div className="portfolio-widget-item">
    <div className="top-line">
      <div>
        <div className="title">
          <Link to={`/portfolio/${portfolio._id}`}>{portfolio.title}</Link></div>
        <div className="author">{portfolio.author}</div>
      </div>
      <div>
        <div className={`price ${profit > 0 ? 'green' : 'red'}`}>$ {profit}</div>
        <div className={`price-change ${profit > 0 ? 'green' : 'red'}`}>{profitPercent} %</div>
      </div>
    </div>

    <div className="coins">
      {
        uniqueCoins.sort((a, b) => b.totalPrice - a.totalPrice).map((x) => {
          const part = (x.totalPrice / currentPrice) * 100
          return <div key={x.coin._id} className="coin-item">
            <img src={x.coin.image} alt={x.coin.name} className="coin-icon"/>
            {x.coin.symbol} {part.toFixed(2)} %
          </div>
        })
      }
    </div>

    <div className="date">
      Обновлено: {new Date(+date).toLocaleDateString('ru')}
    </div>
  </div>
}

export default PortfolioWidgetItem