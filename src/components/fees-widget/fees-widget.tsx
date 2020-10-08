import React, { useState, useEffect } from 'react'
import { postData } from '../../services/api-service'
import { ReactComponent as ComissionIcon } from '../icon/49_85223.svg'
import './fees-widget.scss'

type Fees = {
  btc_fees: {
    fastestFee: number
    halfHourFee: number
    hourFee: number
  }
  eth_fees: {
    fast: number
    fastest: number
    safeLow: number
    average: number
    fastWait: number
    fastestWait: number
    safeLowWait: number
    avgWait: number
  }
}

const FeesWidget = () => {

  const [ fees, setFees ] = useState<Fees | undefined>()
  const [ btcPrice, setBtcPrice ] = useState<number | undefined>()
  const [ ethPrice, setEthPrice ] = useState<number | undefined>()

  const medianTransactionSize = 224

  useEffect(() => {
    getFees()
    getBtcPrice()
    getEthPrice()
  }, [])

  const getFees = async () => {
    try {
      const res = await postData({
        query: `
          query {
            globals {
              btc_fees {
                fastestFee
                halfHourFee
                hourFee
              }
              eth_fees {
                fast
                fastest
                safeLow
                average
                fastWait
                fastestWait
                safeLowWait
                avgWait
              }
            }
          }
        `
      })

      setFees(res.data.globals[0])
    } catch(err) {
      console.log(err)
    }
  }

  const getBtcPrice = async () => {
    try {
      const res = await postData({
        query: `
          query {
            geckoCoins(params: { id: "bitcoin" } ) {
              current_price
            }
          }
        `
      })

      setBtcPrice(res.data.geckoCoins[0].current_price)
    } catch(err) {
      console.log(err)
    }
  }

  const getEthPrice = async () => {
    try {
      const res = await postData({
        query: `
          query {
            geckoCoins(params: { id: "ethereum" } ) {
              current_price
            }
          }
        `
      })

      setEthPrice(res.data.geckoCoins[0].current_price)
    } catch(err) {
      console.log(err)
    }
  }

  if (!fees) return <div>undefined (loading)</div>

  return <div className="fees widget w-1 h-1">
    <div className="fees-header">
      <ComissionIcon className="icon" />
      Комиссии
    </div>
    <div className="fees-row">
      За транзакцию в сети Биткоин:
    </div>
    <div className="fees-row">
      <div className="fees-item">
        <span className="time">~ 20 мин</span>
        <span className="price red">{fees.btc_fees.fastestFee} sat/vB</span>
        <span className="price">
          $ {btcPrice &&  (((medianTransactionSize * fees.btc_fees.fastestFee) / 100000000) * btcPrice).toFixed(2)}
        </span>
      </div>
      <div className="fees-item">
        <span className="time">~ 30 мин</span>
        <span className="price blue">{fees.btc_fees.halfHourFee} sat/vB</span>
        <span className="price">
          $ {btcPrice &&  (((medianTransactionSize * fees.btc_fees.halfHourFee) / 100000000) * btcPrice).toFixed(2)}
        </span>
      </div>
      <div className="fees-item">
        <span className="time">~ 60 мин</span>
        <span className="price green">{fees.btc_fees.hourFee} sat/vB</span>
        <span className="price">
          $ {btcPrice &&  (((medianTransactionSize * fees.btc_fees.hourFee) / 100000000) * btcPrice).toFixed(2)}
        </span>
      </div>
    </div>

    <div className="fees-row">
      За транзакцию в сети Эфир (21k gas):
    </div>
    <div className="fees-row">
      <div className="fees-item">
        <span className="time">~ {fees.eth_fees.fastestWait} мин</span>
        <span className="price red">{fees.eth_fees.fastest / 10} gwei</span>
        <span className="price">
          $ {ethPrice && (((fees.eth_fees.fastest / 10 * 21000) * ethPrice) / 1000000000).toFixed(2)}
        </span>
      </div>
      <div className="fees-item">
        <span className="time">~ {fees.eth_fees.avgWait} мин</span>
        <span className="price blue">{fees.eth_fees.average / 10} gwei</span>
        <span className="price">
        $ {ethPrice && (((fees.eth_fees.average / 10 * 21000) * ethPrice) / 1000000000).toFixed(2)}
        </span>
      </div>
      <div className="fees-item">
        <span className="time">~ {fees.eth_fees.safeLowWait} мин</span>
        <span className="price green">{fees.eth_fees.safeLow / 10} gwei</span>
        <span className="price">
        $ {ethPrice && (((fees.eth_fees.safeLow / 10 * 21000) * ethPrice) / 1000000000).toFixed(2)}
        </span>
      </div>
    </div>
    <div className="bottom-line">Обновленовляется раз в 2 минуты</div>
  </div>
}

export default FeesWidget