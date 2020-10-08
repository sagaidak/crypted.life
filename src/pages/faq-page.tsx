import React from 'react'
import './faq-page.scss'
import { ReactComponent as CloseIcon } from '../components/icon/close-cross.svg'
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const FaqPage = () => {
  const history = useHistory();
  
  const handleClose = () => {
    history.push('/')
  }

  return <div className="faq-page">
    <Helmet>
      <title>{`Часто задаваемые вопросы — Crypted.life`}</title>
    </Helmet>
    <div className="close-line">
      <div className="close-button" onClick={handleClose}>
        <CloseIcon className="close-icon" />
      </div>
    </div>
    
    <h1>FAQ</h1>

    question
    question
    question
  </div>
}

export default FaqPage