import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'

// Scss
import './Search.scss'

@inject('searchPlayersStore', 'loaderStore')
@observer
class Search extends Component {

  constructor(props){
    super(props)

    this.state = {
      search: ''
    }
  }

  render() {
    return (
      <div className='search'>
        <div className="search_label">Подбор мультиплеерных игр между игроками</div>
        <div className="search_input">
          <input type="text"
                 placeholder='Введите SteamID / SteamCommunityID / Имя профиля / URL профиля '
                 name='search'
                 className='input'
                 value={ this.state.search }
                 onChange={ this.handleInput }
          />

          <button onClick={ this.postApiPlayer }
                  className='button'
                  disabled={this.props.loaderStore.loaderApi || this.state.search === ''}
          >Добавить</button>
        </div>
      </div>
    );
  }

  handleInput = ev => {
    const name = ev.target.name;
    const value = ev.target.value;
    this.setState({[name]: value});
  }


  postApiPlayer = () => {
    if(this.state.search === '') return alert('Введите профиль!')
    this.props.searchPlayersStore.getPlayer(this.state.search)
    this.setState({
      search: ''
    })
  }
}


export default Search;
