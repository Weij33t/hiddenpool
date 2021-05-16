import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import cls from './NavBar.module.sass'
import app from '../../App.module.sass'
import Logo from '../../images/logo.png'

function NavBar({ isLogin, logout }) {
  const openMenu = (e) => {
    if (e.target.classList.contains(cls.Opened)) {
      e.target.classList.remove(cls.Opened)
      return null
    }
    e.target.classList.add(cls.Opened)
  }

  return (
    <div className={cls.NavBar}>
      <div className={app.AppWrapper + ' ' + cls.NavBarWrapper}>
        <div className={cls.Logo}>
          <img srcSet={Logo} />
        </div>
        <ul>
          <HashLink to="/#projects">
            <li>Проекты</li>
          </HashLink>
          <HashLink to="/#companies" smooth>
            <li>IT Центры</li>
          </HashLink>
          <HashLink to="/#offer" smooth>
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
              <li>Вход</li>
            </NavLink>
          )}
        </div>
        <div className={cls.Burger} onClick={openMenu}>
          <div>
            <HashLink to="/#projects" smooth>
              <li>Проекты</li>
            </HashLink>
            <HashLink to="/#companies" smooth>
              <li>IT Центры</li>
            </HashLink>
            <HashLink to="/#about" smooth>
              <li>Заявка</li>
            </HashLink>
            {isLogin ? (
              <NavLink to="/profile">
                <li>Профиль</li>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <li>Вход</li>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
