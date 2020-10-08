import React, { useEffect, useState } from 'react'
import BountyItem from '../components/bounty-item/bounty-item'
import './bounty-page.scss'
import { postData } from '../services/api-service'
import { chunkify } from '../utils/array-utils'
import { Helmet } from 'react-helmet'
import { monthName } from '../utils/helpers'

type ListItem = {
  value: string
  url: string
}

export type Bounty = {
  _id: string,
  imageUrl: string
  title: string
  url: string
  bountyValue: string
  status: string
  finalDate: string
  claimUrl: string
  clicks: number
  list: ListItem[]
  tags?: string[]
}

const BountyPage = () => {
  const [ bounties, setBounties ] = useState<Bounty[]>()
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ totalPages, setTotalPages ] = useState(0)
  const [ selectedTags, setSelectedTags ] = useState<string[]>([])
  const [ showActive, setShowActive ] = useState(true)
  const [ filteredBounties, setFilteredBounties ] = useState<Bounty[]>()

  const MAX_COLS = 4
  const PAGE_SIZE = 10
  
  useEffect(() => {
    const getBounties = async () => {
      try {
        const res = await postData({
          query: `
            query {
              bounties(first:${PAGE_SIZE} offset:${PAGE_SIZE * (currentPage - 1)}) {
                bounties {
                  _id
                  imageUrl
                  title
                  url
                  bountyValue
                  status
                  finalDate
                  claimUrl
                  clicks
                  list {
                    url
                    value
                  }
                  tags
                }
                total
              }
            }
          `
        })
        setBounties(res.data.bounties.bounties)
        setTotalPages(Math.ceil(res.data.bounties.total / PAGE_SIZE))
        console.log(res)
      } catch(err){
        console.log(err)
      }
      
    }
    getBounties()
  }, [ currentPage ])

  useEffect(() => {
    if (bounties) {
      setFilteredBounties([
        ...bounties
          .filter((x) => {
            if (showActive) {
              return (+new Date(x.finalDate) - +new Date()) > 0
            } else {
              return (+new Date(x.finalDate) - +new Date()) < 0
            }
          })
          .filter((x) => {
            if (selectedTags.length === 0) return true
            if (!x.tags) return false
            const inter = x.tags.filter((z: string) => selectedTags.includes(z))
            return inter.length !== 0
          })
      ])
    } 
  }, [ showActive, selectedTags ])

  const renderPagination = () => {
    const res = []
    for (let i = 1; i <= totalPages; i++) {
      res.push(<a key={i} href="#" onClick={(e) => handlePaginationClick(i, e)}>{i}</a>)
    }
    return res
  }

  const handlePaginationClick = (i: number, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setCurrentPage(i)
  }

  const tags = [
    "аирдропы",
    "трейдинг",
    "амбасадор",
    "баг баунти",
    "ноды",
    "рефералка",
    "разработка",
    "креатив"
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

  const d = new Date()
  const month = monthName(d.getMonth())
  const year = d.getUTCFullYear()

  return (<div className="bountyContent">
    <Helmet>
      <title>{`Список баунти на ${month} ${year} — Crypted.life`}</title>
      <meta name="description" content="Баунти (креатив, мемы, статьи, видео), багбаунти, мотивированный тестнет (incentivized / nodes), аирдропы (лайки, репосты, подписки), трейдинг ивенты, реферальные ивенты, амбасадор/комьюнити программы, development (коммандные гранты)." />
    </Helmet>
    <div className="bounty-filters">
      <div className="filter-tags">
      {
        tags.map((x) => <div 
          key={x} 
          onClick={() => handleTag(x)} 
          className={`tag ${selectedTags.includes(x) ? 'active' : ''}`}
        >{x}</div>)
      }
      </div>
      <div className="filter-status">
        <div className={`tag ${showActive ? 'active' : ''}`} onClick={() => setShowActive(true)}>активные</div>
        <div className={`tag ${!showActive ? 'active' : ''}`} onClick={() => setShowActive(false)}>закрытые</div>
      </div>
    </div>

    <div className="bountyItemsWrapper">

      {filteredBounties && filteredBounties.length > 0 && chunkify(filteredBounties, MAX_COLS, true).map((x) => {
        
        return <div className="bountyCol" key={x[0]._id}>
          {x.map((y: Bounty) => {
  
              return <BountyItem {...y} key={y._id}  />
          })}
        </div>
      })}

      
    </div>

    <div className="pagination">
      {
        renderPagination()
      }
    </div>
    
  </div>)
}

export default BountyPage