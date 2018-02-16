import React from 'react';
import PropTypes from 'prop-types';

function BarList(props) {
  return (
    <div className={'bar__item ' + props.className } >
      <div className="bar__item__img">
        <a href={ props.profileurl } target='_blank'>
          <img src={ props.avatarfull } alt="avatar"/>
        </a>
      </div>
      <div className="bar__item__text">
        <a href={ props.profileurl }
           className="bar__item_name"
           target='_blank'>
          { props.personaname }
        </a>
        <div className="bar__item_info">
          { props.steamid ? 'id: ' + props.steamid : '' }<br/>
          { props.realname ? 'Имя: ' + props.realname : '' }<br/>
          { props.loccountrycode ? 'Страна: ' + props.loccountrycode : '' }
        </div>
      </div>
      <div className="bar__item__button">
        { props.add === false ? ' ' :
          <button
            onClick={() => props.add( props.item )}
            disabled={ props.loader }
            className='button button-green'>+ Добавить</button>
        }
        <button
          onClick={() => props.delete( props.idItem )}
          disabled={ props.loader }
          className='button button-red'>- Удалить</button>
      </div>
    </div>
  );
}



BarList.propTypes = {
  profileurl: PropTypes.string,
  avatarfull: PropTypes.string,
  personaname: PropTypes.string,
  steamid: PropTypes.string,
  realname: PropTypes.string,
  loccountrycode: PropTypes.string,
  add: PropTypes.func,
  className: PropTypes.string
};
BarList.defaultProps = {
  className: ''
};

export default BarList;
