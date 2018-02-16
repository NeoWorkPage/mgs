import  {action, observable } from 'mobx';
import axios from 'axios'
import { computed } from "mobx/lib/mobx";
import loaderStore from './loader-store'

class MultiPlayersStore {
  @observable players;

  constructor() {
    this.players = []
  }

  @computed get allPlayers () {
    return this.players
  }

  @computed get multiPlayerGames() {
    if(this.players.length !== 2) return 'Error'

    // Фильтрация похожих игр
    const player1 = this.players[0].games.length >= this.players[1].games.length ?  this.players[0].games : this.players[1].games;
    const player2 = this.players[0].games.length >= this.players[1].games.length ?  this.players[0].games : this.players[1].games;

    //здесь будем хранить значение элемента
    let cache;
    const games = []

    //сохраним длины массивов:
    const ln1 =  player1.length >= player2.length ?  player1.length : player2.length;
    const ln2 =  player1.length >= player2.length ?  player1.length : player2.length;

    for (let i = 0; i < ln1; ++i){
      cache = player1[i].appid;
      for (let j = 0; j < ln2; ++j){
        if (cache === player2[j].appid){
          games.push(player2[i])
          break;
        }
      }
    }
    console.log(games)
    return games
  }


  @action getMultiPlayer = item => {
    if (this.players.length >= 2) return this.error('Не больше двух профилей!')

    loaderStore.loadingUpdate(true);

    axios.post('/api/multiplayer', {
      item: item
    }).then(response => {

      if(response.data.length === 0) return this.error('Ошибка! Игры были не найдены ):')
      this.addPlayer(response.data)
      loaderStore.loadingUpdate(false);
    }).catch(response => {
      loaderStore.loadingUpdate(false);

      this.error('Ошибка! Этот профиль не имеет доступ к играм.')
    })
  }

  @action addPlayer = item => {
    this.players.push(item)
  }

  @action deletePlayer = id => {
    this.players.splice(id, 1)
  }

  @action error = text => {
    alert(text)
  }


}

const multiPlayersStore = new MultiPlayersStore()

export default multiPlayersStore;
