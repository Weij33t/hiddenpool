import React from 'react'
import { NavLink } from 'react-router-dom'

import cls from './NavBar.module.sass'

function NavBar() {
  console.log(cls)
  return (
    <div>
      <ul className={cls.NavBar}>
        <NavLink to="/#news">
          <li>Новости</li>
        </NavLink>
        <NavLink to="/#companies">
          <li>Компании</li>
        </NavLink>
        <NavLink to="/#offer">
          <li>Оформить заказ</li>
        </NavLink>
        <NavLink to="/#about">
          <li>О нас</li>
        </NavLink>
      </ul>
    </div>
  )
}

export default NavBar
