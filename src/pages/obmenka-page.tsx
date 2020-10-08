import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { postData } from '../services/api-service'
import { Obmenka } from './obmenki-page'
import { useHistory } from "react-router-dom"
import './obmenka-page.scss'

type Props = {
  title?: string 
  withCloseButton?: boolean
}
const ObmenkaPage = (props: Props) => {
  // const { title, withCloseButton } = props
  const { title } = useParams()
  const [ data, setData ] = useState<Obmenka>()
  const history = useHistory()
  const location = useLocation()
  const withCloseButton = location.state

  console.log('withCloseButton', withCloseButton)

  const getData = async () => {
    try {
      const res = await postData({
        query: `
          query {
            obmenki(params: { title: "${title}" }) {
              title
              url
              startDate
              country
              rating
            }
          }
        `
      })

      setData(res.data.obmenki[0])
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return <div className="obmenka-page">
    <div className="obmenka-page-content">
      Obmenka page {data?.title}
      url {data?.url}
      startDate {data?.startDate}
      country {data?.country}
      rating {data?.rating}
    </div>
    {withCloseButton && <div className="close-button" ><path transform="translate(1, 1)" fill="currentColor" d="M0.2 0.4L0.3 0.3C0.7-0.1 1.2-0.1 1.6 0.2L1.7 0.3 7 5.6 12.3 0.3C12.7-0.1 13.3-0.1 13.7 0.3 14.1 0.7 14.1 1.3 13.7 1.7L8.4 7 13.7 12.3C14.1 12.7 14.1 13.2 13.8 13.6L13.7 13.7C13.3 14.1 12.8 14.1 12.4 13.8L12.3 13.7 7 8.4 1.7 13.7C1.3 14.1 0.7 14.1 0.3 13.7 -0.1 13.3-0.1 12.7 0.3 12.3L5.6 7 0.3 1.7C-0.1 1.3-0.1 0.8 0.2 0.4L0.3 0.3 0.2 0.4Z"></path></div>}
  </div>
}

export default ObmenkaPage