import React, { useState, useEffect } from 'react'
import './portfolio-widget.scss'
import { Portfolio } from '../../pages/portfolios-page'
import { postData } from '../../services/api-service'
import PortfolioWidgetItem from '../portfolio-widget-item/portfolio-widget-item'

const PortfolioWidget = () => {
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

  if (!portfolios) return <div>loading</div>

  return <div className="widget w-1 h-2 portfolio-widget">
    <div className="head">Топ портфелей</div>
    {
      portfolios.map((x) => {
        return <PortfolioWidgetItem key={x._id} portfolio={x} />
      })
    }
  </div>
}

export default PortfolioWidget