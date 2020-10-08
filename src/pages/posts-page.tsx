import React from 'react'
import './posts-page.scss'
import Feed from '../components/feed/feed'
import { Helmet } from 'react-helmet'

const PostsPage = () => {
  return <>
    <Helmet>
      <title>{`Статьи о криптовалюте, обзоры, инструкции — Crypted.life`}</title>
      <meta name="description" content="Как заработать криптовалюту, как её хранить и пользоваться. Инструкции, обзоры, рейтинги." />
    </Helmet>
    <Feed />  
  </>
}

export default PostsPage