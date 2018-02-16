import React from 'react';

// Components
import Bar from '../../components/Bar/Bar'
import Compare from '../../components/Complare/Compare'

// Scss
import './Main.scss'

function Main(props) {
  return (
    <div className='main'>
      <div className="main_bar">
       <Bar/>
      </div>
      <div className="main_page">
        <Compare/>
      </div>
    </div>
  );
}

export default Main;
