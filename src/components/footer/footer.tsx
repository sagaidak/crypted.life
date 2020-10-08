import React from 'react'
import './footer.scss'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../icon/wannabe.svg'

const Footer = () => {
  return <footer>
    <div className="footer-col">
      <Link to="/">
        <Logo className="footer-logo" />
      </Link>
      <div className="footer-description">
        Сайт о том, где взять и как пользоваться криптовалютой.
        No bullshit.
      </div>
    </div>
    <div className="footer-col">
      <div className="footer-description">
        Способы купить и продать. Биржи, обменки, DEX биржи.
      </div>
    </div>
    <div className="footer-col">
      <div className="footer-description">
        Способы получить. Баунти (креатив, мемы, статьи, видео), багбаунти, мотивированный тестнет (incentivized / nodes), аирдропы (лайки, репосты, подписки), трейдинг ивенты, реферальные ивенты, амбасадор/комьюнити программы, development (коммандные гранты). 
      </div>
    </div>
    <div className="footer-col">
      <div className="footer-description">
        Способы приумножить. Трейдинг, лендинг, фарминг, стейкинг.
        Цены на комиссии, индексы, монеты, портфели.
      </div>
    </div>
    <div className="footer-col">
      <div className="footer-description">
        Обзоры всех способов и цен.
      </div>
    </div>
    
  </footer>
}

export default Footer