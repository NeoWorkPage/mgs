import React from 'react';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

// Components
import Header from '../components/Header/Header'
import Loader from '../components/Loader/Loader'

// Views
import Main from './Main/Main'

// stores
import searchPlayersStore from '../stores/search-store';
import multiPlayersStore from '../stores/multiPlayer-store';
import loaderStore from '../stores/loader-store';

// scss
import '../scss/index.scss';

// use strict
useStrict(true);


const stores = { searchPlayersStore, multiPlayersStore, loaderStore };

const App = props => (
  <Provider {...stores}>
    <div className="app">
      <Header/>
      <Main/>
      <Loader/>
    </div>
  </Provider>
)

export default App;