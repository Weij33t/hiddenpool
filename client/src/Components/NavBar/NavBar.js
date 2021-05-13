import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import cls from './NavBar.module.sass'

function NavBar() {
  console.log(cls)
  return (
    <div className={cls.NavBar}>
      <ul>
        <HashLink to="/#news" smooth>
          <li>Новости</li>
        </HashLink>
        <HashLink to="/#companies" smooth>
          <li>Компании</li>
        </HashLink>
        <HashLink to="/#offer" smooth>
          <li>Оформить заказ</li>
        </HashLink>
        <HashLink to="/#about" smooth>
          <li>О нас</li>
        </HashLink>
      </ul>
    </div>
  )
}

export default NavBar
