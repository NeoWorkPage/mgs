import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'
import playerStore from "../stores/player-store";

@inject('playerStore') @observer
class Player extends Component {

  constructor(props){
    super(props)

    this.state = {
      player: ''
    }
  }

  render() {
    return (
      <div className={'player'}>
        <input type="text"
               placeholder='id'
               name='player'
               id='player'
               value={ this.state.player }
               onChange={ this.handleInput }
        />

        <button onClick={ this.postApiPlayer }>Загрузить</button>
      </div>
    );
  }

  handleInput = ev => {
    const name = ev.target.name;
    const value = ev.target.value;
    this.setState({[name]: value});
  }


  postApiPlayer = () => {
    playerStore.reservePlayerProfile(this.state.player)
  }
}


export default Player;
