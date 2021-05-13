import React from 'react'
import Button from '../../UI/Button'

import cls from './Offer.module.sass'

function Offer() {
  return (
    <div className={cls.Offer} id="offer">
      <h2>
        Сделай заказ чего-нибудь уже <span>сейчас!</span>
      </h2>
      <Button text="Заказать" />
    </div>
  )
}

export default Offer
