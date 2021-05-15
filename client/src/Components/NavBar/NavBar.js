import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import cls from './NavBar.module.sass'
import app from '../../App.module.sass'
import Logo from '../../images/logo.png'

function NavBar({ isLogin, logout }) {
  return (
    <div className={cls.NavBar}>
      <div className={app.AppWrapper + ' ' + cls.NavBarWrapper}>
        <div className={cls.Logo}>
          <img srcSet={Logo} />
        </div>
        <ul>
          <HashLink to="/#news" smooth>
            <li>Проекты</li>
          </HashLink>
          <HashLink to="/#companies" smooth>
            <li>IT Центры</li>
          </HashLink>
          <HashLink to="/#offer" smooth>
            <li>О нас</li>
          </HashLink>
          <HashLink to="/#about" smooth>
            <li>Заявка</li>
          </HashLink>
        </ul>
        <div className={cls.Auth}>
          {isLogin ? (
            <NavLink to="/profile">
              <li>Профиль</li>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <li>Вход/Регистрация</li>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
