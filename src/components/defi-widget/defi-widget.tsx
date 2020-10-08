import React, { useState, useEffect } from 'react'
import { postData } from '../../services/api-service'
import { commafy } from '../../utils/helpers'
import { ReactComponent as DefiIcon } from '../icon/1F680.svg'
import './defi-widget.scss'

type Defi = {
  defi_market_cap: number
  eth_market_cap: number
  defi_to_eth_ratio: number
  trading_volume_24h: number
  defi_dominance: number
  top_coin_name: string
  top_coin_defi_dominance: number
}

const DefiWidget = () => {

  const [ defi, setDefi ] = useState<Defi | undefined>()

  useEffect(() => {
    getDefi()
  }, [])

  const getDefi = async () => {
    try {
      const res = await postData({
        query: `
          query {
            globals {
              defi {
                defi_market_cap
                eth_market_cap
                defi_to_eth_ratio
                trading_volume_24h
                defi_dominance
                top_coin_name 
                top_coin_defi_dominance
              }
            }
          }
        `
      })

      setDefi(res.data.globals[0].defi)
    } catch(err) {
      console.log(err)
    }
  }

  /* Часть от глобального: <span>{defi.defi_dominance.toFixed(2)} %</span> */

  if (!defi) return <div>undefined (loading)</div>

  return <div className="defi widget w-1 h-1">
    <div className="defi-header">
      <DefiIcon className="icon" />DeFi
    </div>
    <div className="defi-line">
      Топ монета: <b>{defi.top_coin_name}</b>
    </div>
    <div className="defi-line">
      DeFi рынок: <b>$ {commafy(defi.defi_market_cap)}</b>
    </div>
    <div className="defi-line">
    {defi.top_coin_name}: <b>{defi.top_coin_defi_dominance.toFixed(2)} %</b>
    </div>
    <div className="defi-line">
      ETH рынок: <b>$ {commafy(defi.eth_market_cap)}</b>
    </div>
    <div className="defi-line">
      DeFi: <b>{defi.defi_to_eth_ratio.toFixed(2)} %</b>
    </div>
    <div className="defi-line">
      Объем торгов DeFi за 24ч: <b>$ {commafy(defi.trading_volume_24h)}</b> 
    </div>

    <div className="bottom-line">Обновленовляется раз в 2 минуты</div>
    
  </div>
}

export default DefiWidget