import React, { useState, useEffect } from 'react'
import { postData } from '../../services/api-service'
import './globals-widget.scss'

type Global = {
  btc_tx_24h: Number
  eth_tx_24h: Number
  btc_fees: {
    fastestFee: Number
    halfHourFee: Number
    hourFee: Number
  }
  eth_fees: {
    fast: Number
    fastest: Number
    safeLow: Number
    average: Number
    fastWait: Number
    fastestWait: Number
    safeLowWait: Number
    avgWait: Number
  }
  fng: Number
  defi: {
    defi_market_cap: Number
    eth_market_cap: Number
    defi_to_eth_ratio: Number
    trading_volume_24h: Number
    defi_dominance: Number
    top_coin_name: String
    top_coin_defi_dominance: Number
  }
  total_market_cap: Number
  total_volume_24h: Number
  market_cap_percentage: {
    btc: Number
    eth: Number
    usdt: Number
  }
  market_cap_change_percentage_24h_usd: Number
}

const GlobalsWidget = () => {

  const [ globals, setGlobals ] = useState<Global | undefined>()

  useEffect(() => {
    getGlobals()
  }, [])

  const getGlobals = async () => {
    try {
      const res = await postData({
        query: `
          query {
            globals {
              btc_tx_24h
              eth_tx_24h
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
              fng
              defi {
                defi_market_cap
                eth_market_cap
                defi_to_eth_ratio
                trading_volume_24h
                defi_dominance
                top_coin_name 
                top_coin_defi_dominance
              }
              total_market_cap
              total_volume_24h
              market_cap_percentage {
                btc
                eth
                usdt
              }
              market_cap_change_percentage_24h_usd
            }
          }
        `
      })

      setGlobals(res.data.globals[0])
    } catch(err) {
      console.log(err)
    }
  }

  if (!globals) return <div>undefined (loading)</div>

  return <div className="globals-widget">
    {globals.btc_fees.fastestFee}
  </div>
}

export default GlobalsWidget