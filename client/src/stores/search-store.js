import {action, observable, computed} from 'mobx';
import axios from 'axios'
import loaderStore from './loader-store'

class SearchPlayersStore {
  @observable players;

  constructor() {
    this.players = [];
  }

  @computed get allPlayer() {
    return this.players
  }

  @action getPlayer = (id) => {
    if(id.search('http://steamcommunity.com/') !== -1){
      const filterId = id.split('http://steamcommunity.com/')
      const readyId = filterId[1].split('/')
      this.getApiPlayerNickName(readyId[1])
    } else{
      this.getApiPlayerNickName(id)
    }
  }


  @action getApiPlayerNickName = id => {
    loaderStore.loadingUpdate(true)
    if(!id.match(/^\d+$/)){
      axios.post('/api/player-nickname/', {idPlayer: id})
        .then(response => {
          loaderStore.loadingUpdate(false)
          if(response.data.length !== 0){
            this.pushPlayer(response.data)
          } else {
            this.error()
          }
        })
    } else {
      axios.post('/api/player-id/', {idPlayer: id})
        .then(response => {
          loaderStore.loadingUpdate(false)
          this.pushPlayer(response.data)
        })
    }
  }


  @action deletePlayer = id => {
    this.players.splice(id, 1)
  }

  @action error = () => {
    alert('Пользователь не найден либо вы неправильно ввели данные. ')
  }

  @action pushPlayer = (player) => {
    this.players.push(player)
  }


}

const searchPlayersStore = new SearchPlayersStore()

export default searchPlayersStore;
export { SearchPlayersStore }