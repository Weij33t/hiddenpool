import React, { useEffect, useState } from 'react'
import marked from 'marked'
import { useQuery } from '@apollo/client'

import { GET_ONE_USER, GET_ALL_USERS } from '../../query/user'
import cls from './Profile.module.sass'
import Button from '../../UI/Button'
import Image from '../../images/500x500.png'
import { AppWrapper } from '../../App.module.sass'
import axios from 'axios'

function Profile({ _id, likedCompanies }) {
  const { data, loading } = useQuery(GET_ONE_USER, {
    variables: {
      id: _id,
    },
  })
  const [user, setUser] = useState({})
  const [isFormatted, setIsFormatted] = useState(true)

  useEffect(() => {
    if (!loading) {
      setUser(data.getUser)
    }
  }, [data])

  const changeDesc = (e) => {
    const value = e.target.value
    setUser({ ...user, desc: value })
  }

  const saveDesc = async () => {
    await axios.post('http://localhost:5000/profile/desc', {
      id: _id,
      desc: user.desc,
    })
  }

  if (loading) {
    console.log('loading')
    return <h1>Загрузка...</h1>
  }

  console.log(user)
  return (
    <div className={AppWrapper}>
      <div className={cls.Profile}>
        <h1>
          Профиль {user.role === 'Компания' ? 'компании' : 'пользователя'}{' '}
          {user.name}
        </h1>
        <hr />
        <div className={cls.ContentWrapper}>
          <img src={Image} />

          <div className={cls.TextContent}>
            {isFormatted && (
              <div
                onClick={() => setIsFormatted(false)}
                className={cls.Desc}
                dangerouslySetInnerHTML={{
                  __html: marked(user.desc ?? ''),
                }}
              ></div>
            )}
            {!isFormatted && (
              <textarea
                value={user.desc}
                onChange={changeDesc}
                onBlur={() => setIsFormatted(true)}
              ></textarea>
            )}
            <div>
              {user.role === 'Компания'
                ? `Количество получено: ${user.likes}`
                : `Поставлено лайков: ${likedCompanies?.length ?? 0}`}
            </div>
            <Button text="Сохранить описание" click={saveDesc} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
