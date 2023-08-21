import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/air-bee-n-bee_logo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  return (
    <ul className='nav'>
      <li>
        <NavLink exact to="/">
          <img
            src={logo}
            alt='logo'
            className='logo'
          />
        </NavLink>
      </li>
      {isLoaded && <li>
        <div className='nav-right'>
          <ProfileButton user={sessionUser} />
        </div>
      </li>}
    </ul>
  );
}

export default Navigation;
