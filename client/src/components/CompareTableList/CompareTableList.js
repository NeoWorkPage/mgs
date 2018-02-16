import React from 'react';

function CompareTableList(props) {
  return (
    <div className='table__item'>
      <div className="table__item-name">
        { props.name }
      </div>
      <div className="table__item__text">
        Id игры: { props.appid } &nbsp;
        Цена: { props.price }руб.&nbsp;
        Оценка пользователей: { props.userscore }
      </div>
    </div>
  );
}

export default CompareTableList;
