import React, { useState, useEffect } from 'react'
import { postData } from '../../services/api-service'
import './obmenki-widget.scss'
import { Currency, Pair } from '../../pages/obmenki-page'
import { ReactComponent as SwapIcon } from '../icon/1F504.svg'

const ObmenkiWidget = () => {
  const [ obmenki, setObmenki ] = useState<Pair[]>()
  const [ selectedFrom, setSelectedFrom ] = useState('BTC')
  const [ selectedTo, setSelectedTo ] = useState('PRUSD')
  const [ currencies, setCurrencies ] = useState<Currency[]>()
  const [ inputFrom, setInputFrom ] = useState('BTC')
  const [ inputTo, setInputTo ] = useState('PRUSD')
  const [ activeInput, setActiveInput ] = useState('')

  useEffect(() => {
    getObmenki()
  }, [ selectedTo, selectedFrom ])

  useEffect(() => {
    getCurrencies()
  }, [])

  const types = [
    {sym: 'all', name: 'Все'},
    {sym: 'crypto', name: 'Криптовалюта'},
    {sym: 'electro', name: 'Электронные деньги'},
    {sym: 'cash', name: 'Наличные'},
    {sym: 'exchange', name: 'Биржи'},
    {sym: 'bank', name: 'Банки'},
  ]

  const getCurrencies = async () => {
    try {
      const res = await postData({
        query: `
          query {
            currencies(params: {}) {
              _id
              sym
              name
              type
              icon
            }
          }
        `
      })

      setCurrencies(res.data.currencies)
    } catch(err){
      console.log(err)
    }
  }

  console.log('currencies', currencies)

  const getObmenki = async () => {
    try {
      const res = await postData({
        query: `
          query {
            pairs(params: {from: "${selectedFrom}", to: "${selectedTo}"}, amount_gt: 0) {
              _id
              obmenkaId
              updatedAt
              from
              to
              in
              out
              amount
              minamount
              maxamount
              city
              param
              obmenka {
                _id
                title
                url
              }
            }
          }
        `
      })

      setObmenki(res.data.pairs)
    } catch(err) {
      console.log(err)
    }
  }

  const handleSelect = (direction: string, sym: string) => {
    setActiveInput('')

    if (direction === 'from') {
      setSelectedFrom(sym)
      setInputFrom(sym)
    } else {
      setSelectedTo(sym)
      setInputTo(sym)
    }
  }

  const handleSwap = () => {
    setSelectedFrom(selectedTo)
    setInputFrom(selectedTo)
    setSelectedTo(selectedFrom)
    setInputTo(selectedFrom)
  }

  const sortCircs = (a: Pair, b: Pair) => {
    if (a.in === 1) {
      return b.out - a.out
    } else {
      return a.in - b.in
    }
  }

  if (!obmenki) return <div>undefined (loading)</div>

  return <div className="obmenki-widget widget w-1 h-2">
    <div className="head">Топ обменки</div>

    <div className="select-wrapper">
      <div className={`select ${activeInput === 'from' ? 'active' : ''}`}>
        <input 
          type="text" 
          value={inputFrom} 
          onChange={(e) => setInputFrom(e.currentTarget.value)}
          onFocus={() => setActiveInput('from')}
        />
        <div className="select-autocomplete">
          {
            currencies && currencies
              .filter((x) => x.sym.toLowerCase().includes(inputFrom.toLowerCase()) || x.name.toLowerCase().includes(inputFrom.toLowerCase()))
              .map((x) => <div key={x.sym} onClick={() => handleSelect('from', x.sym)}>{x.name}</div>)
          }
        </div>
      </div>
      <SwapIcon className="select-swap" onClick={handleSwap} />
      <div className={`select ${activeInput === 'to' ? 'active' : ''}`}>
        <input 
          type="text" 
          value={inputTo} 
          onChange={(e) => setInputTo(e.currentTarget.value)}
          onFocus={() => setActiveInput('to')}
        />
        <div className="select-autocomplete">
          {
            currencies && currencies
              .filter((x) => x.sym.toLowerCase().includes(inputTo.toLowerCase()) || x.name.toLowerCase().includes(inputTo.toLowerCase()))
              .map((x) => <div key={x.sym} onClick={() => handleSelect('to', x.sym)}>{x.name}</div>)
          }
        </div>
      </div>
    </div>

    <div className="obmenki-widget-list">
      <div className="obmenki-widget-head-item">
        <div className="item-col col-name">Обменка</div>
        <div className="item-col col-from">Отдаёте</div>
        <div className="item-col col-to">Получаете</div>
      </div>
      
      {
        obmenki && obmenki.length > 0
          ? obmenki
            .sort((a, b) => sortCircs(a, b))
            .slice(0, 10)
            .map((x) => {
              return <div className="obmenki-widget-item" key={x._id}>
                <div className="item-col col-name">
                  <a href={x.obmenka.url} target="_blank" rel="noopener norefer">{x.obmenka.title}</a>
                  <div className="secondary">резерв: {Number(x.amount).toFixed(2)}</div>
                </div>
                <div className="item-col col-from">
                  <div>{x.in.toFixed(2)}</div>
                  {x.minamount && <div className="secondary">min: {x.minamount}</div>}  
                </div>
                <div className="item-col col-to">
                  <div>{x.out.toFixed(2)}</div>
                  <div className="secondary">{x.to}</div>
                </div>
                
              </div>
            })
          : <div>Не найдено</div>
      }
    </div>
  </div>
}

export default ObmenkiWidget