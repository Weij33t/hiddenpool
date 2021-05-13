import React from 'react'
import cls from '../styles/button.module.sass'

function Button({ click, text }) {
  return (
    <button className={cls.Button} onClick={click}>
      {text}
    </button>
  )
}

export default Button
