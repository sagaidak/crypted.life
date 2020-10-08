import React, { useState, useEffect } from 'react'
import './feed-memes.scss'
import { postData } from '../../services/api-service'

export type MemePost = {
  slug: string
  content?: string
  imageUrl?: string
  metaDescription?: string
  postType?: string
  createdAt: string
  updatedAt?: string
}

const FeedMemes = () => {
  const [ posts, setPosts ] = useState<MemePost[]>()

  const getPosts = async () => {
    try {
      const res = await postData({
        query: `
          query {
            posts (params: {
              postType: "meme"
            }) {
              slug
              imageUrl
              content
              createdAt
              updatedAt
            }
          }
        `
      })

      setPosts(res.data.posts)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  console.log('posts', posts)

  return <div className="feed-memes">
      {
        posts && posts
          .sort((a, b) => +b.createdAt - +a.createdAt)
          .map((x) => {
            
            return <div className="feed-memes-item" key={x.slug}>

              { x.imageUrl && <img className="image" src={x.imageUrl} alt={x.slug} /> }

              {x.content && x.content.length > 10 &&
                <div 
                  className="short" 
                  dangerouslySetInnerHTML={{__html: x.content }}
                ></div>
              }

            </div>
          })
      }
    </div>
}

export default FeedMemes