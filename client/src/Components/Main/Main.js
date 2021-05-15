import React from 'react'

import cls from './Main.module.sass'
import app from '../../App.module.sass'

import Map from '../../images/Map.png'
import Waves from '../../images/waves.png'

function Main() {
  return (
    <div className={cls.Main}>
      <div className={app.AppWrapper + ' ' + cls.MainWrapper}>
        <div className={cls.MainTitle}>
          <h1>
            IT - Будущее <br />
            Якутии
          </h1>
          <span>
            Добро пожаловать на единую платформу для <br /> IT-центров
            республики САХА
          </span>
        </div>
        <div className={cls.Map}>
          <img srcSet={Map} />
        </div>
      </div>
      <img className={cls.MainWaves} srcSet={Waves} />
    </div>
  )
}

export default Main
