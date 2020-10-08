import React from 'react'
import './memes-page.scss'
import FeedMemes from '../components/feed-memes/feed-memes'
import { Helmet } from 'react-helmet'

const MemesPage = () => {
  return <div>
    <Helmet>
      <title>{`Мемeсы о криптовалюте — Crypted.life`}</title>
      <meta name="description" content="Важнейший аспект и одно из лучших достижений криптовалютного сообщества" />
    </Helmet>
    <FeedMemes />
  </div>
}

export default MemesPage