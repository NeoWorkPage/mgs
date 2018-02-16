import React from 'react';
import Search from '../Search/Search'

// Scss
import './Header.scss'


function Header(props) {
  return (
    <header className='header'>
      <div className="logo">Multiplayer steam</div>
      <Search/>
    </header>
  );
}


export default Header;
