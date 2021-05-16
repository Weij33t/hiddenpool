import React, { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import Button from '../../UI/Button.js'
// import Input from '../../UI/Input.js'

import cls from './Auth.module.sass'

function Auth({ setUserData, isLogin, location }) {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [INN, setINN] = useState('')
  const [role, setRole] = useState('Человек')
  const history = useHistory('')

  const auth = async (e) => {
    e.preventDefault()
    if ((role === 'Компания') !== !!INN || !password || !phone) {
      console.log('Неверно введены данные')
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/login', {
        phone,
        name,
        password,
        INN: Number(INN) ?? null,
        role,
      })
      const data = response.data
      setPhone('')
      setINN('')
      setPassword('')
      setUserData({ ...data }, true, role)
      history.push('/')
    } catch (e) {
      console.log(e.response.data)
    }
  }

  const signup = async (e) => {
    e.preventDefault()
    if ((role === 'Компания') !== !!INN || !password || !phone) {
      console.log('Неверно введены данные')
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        phone,
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
            <label>
              Вы компания?{' '}
              <input
                type="checkbox"
                onChange={(e) =>
                  setRole(e.target.checked ? 'Компания' : 'Человек')
                }
              />
            </label>
            <input
              value={phone}
              maxLength={11}
              max={99999999999}
              onChange={(e) => {
                if (e.target.value.length <= 11) {
                  setPhone(
                    Number(e.target.value) ? Number(e.target.value) : '  '
                  )
                }
              }}
              type="number"
              placeholder={`Номер телефона`}
            />
            <input
              value={name}
              maxLength={12}
              onChange={(e) => {
                setName(e.target.value)
              }}
              type="text"
              placeholder={`Ваше имя`}
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
            <button onClick={auth}>Войти</button>
            Нет аккаунта? <NavLink to={'/signup'}>Зарегистрируйтесь.</NavLink>
          </Route>
          <Route path={`/signup`} exact>
            <label>
              Вы компания?{' '}
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
              value={phone}
              maxLength={11}
              max={99999999999}
              onChange={(e) => {
                if (e.target.value.length <= 11) {
                  setPhone(Number(e.target.value) ? Number(e.target.value) : '')
                }
              }}
              placeholder={`Номер телефона`}
            />
            <input
              value={name}
              maxLength={12}
              onChange={(e) => {
                setName(e.target.value)
              }}
              type="text"
              placeholder={`Ваше имя`}
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
            <button onClick={signup}>Зарегистрироваться</button>
            Есть аккаунт? <NavLink to={'/login'}>Войдите.</NavLink>
          </Route>
        </Switch>
      </form>
    </div>
  )
}

export default Auth
