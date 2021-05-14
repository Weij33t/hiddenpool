import React, { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import Button from '../../UI/Button.js'
// import Input from '../../UI/Input.js'

import cls from './Auth.module.sass'

function Auth({ setUserData, isLogin }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [INN, setINN] = useState('')
  const [role, setRole] = useState('Человек')
  const history = useHistory('')

  const auth = async (e) => {
    e.preventDefault()
    if ((role === 'Компания') !== !!INN || !password || !name) {
      console.log('Неверно введены данные')
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/login', {
        name,
        password,
        INN: Number(INN) ?? null,
        role,
      })
      const data = response.data
      setName('')
      setINN('')
      setPassword('')
      localStorage.setItem('token', data.token)
      setUserData({ ...data }, true, role)
      history.push('/')
    } catch (e) {
      console.log(e.response.data)
    }
  }

  const signup = async (e) => {
    e.preventDefault()
    if ((role === 'Компания') !== !!INN || !password || !name) {
      console.log('Неверно введены данные')
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        password,
        INN: Number(INN) ?? 0,
        role,
      })
      auth(e)
    } catch (e) {
      console.log({ ...e })
    }
  }

  return (
    <div className={cls.Login}>
      <form>
        <Switch>
          <Route path={`/login`} exact>
            <NavLink to={'/signup'}>Нет аккаунта? Зарегистрируйтесь.</NavLink>
            <label>
              Вы компания?
              <input
                type="checkbox"
                onChange={(e) =>
                  setRole(e.target.checked ? 'Компания' : 'Человек')
                }
              />
            </label>
            <input
              value={name}
              minLength={4}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder={`${
                role === 'Компания' ? 'Название компании' : 'Ваше имя'
              }`}
            />
            {role === 'Компания' && (
              <input
                value={INN}
                type="number"
                minLength={4}
                onChange={(e) => setINN(e.target.value)}
                placeholder="ИНН"
              />
            )}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              minLength={4}
              placeholder="Пароль"
            />
            <Button click={auth} text="Войти" />
          </Route>
          <Route path={`/signup`} exact>
            <label>
              Вы компания?
              <input
                type="checkbox"
                onChange={(e) =>
                  setRole(e.target.checked ? 'Компания' : 'Человек')
                }
              />
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={4}
              placeholder={`${
                role === 'Компания' ? 'Название компании' : 'Ваше имя'
              }`}
            />
            {role === 'Компания' && (
              <input
                value={INN}
                type="number"
                required
                onChange={(e) => setINN(e.target.value)}
                minLength={4}
                placeholder="ИНН"
              />
            )}
            <input
              value={password}
              placeholder="Пароль"
              type="password"
              required
              minLength={4}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button click={signup} text="Зарегистрироваться" />
          </Route>
        </Switch>
      </form>
    </div>
  )
}

export default Auth
