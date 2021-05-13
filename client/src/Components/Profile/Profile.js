import React, { useEffect, useState } from 'react'
import marked from 'marked'
import { useQuery } from '@apollo/client'

import { GET_ONE_USER, GET_ALL_USERS } from '../../query/user'
import cls from './Profile.module.sass'
import Button from '../../UI/Button'
import { AppWrapper } from '../../App.module.sass'

function Profile({ _id }) {
  const { data, loading } = useQuery(GET_ONE_USER, {
    variables: {
      id: _id,
    },
  })
  const [user, setUser] = useState({})
  const [isFormatted, setIsFormatted] = useState(true)
  console.log(loading)

  useEffect(() => {
    if (!loading) {
      setUser(data.getUser)
    }
  }, [data])

  const changeDesc = (e) => {
    const value = e.target.value
    setUser({ ...user, desc: value })
  }

  console.log(user)

  if (loading) {
    return <h1>Загрузка...</h1>
  }
  return (
    <div className={AppWrapper}>
      <div className={cls.Profile}>
        <h1>Профиль компании {user.name}</h1>
        <hr />
        {isFormatted && <div onClick={() => setIsFormatted(false)}></div>}
        {!isFormatted && (
          <textarea
            value={user.desc}
            onChange={changeDesc}
            onBlur={() => setIsFormatted(true)}
          ></textarea>
        )}
        <div>Количество лайков: {user.likes ?? 0}</div>
        <Button text="Изменить описание" click={changeDesc} />
      </div>
    </div>
  )
}

export default Profile
