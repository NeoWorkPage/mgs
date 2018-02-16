import React from 'react';

// Components
import CompareHeader from '../CompareHeader/CompareHeader'
import CompareTable from '../CompareTable/CompareTable'

// Scss
import './Compare.scss'

const Сompare = (props) => {
  return (
    <div className='compare'>
      <CompareHeader/>
      <CompareTable/>
    </div>
  );
}



export default Сompare;
