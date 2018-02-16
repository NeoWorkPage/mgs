import React from 'react';
import { observer, inject } from 'mobx-react';

// Img
import loading from '../../img/loading.gif'

// Scss
import './Loader.scss'

const Loader = inject('loaderStore')(observer(({ loaderStore }) => {
  return (
    <div className='loader'>
      { loaderList(loaderStore.loaderApi) }
    </div>
  );
}));

const loaderList = value => {
  return (
    value === false ? ' ' : <img src={loading} alt="loading"/>
  )
}

export default Loader;
