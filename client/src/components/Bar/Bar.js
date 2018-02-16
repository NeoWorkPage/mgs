import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

// Components
import BarList from '../BarList/BarList'

// Scss
import './Bar.scss'

@inject('searchPlayersStore', 'multiPlayersStore', 'loaderStore')
@observer
class Bar extends Component {
  render() {
    return (
      <div className='bar'>
        <div className="bar__name">Список профилей</div>
        <div className="bar__items">
          { this.props.searchPlayersStore.allPlayer.length !== 0 ?
            this.listPlayers() :
            <div className='bar__error'>
              Добавьте профили, чтобы сделать сравнение между ними.
            </div>
          }
        </div>
      </div>
    );
  }

  listPlayers = () => {
    return this.props.searchPlayersStore.allPlayer.map((item, key) => (
      <BarList
        key={ key }
        idItem={ key }
        item={ item }
        profileurl={ item.profileurl }
        avatarfull={ item.avatarfull }
        personaname={ item.personaname }
        steamid={ item.steamid }
        realname={ item.realname }
        loccountrycode={ item.loccountrycode }
        add={ this.addMultiPlayer }
        delete={ this.deletePlayer }
        loader={ this.props.loaderStore.loaderApi }
      />
    ))
  }

  addMultiPlayer = item => {
    this.props.multiPlayersStore.getMultiPlayer(item)
  }
  deletePlayer = id => {
    this.props.searchPlayersStore.deletePlayer(id)
  }
}

export default Bar;
