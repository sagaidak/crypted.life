import React, { useState } from 'react'
import { Portfolio, Coin } from '../../pages/portfolios-page'
import { useParams } from 'react-router-dom'
import { postData } from '../../services/api-service'
import './single-portfolio.scss'
import { Helmet } from 'react-helmet'

type Props = {
  portfolio?: Portfolio
}

const SinglePortfolio = (props: Props) => {
  const { id } = useParams()

  const [ portfolio, setPortfolio ] = useState<Portfolio|undefined>(props.portfolio)

  const getPortfolio = async () => {
    try {
      const res = await postData({
        query: `
          query {
            portfolios (params: {
              _id: "${id}"
            }) {
              _id
              title
              currency
              img
              description
              author
              createdAt
              updatedAt
              trades {
                _id
                geckoCoinId
                portfolioId
                quantity
                currency
                price
                openDate
                isClosed
                closeDate
                closePrice
                createdAt
                updatedAt
                coin {
                  _id
                  id
                  symbol
                  name
                  image
                  current_price
                }
              }
            }
          }
        `
      })

      setPortfolio(res.data.portfolios[0])
    } catch (err) {
      throw err
    }
  }

  if (!portfolio && id) {
    getPortfolio()
  }


  if (!portfolio) return <div>
    Not found
  </div>

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


  return <div className="single-portfolio">
    <Helmet>
      <title>{`Крипто портфолио от ${portfolio.author} — Crypted.life`}</title>
      <meta name="description" content="Рейтинг портфолио и их производительности. Состав, доходность, открытые и закрытые позиции." />
    </Helmet>
    <div className="single-portfolio-author">
      <img className="single-portfolio-item-ava" src={portfolio.img || defaultImage} alt="portfolio avatar" />

      <div className="author-data">
        <div className="item-top">{portfolio.author}</div>
        <div className="item-mid">{portfolio.title}</div>
        <div className="item-date">Обновлено: {new Date(+date).toLocaleDateString('ru')}</div>
      </div>
    </div>

    

    <div className="single-portfolio-description">
      <div>{portfolio.description}</div>
    </div>
    
    <div className="single-portfolio-item" >
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
  
      <div className="portfolio-item-col">
        <div className="item-top">Монеты</div>
        <div className="item-mid">{coinImages.map((x) => <img className="portfolio-item-coin-icon" src={x} key={x} alt="coin" />)}</div>
        <div>{uniqueCoins.length > 3 && '+' + uniqueCoins.length}</div>
      </div>
  
      <div className="portfolio-item-col">
        <div className="item-top">Прибыль</div>
        <div className="item-mid">{Math.round(profit)} {portfolio.currency}</div>
        <div>{`${profitPercent} %`}</div>
      </div>
    </div>

    {activeTrades && activeTrades.length > 0 && <div className="trades-head">Открытые позиции:</div>}
    <div className="portfolio-trades">
    {
      activeTrades && activeTrades.map((x) => {

        return <div key={x._id} className="portfolio-trade">
          
          <div className="trade-col">
            <div className="trade-col-top">дата</div>
            <div className="trade-col-mid">{new Date(+x.createdAt).toLocaleDateString('ru')}</div>
          </div>
          <div className="trade-col">
            <div className="trade-col-top">монета</div>
            <div className="trade-col-mid">{x.coin.id}</div>
          </div>
          <div className="trade-col">
            <div className="trade-col-top">количество</div>
            <div className="trade-col-mid">{x.quantity}</div>
          </div>
          <div className="trade-col">
            <div className="trade-col-top">валюта</div>
            <div className="trade-col-mid">{x.currency}</div>
          </div>
          <div className="trade-col">
            <div className="trade-col-top">цена</div>
            <div className="trade-col-mid">{x.price}</div>
          </div>
        </div>
      })
    }
    </div>

    {soldTrades && soldTrades.length > 0 && <div className="trades-head">Закрытые позиции:</div>}
    <div className="portfolio-trades">
    {
      soldTrades && soldTrades.map((x) => {

        return <div key={x._id} className="portfolio-trade">
          
          <div className="trade-col">
            <div className="trade-col-top">дата</div>
            <div className="trade-col-mid">{new Date(+x.createdAt).toLocaleDateString('ru')}</div>
          </div>
          <div className="trade-col">
            <div className="trade-col-top">монета</div>
            <div className="trade-col-mid">{x.coin.id}</div>
          </div>
          <div className="trade-col">
            <div className="trade-col-top">количество</div>
            <div className="trade-col-mid">{x.quantity}</div>
          </div>
          <div className="trade-col">
            <div className="trade-col-top">валюта</div>
            <div className="trade-col-mid">{x.currency}</div>
          </div>
          <div className="trade-col">
            <div className="trade-col-top">цена</div>
            <div className="trade-col-mid">{x.price}</div>
          </div>
        </div>
      })
    }
    </div>
    
    
  </div>
  
}

export default SinglePortfolio