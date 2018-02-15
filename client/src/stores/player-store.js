import {action, observable, computed} from 'mobx';
import axios from 'axios'

class PlayerStore {
  @observable players;
  @observable show;

  constructor() {
    this.players = [];
    this.show = false
  }

  @computed get showAll () {
    return this.show
  }

  @computed get allPlayer() {
    return this.players
  }

  @action reservePlayerProfile = (id) => {
    axios.post('/api/player/', {idPlayer: id})
      .then(response => {
        this.pushReservePlayer(response.data)
      });
  }

  @action pushReservePlayer = (player) => {
    this.players.push(player)
  }


}

const playerStore = new PlayerStore()

export default playerStore;
export { PlayerStore }