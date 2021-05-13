import React, { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import Button from '../../UI/Button.js'
// import Input from '../../UI/Input.js'

import cls from './Login.module.sass'
function Auth({ setUserData, isLogin }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [INN, setINN] = useState('')
  const history = useHistory('')

  const auth = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/login', {
        name,
        password,
        INN: Number(INN),
      })
      const data = response.data
      setName('')
      setINN('')
      setPassword('')
      localStorage.setItem('token', data.token)
      setUserData(data.name, data.desc, data._id, true)
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  const signup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        password,
        INN,
      })
      const data = response.data
      setName('')
      setPassword('')
      setINN('')
      setUserData(data.username, data.desc)
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={cls.Login}>
      <form>
        <Switch>
          <Route path={`/login`} exact>
            <NavLink to={'/signup'}>Нет аккаунта? Зарегистрируйтесь.</NavLink>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Название компании"
            />
            <input
              value={INN}
              type="number"
              onChange={(e) => setINN(e.target.value)}
              placeholder="ИНН"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Пароль"
            />
            <button onClick={auth}>Войти</button>
          </Route>
          <Route path={`/signup`} exact>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название компании"
            />
            <input
              value={INN}
              type="number"
              onChange={(e) => setINN(e.target.value)}
              placeholder="ИНН"
            />
            <input
              value={password}
              placeholder="Пароль"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signup}>зарегистрироваться</button>
          </Route>
        </Switch>
      </form>
    </div>
  )
}

export default Auth
