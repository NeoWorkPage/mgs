import React from 'react';
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

// Components
import Player from '../components/Player'

// stores
import playerStore from '../stores/player-store';

// scss
import '../scss/index.scss';

// use strict
useStrict(true);


const stores = { playerStore };

const App = props => (
  <Provider {...stores}>
    <div className="App">
      <Player/>
      <DevTools/>
    </div>
  </Provider>
)

export default App;