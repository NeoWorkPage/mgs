import React from 'react';
import { observer, inject } from 'mobx-react';

// Css
import './CompareTable.scss'

const CompareTable = inject('multiPlayersStore')(observer(({ multiPlayersStore }) => {
  return (
    <div className='table'>
      { multiPlayersStore.multiPlayerGames === 'Error' ?
        ''
        : multiPlayersStore.multiPlayerGames.map(item => (
          <div className='table__item'>
            <div className="table__item-name">
              { item.name }
            </div>
            <div className="table__item__text">
              Id игры: { item.appid }
              Цена: { item.price }
              Оценка пользователей: { item.userscore }
            </div>

          </div>
        ))
      }
    </div>
  );
}));

export default CompareTable;

