import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../Modal_loginForm";
import SignupFormModal from "../Modal_signupForm";
import { useHistory } from "react-router-dom";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false)

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    closeMenu()
  };

  const handleManageSpots = e => {
    e.preventDefault()
    history.push('/spots/current')
    closeMenu()
  }

  const handleManageReviews = e => {
    e.preventDefault()
    history.push('/reviews/current')
    closeMenu()
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="user-info">Hello, {user.firstName}</li>
            <li className="user-info">{user.email}</li>
            <li className="dropdown-button">
              <button
                onClick={handleManageSpots}
                className="manage-spots-button">
                Manage Spots
              </button>
            </li>
            <li className="dropdown-button">
              <button
                onClick={handleManageReviews}
                className="manage-reviews-button">
                Manage Reviews
              </button>
            </li>
            <li>
              <button
                onClick={logout}
                className='logout-button'
                >
                Log Out
                </button>
            </li>
          </>
          ) : (
            <>
            <li className="dropdown-button">
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                onButtonClick={closeMenu}
                className='login-button'
                />
            </li>
            <li className="dropdown-button">
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
                onButtonClick={closeMenu}
                className='signup-button'
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
