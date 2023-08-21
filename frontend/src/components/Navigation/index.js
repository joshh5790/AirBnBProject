import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/air-bee-n-bee_logo.png'
import { demoLogin } from '../../store/session'; //demo

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch() // demo

  const handleDemo = () => { // demo
    dispatch(demoLogin())
  }

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
      {/* demo */}
      <li> 
        <button onClick={handleDemo}>
          Demo account
        </button>
      </li>
      {isLoaded && <li>
          <ProfileButton user={sessionUser} />
      </li>}
    </ul>
  );
}

export default Navigation;
