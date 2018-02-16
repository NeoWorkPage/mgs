import React from 'react';
import { observer, inject } from 'mobx-react';

// Css
import './CompareTable.scss'

const CompareTable = inject('multiPlayersStore')(observer(({ multiPlayersStore }) => {
  return (
    <div className='table'>
      { multiPlayersStore.multiPlayerGames === null && multiPlayersStore.gamesLength === 2 ?
        <div className='table__error'>Нет похожих игр :(</div> :
        multiPlayersStore.multiPlayerGames === null ? ' ' :
        tableList(multiPlayersStore.multiPlayerGames) }
    </div>
  );
}));


const tableList = item => item.map(item => (
    <div className='table__item'>
      <div className="table__item-name">
        { item.name }
      </div>
      <div className="table__item__text">
        Id игры: { item.appid } &nbsp;
        Цена: { item.price }руб.&nbsp;
        Оценка пользователей: { item.userscore }
      </div>
    </div>
  ));


export default CompareTable;

