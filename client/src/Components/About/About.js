import React from 'react'

import cls from './About.module.sass'
import icons from '../../styles/style.module.css'
import { AppWrapper } from '../../App.module.sass'

function About() {
  return (
    <div className={AppWrapper}>
      <div className={cls.About} id="about">
        <h1 className={cls.Title}>Кто мы такие? </h1> <br />
        <h2 className={cls.SubTitle}>
          Мы единая платформа на базе которой обьеденены Якутские айти центры.
        </h2>
        <h3>Наши преимущества:</h3>
        <div className={cls.Features}>
          <div className={cls.Feature}>
            Преимущество 1 Несколько слов заполнение
            <span className={icons['icon-download']}></span>
          </div>
          <div className={cls.Feature}>
            Преимущество 1 Несколько слов заполнение
            <span className={icons['icon-download']}></span>
          </div>
          <div className={cls.Feature}>
            Преимущество 1 Несколько слов заполнение
            <span className={icons['icon-download']}></span>
          </div>
          <div className={cls.Feature}>
            Преимущество 1 Несколько слов заполнение
            <span className={icons['icon-download']}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
