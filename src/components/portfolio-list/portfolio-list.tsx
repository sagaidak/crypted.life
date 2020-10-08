import React from 'react'
import { Portfolio } from '../../pages/portfolios-page'
import PortfolioItem from '../portfolio-item/portfolio-item'

type Props = {
  portfolios: Portfolio[]
}

const PortfolioList = (props: Props) => {
  const { portfolios } = props

  return <div>
    {
      portfolios && portfolios.map((x) => {
        if (x.trades && x.trades.length > 0) return <PortfolioItem key={x._id} portfolio={x} />
      })
    }
  </div>
}

export default PortfolioList