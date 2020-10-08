import React from 'react'
import './exchanges-widget.scss'

type Exchange = {
  href: string
  imgSrc: string
  title: string
  fiat?: boolean
  leverage?: string
}

const exchanges = [
  {
    href: 'https://www.binance.com/ru/?ref=25512809',
    imgSrc: 'https://assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250',
    title: 'Binance',
    fiat: true,
    leverage: 'x125'
  }, {
    href: 'https://www.bitmex.com/register/HEO1V4',
    imgSrc: 'https://assets.coingecko.com/markets/images/378/small/BitMEX.png?1591671734',
    title: 'BitMex',
    fiat: false,
    leverage: 'x100'
  }, {
    href: 'https://kuna.io?r=kunaid-i8j97rhve1uk',
    imgSrc: 'https://assets.coingecko.com/markets/images/97/small/kuna_exchange.png?1545126178',
    title: 'Kuna',
    fiat: true,
    leverage: 'Нет'
  }, {
    href: 'https://exmo.com/?ref=456692',
    imgSrc: 'https://assets.coingecko.com/markets/images/59/small/exmo.png?1584091923',
    title: 'Exmo',
    fiat: true,
    leverage: 'Нет'
  }, {
    href: 'https://www.zb.com/en/register?recommendCode=ub6xb2&lan=en',
    imgSrc: 'https://assets.coingecko.com/markets/images/115/small/zb.jpg?1519996151',
    title: 'ZB',
    fiat: false,
    leverage: 'x3'
  }, {
    href: 'https://poloniex.com/signup?c=2EUTSNL2',
    imgSrc: 'https://assets.coingecko.com/markets/images/37/small/poloniex.jpg?1519639007',
    title: 'Poloniex',
    fiat: true,
    leverage: 'x100'
  }, {
    href: 'https://bittrex.com/Account/Register?referralCode=0PK-N4T-U3M',
    imgSrc: 'https://assets.coingecko.com/markets/images/10/small/BG-color-250x250_icon.png?1596167574',
    title: 'Bittrex',
    fiat: true,
    leverage: 'x100'
  }, {
    href: 'https://www.bitfinex.com/?refcode=OdD_PuDGA',
    imgSrc: 'https://assets.coingecko.com/markets/images/4/small/logo.png?1591775047',
    title: 'Bitfinex',
    fiat: true,
    leverage: 'x5'
  }, {
    href: 'https://www.huobi.com/ru-ru/topic/invited/?invite_code=gntu3',
    imgSrc: 'https://assets.coingecko.com/markets/images/25/small/1481589873352_.pic_hd.jpg?1589962155',
    title: 'Huobi',
    fiat: true,
    leverage: 'x3'
  }, {
    href: 'https://www.bitstamp.net/',
    imgSrc: 'https://assets.coingecko.com/markets/images/9/small/bitstamp.jpg?1519627979',
    title: 'Bitstamp',
    fiat: true,
    leverage: 'Нет'
  }
]

const ExchangesWidget = () => {


  return <div className="exchanges-widget widget w-1 h-2">
    <div className="exchanges-widget-header">Топ криптобирж</div>
    
    <div className="exchanges-widget-head">
      <div>Название</div>
      <div>Плечо</div>
      <div>Цена</div>
    </div>

    {
      exchanges && exchanges.map((x, i) => {
        return <a 
          className="exchanges-widget-item" 
          href={x.href} 
          target="_blank"
          rel="noopener noreferrer"
          key={x.title}
        >
          <div>
            <img 
              src={x.imgSrc} 
              width="20px"
              alt={x.title} />
            {x.title}
          </div>

          <div>{x.leverage?x.leverage:''}</div>
        </a>
      })
    }

  </div>
}

export default ExchangesWidget