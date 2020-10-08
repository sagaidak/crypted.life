import React from 'react'
import { Portfolio, Coin } from '../../pages/portfolios-page'
import { Link } from 'react-router-dom'
import './portfolio-item.scss'

type Props = {
  portfolio: Portfolio
}

const PortfolioItem = (props: Props) => {
  const { portfolio } = props
  const defaultImage = 'https://crypted.life:3001/files/icons/default-image.png'

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

  const uniqueCoins: Coin[] = []

  activeTrades.map((x) => {
    if (uniqueCoins.findIndex((y) => y._id === x.coin._id ) === -1) uniqueCoins.push(x.coin)
  })

  const coinImages = uniqueCoins.slice(0, 3).map((x) => x.image)

  const profit = currentPrice - acquisitionPrice

  const profitPercent = Math.round( profit / (acquisitionPrice / 100) )

  const date = portfolio.updatedAt || portfolio.createdAt


  return <Link className="portfolio-item" to={`/portfolio/${portfolio._id}`}>
    <div className="author">
      <img className="portfolio-item-ava" src={portfolio.img || defaultImage} alt="portfolio avatar" />
    

      <div className="" style={{textAlign: 'left'}}>
        <div className="item-top">{portfolio.author}</div>
        <div className="item-mid">{portfolio.title}</div>
        <div>Обновлено: {new Date(+date).toLocaleDateString('ru')}</div>
      </div>
    </div>
    
    <div className="portfolio-item-col">
      <div className="item-top">Цена покупки</div>
      <div className="item-mid">{Math.round(acquisitionPrice)} {portfolio.currency}</div>
    </div>

    <div className="portfolio-item-col">
      <div className="item-top">Стоимость</div>
      <div className="item-mid">{Math.round(currentPrice)} {portfolio.currency}</div>
    </div>

    <div className="portfolio-item-col">
      <div className="item-top">Продано</div>
      <div className="item-mid">{Math.round(soldPrice)} {portfolio.currency}</div>
    </div>

    <div className="portfolio-item-col coins">
      <div className="item-top">Монеты</div>
      <div className="item-mid">{coinImages.map((x) => <img className="portfolio-item-coin-icon" src={x} key={x} alt="coin" />)}</div>
      <div>{uniqueCoins.length > 3 && '+' + uniqueCoins.length}</div>
    </div>

    <div className="portfolio-item-col">
      <div className="item-top">Прибыль</div>
      <div className="item-mid">{Math.round(profit)} {portfolio.currency}</div>
      <div>{`${profitPercent} %`}</div>
    </div>
  </Link>
}

export default PortfolioItem