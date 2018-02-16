import React from 'react';
import { observer, inject } from 'mobx-react';

// Css
import './CompareTable.scss'

// Components
import TableList from '../CompareTableList/CompareTableList'

const CompareTable = inject('multiPlayersStore')(observer(({ multiPlayersStore }) => {
  return (
    <div className='table'>
      { multiPlayersStore.multiPlayerGames === null && multiPlayersStore.gamesLength === 2 ?
        <div className='table__error' >Нет похожих игр :(</div> :
        multiPlayersStore.multiPlayerGames === null ? ' ' :
          tableList(multiPlayersStore.multiPlayerGames) }
    </div>
  );
}));

const tableList = item => item.map((item, key) =>
  <TableList
    key={ key }
    name={ item.name }
    appid={ item.appid }
    price={ item.price }
    userscore={ item.userscore }
  />
);


export default CompareTable;

