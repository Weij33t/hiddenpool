import React from 'react'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

import { companies } from '../../bd.imitation.js'
import cls from './Companies.module.sass'
import { AppWrapper } from '../../App.module.sass'
import Button from '../../UI/Button.js'

function Companies() {
  return (
    <div className={AppWrapper}>
      <div className={cls.Companies} id="companies">
        {companies.map((company, index) => {
          return (
            <div className={cls.Company} key={`${company.name}${index}`}>
              <div className={cls.TextContent}>
                <div className={cls.CompanyName}>{company.name}</div>
              </div>
              <div className={cls.CompanyImage}>
                <img srcSet={'https://via.placeholder.com/200x250'} />
              </div>
              <Button text="Заказать" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Companies
