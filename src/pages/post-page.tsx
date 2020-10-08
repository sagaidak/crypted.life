import React from 'react'
import './post-page.scss'
import Post from '../components/post/post'
import ExchangesWidget from '../components/exchanges-widget/exchanges-widget'
import DexWidget from '../components/dex-widget/dex-widget'

const PostPage = () => {

  return <div className="post-page">
    <Post />
    <div className="post-widgets">
      <ExchangesWidget />
      <DexWidget />
    </div>
    
  </div>
}

export default PostPage