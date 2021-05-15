import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_COMPANIES } from '../../query/company'

import icons from '../../styles/style.module.css'
import app from '../../App.module.sass'
import cls from './Offer.module.sass'

function Offer() {
  const [companies, setCompanies] = useState([])
  const [isOpen, setIsOpen] = useState([0, 0])
  const [selectTitltes, setSelectTitles] = useState([
    'Выберите центр',
    'Тип заказа',
  ])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const { data, loading, refetch } = useQuery(GET_COMPANIES, {
    fetchPolicy: 'cache-first',
    variables: {
      role: 'Компания',
    },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (!loading) {
      setCompanies(data.getAllCompanies)
    }
  }, [data])

  return (
    <div className={app.AppWrapper}>
      <div className={cls.Offer} id="offer">
        <div className={cls.OfferWindow}>
          <h3>Оставить заявку</h3>
          <div className={cls.OfferSelect}>
            <div
              className={cls.OfferSelectTitle}
              onClick={() => setIsOpen([!isOpen[0], 0])}
            >
              <div>{selectTitltes[0]}</div>
              <div className={icons['icon-chevron-down']}></div>
            </div>
            <div
              className={`${cls.OfferSelectBody} ${isOpen[0] ? cls.Open : ''}`}
              style={{ zIndex: `${isOpen[0] ? '599' : '0'}` }}
            >
              {companies.length > 0 ? (
                companies.map((company) => {
                  return (
                    <div
                      className={cls.OfferSelectBodyItem}
                      onClick={() => {
                        setSelectTitles([company.name, selectTitltes[1]])
                        setIsOpen([0, 0])
                      }}
                    >
                      {company.name}
                    </div>
                  )
                })
              ) : (
                <div className={cls.Loader}></div>
              )}
            </div>
          </div>
          <div className={cls.OfferSelect}>
            <div
              className={cls.OfferSelectTitle}
              onClick={() => setIsOpen([0, !isOpen[1]])}
              style={{ zIndex: `${isOpen[0] ? '0' : '600'}` }}
            >
              {selectTitltes[1]}{' '}
              <div className={icons['icon-chevron-down']}></div>
            </div>
            <div
              className={`${cls.OfferSelectBody} ${isOpen[1] ? cls.Open : ''}`}
              style={{ zIndex: `${isOpen[1] ? '599' : '0'}` }}
            >
              <div
                className={cls.OfferSelectBodyItem}
                onClick={(e) => {
                  setSelectTitles([
                    selectTitltes[0],
                    e.currentTarget.textContent,
                  ])
                  setIsOpen([0, 0])
                }}
              >
                Обучение веб-технологиям
              </div>
              <div
                className={cls.OfferSelectBodyItem}
                onClick={(e) => {
                  setSelectTitles([
                    selectTitltes[0],
                    e.currentTarget.textContent,
                  ])
                  setIsOpen([0, 0])
                }}
              >
                Базовый курс по IT
              </div>
              <div
                className={cls.OfferSelectBodyItem}
                onClick={(e) => {
                  setSelectTitles([
                    selectTitltes[0],
                    e.currentTarget.textContent,
                  ])
                  setIsOpen([0, 0])
                }}
              >
                Заказ номер три
              </div>
              <div
                className={cls.OfferSelectBodyItem}
                onClick={(e) => {
                  setSelectTitles([
                    selectTitltes[0],
                    e.currentTarget.textContent,
                  ])
                  setIsOpen([0, 0])
                }}
              >
                Заказ номер четыре
              </div>
            </div>
          </div>
          <input
            style={{ marginTop: '20px' }}
            value={name}
            placeholder={'Ваше имя'}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={phone}
            type="number"
            placeholder={'Ваш Телефон'}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button>Отправить</button>
        </div>
      </div>
    </div>
  )
}

export default Offer
