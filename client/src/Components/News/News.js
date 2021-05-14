import React from 'react'

import Image from '../../images/500x500.png'
import cls from './News.module.sass'
import { AppWrapper } from '../../App.module.sass'
import { news } from '../../bd.imitation.js'

function News() {
  return (
    <div className={AppWrapper}>
      <div className={cls.News} id="news">
        {news.map((item) => {
          return (
            <div className={cls.NewsItem} key={item.title + item.desc}>
              <div className={cls.NewsItemContent}>
                <div className={cls.Title}>{item.title}</div>
                <div className={cls.Desc}>{item.desc}</div>
              </div>
              <div className={cls.NewsItemImage}>
                <img srcSet={Image} alt="" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default News
