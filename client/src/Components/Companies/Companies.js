import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import axios from 'axios'

import Button from '../../UI/Button.js'
import { GET_COMPANIES } from '../../query/company'
import { GET_ONE_USER } from '../../query/user'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

import Image from '../../images/Companies/company.png'
import Like from '../../fonts/like.svg'
import Feed from '../../fonts/feed.svg'

import cls from './Companies.module.sass'
import icons from '../../styles/style.module.css'
import { AppWrapper } from '../../App.module.sass'
import marked from 'marked'

function Companies(props) {
  const [companies, setCompanies] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const { data, loading, refetch } = useQuery(GET_COMPANIES, {
    variables: {
      role: 'Компания',
    },
    notifyOnNetworkStatusChange: true,
  })
  const { data: userData, loading: userLoading } = useQuery(GET_ONE_USER, {
    variables: {
      id: props._id,
    },
    notifyOnNetworkStatusChange: true,
  })
  useEffect(() => {
    if (!loading) {
      console.log('newComp')
      setCompanies(data.getAllCompanies)
    }
    if (!userLoading) {
      console.log('newData')
      setUser(userData.getUser)
    }
  }, [data, userData])

  const likeCompany = async (id) => {
    const company = { ...companies[id] }
    company.likes = company.likes + 1

    if (user.likedCompanies.includes(company.id)) {
      return false
    }
    const response = await axios.post('http://localhost:5000/like', {
      likes: company.likes,
      companyId: company.id,
      userId: user.id,
      likedCompanies: [...user.likedCompanies, company.id],
    })
    setCompanies([
      ...companies.slice(0, id),
      company,
      ...companies.slice(id + 1),
    ])
    setUser({ ...user, likedCompanies: [...user.likedCompanies, company.id] })
    setIsLiked(true)
  }

  const dislikeCompany = async (id) => {
    const company = { ...companies[id] }
    console.log('dis')
    company.likes = company.likes - 1

    const companyIndex = user.likedCompanies.indexOf(company.id)

    const response = await axios.post('http://localhost:5000/like', {
      likes: company.likes,
      companyId: company.id,
      userId: user.id,
      likedCompanies: [
        ...user.likedCompanies.slice(0, companyIndex),
        ...user.likedCompanies.slice(companyIndex + 1),
      ],
    })
    setUser({
      ...user,
      likedCompanies: [
        ...user.likedCompanies.slice(0, companyIndex),
        ...user.likedCompanies.slice(companyIndex + 1),
      ],
    })
    setIsLiked(false)
    setCompanies([
      ...companies.slice(0, id),
      company,
      ...companies.slice(id + 1),
    ])
  }

  const formatNumber = (number) => {
    if (number < 1000) {
      return number
    }
    return `${number / 1000}К`
  }

  const getDesc = (desc) => {
    const words = desc.split(' ')
    if (words.length >= 10) {
      return `${words.slice(0, 10).join(' ')}...`
    }
    return words.join(' ')
  }

  // console.log(user, companies).
  return (
    <div className={AppWrapper}>
      <div
        className={`${cls.Companies} ${
          companies.length > 0 ? '' : cls['404']
        } ${loading ? cls.loading : ''}`}
        id="companies"
      >
        {!loading || !userLoading || user.likedCompanies ? (
          companies.length > 0 ? (
            companies.map((company, index) => {
              if (index >= 7) {
                return null
              }
              return (
                <div className={cls.Company} key={`${company.name}${index}`}>
                  <div className={cls.CompanyImage}>
                    <img srcSet={Image} />
                    <div className={cls.CompanyStats}>
                      <div>
                        <span className={cls.CompanyCount}>8</span>{' '}
                        <img srcSet={Feed} alt={'Feed'} />
                      </div>
                      <div>
                        <span className={cls.CompanyCount}>
                          {formatNumber(company.likes)}
                        </span>
                        {props.isLogin && props.isUser && (
                          <span
                            className={`${
                              icons[
                                'icon-heart' +
                                  `${
                                    user.likedCompanies?.includes(company.id)
                                      ? ''
                                      : '-o'
                                  }`
                              ]
                            }`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              if (
                                !!user &&
                                user.likedCompanies.includes(company.id)
                              ) {
                                dislikeCompany(index)
                              } else if (
                                !!user &&
                                !user.likedCompanies.includes(company.id)
                              ) {
                                likeCompany(index)
                              }
                            }}
                          ></span>
                        )}
                        {(!props.isLogin || !props.isUser) && (
                          <span className={icons['icon-heart-o']}></span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={cls.CompanyContent}>
                    <h3 className={cls.CompanyName}>{company.name}</h3>
                    <div
                      className={cls.CompanyDesc}
                      dangerouslySetInnerHTML={{
                        __html: marked(getDesc(company?.desc)),
                      }}
                    ></div>
                    <button>Смотреть</button>
                  </div>
                </div>
              )
            })
          ) : (
            <h2>Компаний нет</h2>
          )
        ) : (
          <div className={cls.Loader}></div>
        )}
      </div>
    </div>
  )
}

export default Companies
