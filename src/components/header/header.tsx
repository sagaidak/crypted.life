import React, { useState } from 'react'
import './header.scss'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../icon/wannabe.svg'
import { ReactComponent as BountyIcon } from '../icon/1F370.svg'
import { ReactComponent as ObmenkiIcon } from '../icon/1F4B3.svg'
import { ReactComponent as PortfolioIcon } from '../icon/1F984.svg'
import { ReactComponent as PostIcon } from '../icon/1FAB6.svg'
import { ReactComponent as MemesIcon } from '../icon/1F9FB.svg'
import { ReactComponent as FaqIcon } from '../icon/1F914.svg'
import { ReactComponent as BurgerIcon } from '../icon/E261.svg'



const Header = () => {

  let location = useLocation();
  const [ mobileMenu, setMobileMenu ] = useState(false)

  return (
    <header className="App-header">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="header-col">
        <div className="header-row">
          <Link to="/">WannaBitcoin</Link>
        </div>
        <div className="head-menu">
          <Link to="/bounty" className={`menu-item ${location.pathname === '/bounty' ? 'active' : '' }`}>
            <BountyIcon className="icon" /> Баунти
          </Link> 
          <Link to="/obmenki" className={`menu-item ${location.pathname === '/obmenki' ? 'active' : '' }`}>
            <ObmenkiIcon className="icon" /> Обменки
          </Link>
          <Link to="/portfolios" className={`menu-item ${location.pathname === '/portfolios' ? 'active' : '' }`}>
            <PortfolioIcon className="icon" /> Портфели
          </Link>
          <Link to="/posts" className={`menu-item ${location.pathname === '/posts' ? 'active' : '' }`}>
            <PostIcon className="icon" /> Статьи
          </Link>
          <Link to="/memes" className={`menu-item ${location.pathname === '/memes' ? 'active' : '' }`}>
            <MemesIcon className="icon" /> Мемесы
          </Link>
          <Link to="/faq" className={`menu-item ${location.pathname === '/faq' ? 'active' : '' }`}>
            <FaqIcon className="icon" /> FAQ
          </Link>
        </div>

        <div className="mobile-panel">
          <BurgerIcon className="icon" onClick={() => setMobileMenu(!mobileMenu)} />
        </div>

        <div className={`mobile-menu ${mobileMenu ? 'active' : ''}`}>
          <Link to="/bounty" className={`menu-item ${location.pathname === '/bounty' ? 'active' : '' }`}>
            <BountyIcon className="icon" /> Баунти
          </Link> 
          <Link to="/obmenki" className={`menu-item ${location.pathname === '/obmenki' ? 'active' : '' }`}>
            <ObmenkiIcon className="icon" /> Обменки
          </Link>
          <Link to="/portfolios" className={`menu-item ${location.pathname === '/portfolios' ? 'active' : '' }`}>
            <PortfolioIcon className="icon" /> Портфели
          </Link>
          <Link to="/posts" className={`menu-item ${location.pathname === '/posts' ? 'active' : '' }`}>
            <PostIcon className="icon" /> Статьи
          </Link>
          <Link to="/memes" className={`menu-item ${location.pathname === '/memes' ? 'active' : '' }`}>
            <MemesIcon className="icon" /> Мемесы
          </Link>
          <Link to="/faq" className={`menu-item ${location.pathname === '/faq' ? 'active' : '' }`}>
            <FaqIcon className="icon" /> FAQ
          </Link>
        </div>
      </div>

    </header>
  )
}

export default Header
