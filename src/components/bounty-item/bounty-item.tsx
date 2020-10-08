import React from 'react'
import './bounty-item.scss'
import { Bounty } from '../../pages/bounty-page'
import { postData } from '../../services/api-service'



const BountyItem = (props: Bounty) => {
  const { _id, imageUrl, title, url, bountyValue, status, finalDate, claimUrl, clicks, list, tags } = props

  const claimClickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    const query = `
      mutation {
        updateBounty(id: "${_id}", options: {
          clicks: ${clicks + 1}
        }) {
          clicks
        }
      }
    `

    postData(
      { query },
    ).then(res => {
      console.log('Result: ', res)
      window.open(claimUrl, "_blank")
    }).catch(err => console.log(err))
  }

  return (
    <div className="bountyItem">
      <div className="head">
        <div className="left">
          <img src={imageUrl} alt="Company Logo" className="logo" />
          <div className="nameBlock">
            <a href={url} target="_blank" rel="noopener noreferrer" className="name">{title}</a>
            <div className="estimatedValue">≈ {bountyValue}</div>
          </div>
          
        </div>
        
      </div>

      <div className="tags">
        {tags && tags.length > 0 && tags.map((x) => {
          return <div key={x} className="tag">{x}</div>
        })}
      </div>

      <ul className="task">
        {list && list.length > 0 && list.map((x) => {
          return (
            <li key={x.value}>
              {x.url !== '' 
                ? <a href={x.url} target="_blank" rel="noopener noreferrer">{x.value}</a>
                : x.value
              }
              
            </li>)
        })}
      </ul>

      <div className="bottom">
        <div className="left">
      <div className={`status ${status} badged`}>{status}
        <span className="hover-badge">{
          status
            ? status
            : 'Статус не определён'
        }</span>
      </div>
          <div className="endDate">
            До: {finalDate.split('T')[0]}
          </div>
        </div>
        <div className="right">
          <div className="clicks">запросили: {clicks}</div>
          <a className="default" 
          href={`/link-${title}`} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={claimClickHandler}
          >Запросить</a>
        </div>
      </div>
    </div>
  )
}

export default BountyItem