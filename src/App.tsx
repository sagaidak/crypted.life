import React from 'react'
import './App.scss'
import Header from './components/header/header'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import BountyPage from './pages/bounty-page'
import MainPage from './pages/main-page'
import Footer from './components/footer/footer'
import ObmenkiPage from './pages/obmenki-page'
import PostPage from './pages/post-page'
import PortfoliosPage from './pages/portfolios-page'
import PostsPage from './pages/posts-page'
import MemesPage from './pages/memes-page'
import FaqPage from './pages/faq-page'
import PortfolioPage from './pages/portfolio-page'
import { Helmet } from 'react-helmet'

function App() {
  return (
    <Router>
      <div className="App light-theme">
        <Header />
        <Helmet>
          <title>Crypted.life — Дашборд крипто рынка 🔥</title>
          <meta name="description" content="Цены, баунти, аирдропы, ноды. Способы купить и продать. Биржи, обменки, DEX биржи.  Трейдинг, лендинг, фарминг, стейкинг. Цены на комиссии, индексы, монеты, портфели." />
        </Helmet>

        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/bounty" exact>
            <BountyPage />
          </Route>

          <Route path="/obmenki/:from?/:to?" exact>
            <ObmenkiPage />
          </Route>

          <Route path="/posts" exact>
            <PostsPage />
          </Route>
          <Route path="/post/:slug" exact>
            <PostPage />
          </Route>

          <Route path="/memes" exact>
            <MemesPage />
          </Route>

          <Route path="/faq" exact>
            <FaqPage />
          </Route>

          <Route path="/portfolios" exact>
            <PortfoliosPage />
          </Route>
          <Route path="/portfolio/:id?" exact>
            <PortfolioPage />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
