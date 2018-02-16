import React from 'react';
import { observer, inject } from 'mobx-react';
import multiPlayersStore from "../../stores/multiPlayer-store";


const CompareHeader = inject('multiPlayersStore')(observer(({ multiPlayersStore }) => {
  return (
    <div className='compare__header'>
      <div className="compare__header_title">Сравнение <span className='compare__header_mini'>(для сравнения добавьте два профиля)</span></div>
      <div className="compare__list">
        { compareList(multiPlayersStore.allPlayers) }
      </div>
    </div>
  )
}));

const compareList = item => item.map((item, key) =>
  <div className='bar__item bar__item_compare'>
    <div className="bar__item__img">
      <a href={ item.profileurl } target='_blank'>
        <img src={ item.avatarfull } alt="avatar"/>
      </a>
    </div>
    <div className="bar__item__text">
      <a href={ item.profileurl }
         className="bar__item_name"
         target='_blank'>
        { item.personaname }
      </a>
    </div>
    <div className="bar__item_info">
        Кол-во игр: { item.games.length }
      </div>
    <div className="bar__item__button">
      <button
        onClick={() => multiPlayersStore.deletePlayer(key)}
        disabled={ item.loader }
        className='button button-red'>- Удалить</button>
    </div>

  </div>
)


export default CompareHeader;
