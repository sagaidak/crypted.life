import React, { useEffect, useState, Suspense } from 'react'
import './obmenki-page.scss'
import { postData } from '../services/api-service'
import { useParams } from 'react-router-dom'
import {Helmet} from "react-helmet"
const ObmenkaList = React.lazy(() => import('../components/obmenka-list/obmenka-list'))

export type Obmenka = {
  _id: string
  title: string
  url: string
  startDate: string
  country: string
  rating: string
}

export type Currency = {
  _id: string
  sym: string
  name: string
  icon: string
  type: string
  froms: Pair[]
  tos: Pair[]
}

export type Pair = {
  _id: string
  obmenkaId: string
  updatedAt: string
  from: string
  to: string
  in: number
  out: number
  amount: string
  minamount: string
  maxamount: string
  city: string
  param: string
  obmenka: Obmenka
  currencies: Currency[]
}

const ObmenkiPage = () => {
  
  const [ currencies, setCurrencies ] = useState<Currency[]>()
  const { from, to } = useParams();
  const [ selectedFrom, setSelectedFrom ] = useState(from)
  const [ selectedTo, setSelectedTo ] = useState(to)
  const [ currentFromName, setCurrentFromName ] = useState('')
  const [ currentToName, setCurrentToName ] = useState('')
  const [ currentFromType, setCurrentFromType ] = useState('crypto')
  const [ currentToType, setCurrentToType ] = useState('electro')
  const [ mobileFromChoice, setMobileFromChoice ] = useState(false)
  const [ mobileToChoice, setMobileToChoice ] = useState(false)

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
              sym
              name
              type
              icon
              froms {
                from
              }
              tos {
                to
              }
            }
          }
        `
      })

      setCurrencies(res.data.currencies)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getCurrencies()
  }, [])

  

  const handleCurrencyChange = async (x: string | undefined, y: string, name: string) => {
    if (y === 'from') {
      setCurrentFromName(name)
      setSelectedFrom(x)
    } else if (y === 'to') {
      setCurrentToName(name)
      setSelectedTo(x)
    }
  }

  const handleCurrencyFilter = (direction: string, value: string) => {
    if (direction === 'from') {
      setCurrentFromType(value)
    } else if (direction === 'to') {
      setCurrentToType(value)
    }
  }

  const handleMobileChoice = (direction: string) => {
    if (direction === 'from') {
      setMobileFromChoice(!mobileFromChoice)
    } else if (direction === 'to') {
      setMobileToChoice(!mobileToChoice)
    }
  }

  const fromCurrencies = currencies?.filter((x: Currency) => x.tos.length > 0)
  const toCurrencies = currencies?.filter((x: Currency) => x.froms.length > 0)
  
  const renderTitle = () => {
    let title = 'Лучшие курсы обмена криптовалют — Crypted.life'

    if (selectedFrom && selectedTo) {
      title = `Обмен ${currentFromName} на ${currentToName} — курсы обмена криптовалют — Crypted.life`

      if (currentToType === 'bank' ) {
        title = `Вывод ${currentFromName} на карту ${currentToName} — курсы обмена криптовалют — Crypted.life`
      }
      
      if (currentToType === 'cash') {
        title = `Купить ${currentFromName} за ${currentToName} в вашем городе — курсы обмена криптовалют — Crypted.life`
      }

      if (currentFromType === 'cash') {
        title = `Купить ${currentFromName} за ${currentToName} в вашем городе — курсы обмена криптовалют — Crypted.life`
      }

    }

    return title
  }

  return (<div className="obmenkiContent">
    <Helmet>
      <title>{renderTitle()}</title>
      {
        selectedFrom && selectedTo
          ? <meta name="description" content={'Курсы обмена валют в обменниках Украины, России, Казахстана, Беларуси и других стран СНГ. Калькулятор комиссий и цен на биржах и в p2p-обменниках Рунета.'} />
          : <meta name="description" content={`Курсы обмена ${currentFromName} на ${currentToName} валют в обменниках Украины, России, Казахстана, Беларуси и других стран СНГ. Калькулятор комиссий и цен на биржах и в p2p-обменниках Рунета.`} />
      }
      
    </Helmet>
    <div className={`obmenki-choice ${mobileFromChoice?'active':''}`}>
      <div 
        className="obmenka-currency-header"
        onClick={() => handleMobileChoice('from')}  
      >Отдаёте<div className="triangle desktop-hidden"></div></div>
      <div className="mobile-toggle">
        <div className="obmenka-types">
        {
          types?.map(x => <div 
            key={x.sym}
            className={`tag ${(x.sym === currentFromType ? 'active' : '')}`}
            onClick={() => handleCurrencyFilter('from', x.sym)}>{x.name}</div>)
        }
        </div>

        {
          fromCurrencies?.map((obj) => {
            const active = obj.sym === selectedFrom
            if (active && !currentFromName) setCurrentFromName(obj.name)
            if (currentFromType === 'all' || currentFromType === obj.type) {
              return <div 
                key={obj.sym} 
                onClick={() => handleCurrencyChange(obj.sym, 'from', obj.name)}
                className={`obmenka-currency ${(active ? 'active' : '')} ${(obj.tos.findIndex(x => x.to === selectedTo) !== -1 ? 'valid' : '')}`}>
                  <img src={`https://crypted.life:3001/files${obj.icon}`} alt={obj.name} />
                  {obj.name} 
              </div>
            }
          })
          
        }
      </div>
    </div>
    <div className={`obmenki-choice ${mobileToChoice?'active':''}`}>
    <div 
      className="obmenka-currency-header"
      onClick={() => handleMobileChoice('to')}  
    >Получаете<div className="triangle desktop-hidden"></div></div>
    <div className="mobile-toggle">
      <div className="obmenka-types">
      {
        types?.map(x => <div 
          key={x.sym}
          className={`tag ${(x.sym === currentToType ? 'active' : '')}`}
          onClick={() => handleCurrencyFilter('to', x.sym)}>{x.name}</div>)
      }
      </div>

      {
        toCurrencies?.map((obj) => {
          const active = obj.sym === selectedTo
          if (active && !currentToName) setCurrentToName(obj.name)
          if (currentToType === 'all' || currentToType === obj.type) {
            return <div 
              key={obj.sym} 
              onClick={() => handleCurrencyChange(obj.sym, 'to', obj.name)}
              className={`obmenka-currency ${(active ? 'active' : '')} ${(obj.froms.findIndex(x => x.from === selectedFrom) !== -1 ? 'valid' : '')}`}
              >
                <img src={`https://crypted.life:3001/files${obj.icon}`} alt={obj.name} />
                {obj.name} 
            </div>
          }
        })
      }
      </div>
    </div>

    {
      selectedFrom && selectedTo
        ? <div className="obmenka-part">
            <div className="obmenka-text">
              <h1>Лучшие курсы в обмена {currentFromName} на {currentToName}</h1>
              <b>Как обменять {currentFromName} на {currentToName}</b>
              <div>
                Ниже представлен топ обменников с лучшим курсом. Чтобы поменять {selectedFrom} на {selectedTo}, выберите из списка площадку с подходящей ценой и достаточным резервом to и следуйте инструкции на сайте обменника.
              </div>

            </div>
      
            <Suspense fallback={<div>Suspense Loading</div>}>
              <ObmenkaList from={selectedFrom} to={selectedTo} />
            </Suspense>

            <div className="obmenka-text">
              <b>Как найти лучшую цену в обменниках</b>
              <div>Шаг 1. В левой колонке на странице укажите валюту, которую вы отдаете.</div>
              <div>Шаг 2. В следующей за ней — валюту, которую хотите получить.</div>
              <div>Шаг 3. Выберите из списка ниже площадку для обмена с лучшим курсом и достаточным резервом.</div>
            </div>
          </div>
        : <div className="obmenka-part">
            <div className="obmenka-text">
              <h1>Лучшие курсы в обменниках</h1>
            </div>
            <div className="obmenka-text">
              <b>Как найти лучшую цену в обменниках</b>
              <div>Шаг 1. В левой колонке на странице укажите валюту, которую вы отдаете.</div>
              <div>Шаг 2. В следующей за ней — валюту, которую хотите получить.</div>
              <div>Шаг 3. Выберите из списка ниже площадку для обмена с лучшим курсом и достаточным резервом.</div>
            </div>
            
          </div>
    }

  </div>)
}

export default ObmenkiPage