import React from 'react'
import './main-page.scss'
import ExchangesWidget from '../components/exchanges-widget/exchanges-widget'
import FeesWidget from '../components/fees-widget/fees-widget'
import DefiWidget from '../components/defi-widget/defi-widget'
import MarketWidget from '../components/market-widget/market-widget'
import UpdatesWidget from '../components/updates-widget/updates-widget'
import DexWidget from '../components/dex-widget/dex-widget'
import ObmenkiWidget from '../components/obmenki-widget/obmenki-widget'
import PortfolioWidget from '../components/portfolio-widget/portfolio-widget'

const MainPage = () => {
  
  return <div className="mainContent">
    <UpdatesWidget />
    <FeesWidget />
    <DefiWidget />
    <MarketWidget />
    <ExchangesWidget />
    <DexWidget />
    <ObmenkiWidget />
    <PortfolioWidget />
  </div>

}

export default MainPage