import React, { useState, useEffect } from 'react'
import './portfolios-page.scss'
import { postData } from '../services/api-service'
import PortfolioList from '../components/portfolio-list/portfolio-list'
import { Helmet } from 'react-helmet'

export type Coin = {
  _id: string
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
}

export type Trade = {
  _id: string
  geckoCoinId: string
  portfolioId: string
  quantity: number
  currency: string
  price: number
  openDate: string
  closeDate?: string
  createdAt: string
  isClosed: boolean
  closePrice?: number
  updatedAt?: string
  coin: Coin
}

export type Portfolio = {
  _id: string
  title: string
  currency: string
  img?: string
  description?: string
  author: string
  createdAt: string
  updatedAt?: string
  trades: Trade[]
}

const PortfoliosPage = () => {
  const [ portfolios, setPortfolios ] = useState<Portfolio[]>()

  const getPortfolios = async () => {
    try {
      const res = await postData({
        query: `
          query {
            portfolios {
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

      setPortfolios(res.data.portfolios)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getPortfolios()
  }, [])

  return <div className="portfolios-page">
    <Helmet>
      <title>{`Крипто портфолио —  Crypted.life`}</title>
      <meta name="description" content="Рейтинг портфолио и их производительности. Состав, доходность, открытые и закрытые позиции." />
    </Helmet>

    <div className="top-portfolios">
      <div className="top-portfolios-item"></div>
      <div className="top-portfolios-item"></div>
      <div className="top-portfolios-item"></div>
    </div>
    {
      portfolios && <PortfolioList portfolios={portfolios} />
    }
    
  </div>
}

export default PortfoliosPage