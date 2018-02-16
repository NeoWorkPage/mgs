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

  @computed get gamesLength () {
    return this.players.length
  }

  @computed get multiPlayerGames() {
    if(this.players.length !== 2) return null
    const arr1 = this.players[0].games
    const arr2 = this.players[1].games

    const more = arr1.length > arr2.length ? arr1 : arr2
    const less = arr1.length < arr2.length ? arr1 : arr2


    let cache;
    const games = [];

    //сохраним длины массивов:
    const ln1 =  more.length;
    const ln2 =  less.length;

    for (let i = 0; i < ln1; ++i){
      cache = more[i].appid;
      for (let j = 0; j < ln2; ++j){
        if (cache === less[j].appid){
          games.push(less[j])
          break;
        }
      }
    }
    if(games.length === 0) return null
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
