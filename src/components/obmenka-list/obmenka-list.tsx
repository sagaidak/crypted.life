import React, { useEffect, useState } from 'react'
import { Pair, Obmenka } from '../../pages/obmenki-page'
import { postData } from '../../services/api-service'
import './obmenka-list.scss'

type Props = {
  from: string
  to: string
}

const ObmenkaList = (props: Props) => {
  const { from: selectedFrom, to: selectedTo } = props
  const [ obmenki, setObmenki ] = useState<Pair[]>()

  useEffect(() => {
    
    if (selectedFrom && selectedTo) {
      getObmenki()
      window.history.replaceState(null, "", `/obmenki/${selectedFrom}/${selectedTo}`)
    }
  }, [selectedFrom, selectedTo])

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


  const tips: { [key: string]: string }= {
    manual: 'Полуавтоматический или ручной режим работы обменного пункта.',
    juridical: 'Обменный пункт производит переводы средств на банковский счет клиента со счета юридического лица или ИП.',
    verifying: 'При проведении обмена обменный пункт может требовать от клиента документы, удостоверяющие его личность.',
    cardverify: 'При проведении обмена обменный пункт может требовать от клиента верифицировать банковскую карту.',
    floating: 'Плавающий курс, который не фиксируется в заявке. При этом сумма обмена может измениться на момент отправки средств клиенту.',
    otherin: 'Прием денежных средств от клиента производится на стороннюю платежную систему, а не на ту, что указана в поле from.',
    otherout: 'Выплата денежных средств клиенту производится со сторонней платежной системы, а не с той, что указана в поле to.',
    reg: 'Для проведения обмена пользователь обязательно должен зарегистрироваться на сайте обменного пункта.',
    card2card: 'Обменный пункт принимает средства от пользователей переводами Card2Card (не через карточный мерчант).'
  }

  const handleLink = (url: string, e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined = undefined) => {
    if (e) e.stopPropagation()

    window.open(url, '_blank')
  }

  const sortCircs = (a: Pair, b: Pair) => {
    if (a.in === 1) {
      return b.out - a.out
    } else {
      return a.in - b.in
    }
  }

  return <>
    <div className="obmenka-lines-header">
      <div>Обменник:</div>
      <div>Отдаёте</div>
      <div>Получаете</div>
      <div>Резерв</div>
    </div>
    <div className="obmenka-lines">
    {
      obmenki?.sort((a, b) => sortCircs(a, b))
        .map((x: Pair) => {
        const params = (x.param ? x.param.split(', ') : [])

        return <div 
          key={x._id} 
          className="obmenka-line"
          onClick={() => handleLink(x.obmenka.url)}
          >
          
          <div>
            {x.obmenka.title} {x.city && <><br /> <span className="secondary">{x.city}</span></>}
            {params.map(x => <span key={x} className={`param param-${x} badged`}>
              {tips[x] && <span className="hover-badge">{tips[x]}</span>}
            </span>)}
          </div>
          <div className="in">{x.in} <br />
            <span className="secondary">{x.from}</span>
            {x.minamount && <span className="secondary"> min: {x.minamount}</span>}
          </div>
          <div className="out">{x.out} <br /><span className="secondary">{x.to}</span></div>
          <div>{x.amount} <br /><span className="secondary">{x.to}</span></div>
        </div>
      })
  
    }
  </div>

  </>
  
}

export default ObmenkaList