import React, { useState, useEffect } from 'react'
import './post.scss'
import { postData } from '../../services/api-service'
import { Post } from '../feed/feed'
import { useParams } from 'react-router-dom'
import { ReactComponent as CloseIcon } from '../icon/close-cross.svg'
import { useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet'

type Props = {
  withBackButton?: boolean
}

const PostItem = (props: Props) => {
  const { withBackButton = false } = props
  const history = useHistory();
  const [ post, setPost ] = useState<Post>()

  const { slug } = useParams()

  const getPost = async () => {
    try {
      const res = await postData({
        query: `
          query {
            posts (params: {
              slug: "${slug}"
            }) {
              title
              slug
              tags
              imageUrl
              content
              metaDescription
              createdAt
              updatedAt
            }
          }
        `
      })

      setPost(res.data.posts[0])
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  if (!post) return <div>loading</div>

  const handleClose = () => {
    if (withBackButton) {
      history.goBack()
    } else {
      history.push('/posts')
    }
  }

  const h2Regex = /(?<=<\s*h2[^>]*><span[^>]*>)(.*?)(?=<\/span><\s*\/\s*h2>)/g

  const postMenuItems = post?.content?.match(h2Regex)

  return <div className="post-wrapper">
    <Helmet>
      <title>{`${post.title} — Crypted.life`}</title>
      <meta name="description" content={`${post.metaDescription}`} />
    </Helmet>
    
    <div className="post-menu-wrapper">
      {postMenuItems && postMenuItems.length > 0 &&
      <div className="post-menu">
        <b>Содержание:</b>
        <ul>
          {postMenuItems.map((x) => {
            return <li key={x}><a href={`#menu-${x.replace(/ /g, '')}`}>{x}</a></li>
          })}
        </ul>
      </div>
      }
    </div>
    

    <div className="post">
      <h1>{ post.title }</h1>
      
      <div className="tags">
      {post.tags.length > 0 && post.tags.map((x) => {
        if (x === '') return undefined
        return <div className="tag">{x}</div>
      })}
      </div>
      <div className="date">{ new Date(+post.createdAt).toLocaleDateString('ru') }</div>
      { post.imageUrl && <img className="image" src={post.imageUrl} alt={post.title}></img> }

      {post.content &&
      <div 
        className="post-content" 
        dangerouslySetInnerHTML={{__html: post.content?.replace(h2Regex, (x, i) => `<div id="menu-${i.replace(/ /g, '')}"></div>`.concat(x)) }}
      ></div>
      }
     
    </div>
    <div className="close-button-wrapper">
      <div className="close-button" onClick={handleClose}>
        <CloseIcon className="close-icon" />
      </div>
    </div>
    
  </div>
}

export default PostItem