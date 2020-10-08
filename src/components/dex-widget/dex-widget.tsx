import React from 'react'
import './dex-widget.scss'

const dexes = [
  {
    href: 'https://app.uniswap.org/#/swap',
    imgSrc: 'https://assets.coingecko.com/markets/images/535/small/256x256_Black-1.png?1590893262',
    title: 'Uniswap (v2)'
  }, {
    href: 'https://aave.com/',
    imgSrc: 'https://assets.coingecko.com/markets/images/544/small/AAVE.png?1593088709',
    title: 'Aave'
  }, {
    href: 'https://www.justswap.io/#/home',
    imgSrc: 'https://assets.coingecko.com/markets/images/571/small/justswap.png?1599018792',
    title: 'Just Swap'
  }, {
    href: 'https://www.curve.fi/',
    imgSrc: 'https://assets.coingecko.com/markets/images/538/small/Curve.png?1591605481',
    title: 'Curve Finance'
  }, {
    href: 'https://1inch.exchange/#/',
    imgSrc: 'https://assets.coingecko.com/markets/images/553/small/1inch.png?1596373280',
    title: '1inch'
  }, {
    href: 'https://idex.market/eth/idex',
    imgSrc: 'https://assets.coingecko.com/markets/images/123/small/favicon-logo-wt-trans.png?1522032802',
    title: 'Idex'
  }, {
    href: 'https://www.binance.org/ru/trade/',
    imgSrc: 'https://assets.coingecko.com/markets/images/393/small/vq5ZEEmK_400x400.png?1556770224',
    title: 'Binance DEX'
  }, {
    href: 'https://poloniex.org/',
    imgSrc: 'https://assets.coingecko.com/markets/images/332/small/polonidex.jpg?1575008745',
    title: 'PoloniDEX'
  }, {
    href: 'https://app.compound.finance/',
    imgSrc: 'https://assets.coingecko.com/markets/images/517/small/compound-finance.png?1583219239',
    title: 'Compound Finance'
  }, {
    href: 'https://kyber.network/',
    imgSrc: 'https://assets.coingecko.com/markets/images/134/small/kyber-logo.png?1549850639',
    title: 'Kyber Network'
  }, {
    href: 'https://exchange.sushiswapclassic.org/#/swap',
    imgSrc: 'https://assets.coingecko.com/markets/images/576/small/sushiswap.png?1599708560',
    title: 'Sushiswap'
  }
]

const DexWidget = () => {

  if (!dexes) return <div>undefined (loading)</div>

  return <div className="dex-widget widget h-2 w-1">
    <div className="dex-header">
      Топ децентрализованых бирж (DEX)
    </div>
    {
      dexes.map((x) => <a key={x.title} href={x.href} target="_blank" rel="noopener noreferrer" className="dex-line">
        <img src={x.imgSrc} alt={x.title} className="icon" />
        {x.title}
      </a>)
    }
    
  </div>
}

export default DexWidget