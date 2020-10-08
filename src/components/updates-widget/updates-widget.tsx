import React, { useState, useEffect } from 'react'
import { postData } from '../../services/api-service'
import { ReactComponent as UpdatesIcon } from '../icon/1F433.svg'
import { ReactComponent as BountyIcon } from '../icon/1F370.svg'
import { ReactComponent as ObmenkaIcon } from '../icon/1F4B3.svg'
import { ReactComponent as PostIcon } from '../icon/1F4B3.svg'
import { ReactComponent as DefaultIcon } from '../icon/1F4B3.svg'
import { ReactComponent as PortfolioIcon } from '../icon/1F984.svg'
import './updates-widget.scss'
import { Link } from 'react-router-dom'

type Update = {
  title: string
  type: string
  link: string
  date: string
}

const UpdatesWidget = () => {

  const [ updates, setUpdates ] = useState<Update[]>()

  useEffect(() => {
    getUpdates()
  }, [])

  const getUpdates = async () => {
    try {
      /*
      const res = await postData({
        query: `
          query {

          }
        `
      })
      */
      const tempData = [
        { title: 'Тестовое обновление баунти', type: 'Bounty', link: '/bounty', date: '17 сен 2020'}
      ]
      setUpdates(tempData)

    } catch(err) {
      console.log(err)
    }
  }

  if (!updates) return <div>undefined (loading)</div>

  const renderIcon = (type: string) => {
    switch (type) {
      case 'Obmenka': {
        return <ObmenkaIcon className="icon-mini"  />
      }
      case 'Bounty': {
        return <BountyIcon  className="icon-mini"  />
      }
      case 'Post': {
        return <PostIcon className="icon-mini"  />
      }
      default: {
        return <DefaultIcon className="icon-mini"  />
      }
    }
  }

  return <div className="updates widget w-1 h-1">
    <div className="updates-header">
      <UpdatesIcon className="icon" />Обновления
    </div>
    {
      updates.map((x) => <div key={x.title} className="updates-line">
      <div className="updates-name">
        { renderIcon(x.type) }
        <Link to={x.link}>{x.title}</Link>
      </div>
      <span className="updates-date">{x.date}</span>
    </div>)
    }
    
    
  </div>
}

export default UpdatesWidget