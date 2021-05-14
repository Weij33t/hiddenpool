import React, { useEffect, useState } from 'react'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Image from '../../images/200x250.png'
import cls from './Companies.module.sass'
import icons from '../../styles/style.module.css'
import { AppWrapper } from '../../App.module.sass'
import Button from '../../UI/Button.js'
import { useQuery } from '@apollo/client'
import { GET_COMPANIES } from '../../query/company'
import axios from 'axios'

function Companies(props) {
  const [companies, setCompanies] = useState([])
  const [isAdded, setIsAdded] = useState(false)
  const [likedCompanies, setLikedCompanies] = useState(
    props.likedCompanies ? props.likedCompanies : []
  )
  const { data, loading, refetch } = useQuery(GET_COMPANIES, {
    variables: {
      role: 'Компания',
    },
  })
  useEffect(() => {
    if (!loading) {
      setCompanies(data.getAllCompanies)
    }
  }, [data])

  const likeCompany = async (id) => {
    const company = { ...companies[id] }
    company.likes = company.likes + (isAdded ? 0 : 1)
    if (!isAlreadyLiked(id)) {
      likedCompanies.push(company.id)
    } else {
      const id = likedCompanies.indexOf(company.id)
      likedCompanies.splice(id, 1)
    }
    console.log(company.likes, likedCompanies)
    setLikedCompanies(likedCompanies)
    await axios.post('http://localhost:5000/like', {
      likes: company.likes,
      userId: props._id,
      companyId: company.id,
      isAdded,
    })
    refetch()
  }
  const isAlreadyLiked = (id) => {
    if (likedCompanies.indexOf(companies[id].id) === -1) {
      return false
    }
    return true
  }
  return (
    <div className={AppWrapper}>
      <div
        className={`${cls.Companies} ${
          companies.length > 0 ? '' : cls['404']
        } ${loading ? cls.loading : ''}`}
        id="companies"
      >
        {!loading || likedCompanies ? (
          companies.length > 0 ? (
            companies.map((company, index) => {
              return (
                <div className={cls.Company} key={`${company.name}${index}`}>
                  <div className={cls.TextContent}>
                    <div className={cls.CompanyName}>
                      {company.name}
                      {company.likes + (isAdded ? 1 : 0)}
                      {props.isLogin && props.isUser && (
                        <span
                          className={`${
                            isAdded
                              ? icons['icon-heart']
                              : icons['icon-heart-o']
                          }`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setIsAdded(!isAdded)
                            likeCompany(index)
                          }}
                        ></span>
                      )}
                      {props.isLogin && !props.isUser && (
                        <span className={icons['icon-heart-o']}></span>
                      )}
                    </div>
                  </div>
                  <div className={cls.CompanyImage}>
                    <img srcSet={Image} />
                  </div>
                  <Button text="Заказать" />
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
