import React from 'react'
import './left-menu.scss'

import { Link } from 'react-router-dom'

const LeftMenu = () => {
  return (
    <div className="leftMenu">
      <Link to="/bounty" className="leftMenuItem">
        <img src="https://crypted.life:3001/files/emoji/1F370.svg" className="menuIcon" alt="Menu Icon" />
          Баунти
      </Link>
      <Link to="/obmenki" className="leftMenuItem">
        <img src="https://crypted.life:3001/files/emoji/1F4B3.svg" className="menuIcon" alt="Menu Icon" />
          Обменки
      </Link>
      <Link to="/portfolios" className="leftMenuItem">
        <img src="https://crypted.life:3001/files/emoji/1F984.svg" className="menuIcon" alt="Menu Icon" />
          Портфолио
      </Link>
    </div>
  )
}

export default LeftMenu