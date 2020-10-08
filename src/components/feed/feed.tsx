import React, { useState, useEffect } from 'react'
import './feed.scss'
import { postData } from '../../services/api-service'
import { Link } from 'react-router-dom'

export type Post = {
  title: string
  slug: string
  imageUrl?: string
  content?: string
  tags: string[]
  metaDescription?: string
  postType?: string
  createdAt: string
  updatedAt?: string
}

const Feed = () => {
  const [ posts, setPosts ] = useState<Post[]>()
  const [ selectedTags, setSelectedTags ] = useState<string[]>([])

  const getPosts = async () => {
    try {
      const res = await postData({
        query: `
          query {
            posts (params: {
              postType: "post"
            }) {
              title
              slug
              imageUrl
              tags
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

  const tags = [
    'трейдинг',
    'баунти'
  ]

  const handleTag = (tag: string) => {
    const idx = selectedTags?.findIndex((x) => x === tag)

    if (idx !== -1) {
      setSelectedTags([
        ...selectedTags?.slice(0, idx),
        ...selectedTags?.slice(idx+1)
      ])
    } else {
      setSelectedTags([
        ...selectedTags,
        tag
      ])
    }
  }

  return <>
    <div className="feed-tags">
      {tags.map((x) => <div 
        key={x} 
        className={`tag ${selectedTags.includes(x) ? 'active' : ''}`} 
        onClick={() => handleTag(x)}
      >{x}</div>)}
    </div>

    <div className="feed">
      {
        posts && posts
          .sort((a, b) => +b.createdAt - +a.createdAt)
          .map((x) => {
            if (selectedTags.length > 0) {
              const inter = x.tags.filter((y) => selectedTags.includes(y))
              if (inter.length === 0) return undefined
            }

            return <div className="feed-item" key={x.slug}>
              <Link to={`/post/${x.slug}`}>
                { x.imageUrl && <div className="image" style={{backgroundImage: `url(${x.imageUrl})`}}></div> }
                <div className="feed-title">{x.title}</div>
              </Link>
              <div className="short">
                
              </div>

              <div className="date">
                {new Date(+x.createdAt).toLocaleDateString('ru')}
              </div>
              <div className="tags">
                {
                  x.tags && x.tags.length > 0 && x.tags.map((y) => {
                    if (y === '') return undefined
                    return <div key={y} className="tag">{y}</div>
                  })
                }
              </div>
            </div>
          })
      }
    </div>
  </>
}

export default Feed