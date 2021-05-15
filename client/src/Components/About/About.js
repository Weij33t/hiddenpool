import React from 'react'

import cls from '../Profile/Profile.module.sass'
import icons from '../../styles/style.module.css'
import { AppWrapper } from '../../App.module.sass'
import marked from 'marked'

function About({ match, location }) {
  const { state } = location
  return (
    <div className={AppWrapper}>
      <div className={cls.Profile}>
        <h1>
          Профиль компании
          {state.name}
        </h1>
        <strong>
          <div>Лайки компании: {state.likes}</div>
        </strong>
        <hr />
        <div
          className={cls.ContentWrapper}
          style={{ marginTop: '30px', alignItems: 'center' }}
        >
          <img src={state.image} width={550} />
          <div className={cls.TextContent}>
            <div
              className={cls.Desc}
              dangerouslySetInnerHTML={{
                __html: marked(state.desc ?? ''),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
