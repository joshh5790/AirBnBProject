import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/air-bee-n-bee_logo.png'

function Navigation({ isLoaded }){
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const spotDetailPath = /\/spots\/\d+$/
  const spotUpdatePath = /\/spots\/\d+\/edit$/
  const spotMapPath = /^\/spots\/\d+\/map$/

  const handleLogo = () => {
    history.push('/', 'reset')
  }

  return (
    <ul className='nav'>
      <li className='nav-left'>
        <div
          onClick={handleLogo}
          className='logo-link'>
          <img
            src={logo}
            alt='logo'
            className='logo'
          />
          <p className='logo-text'>air-bee-n-bee</p>
        </div>
        <i className="fa-solid fa-info">
        {location.pathname === '/' && <div className='page-info'>
          <h4>Home Page Functionalities</h4>
          <ul>
            <li><b>Tooltip:</b> tooltip with name will appear after hovering above spot card for 1 second.</li>
            <li><b>Query:</b> Allows for size query, which specifies how many listings should be shown on a single page</li>
            <li><b>Pagination:</b> Allows user to click to next page of listings</li>
            <li><b>Responsive (Mobile friendly)</b></li>
            <li><b>Skeleton</b></li>
            <li><b>NOTICE:</b> Due to Render's (the hosting site) dyno shutting down at inconsistent times, you may be logged out randomly. Should you encounter a blank screen while playing around, do not panic and calmly navigate your way to the logo on the top left and click on it, which will bring you back to the home page."</li>
          </ul>
        </div>}
        {location.pathname === '/spots/current' && <div className='page-info'>
          <h4>Manage Spots Functionalities</h4>
          <ul>
            <li><b>Tooltip:</b> tooltip with name will appear after hovering above spot card for 1 second.</li>
            <li><b>Create new spot:</b> Create new spot button which will allow user to create a new spot.</li>
            <li><b>Update spot:</b> Update spot button for each spot user owns which allows user to update spot information.</li>
            <li><b>Delete spot:</b> Delete spot button for each spot user owns which allows user to delete spot after confirmation.</li>
            <li><b>Responsive (Mobile friendly)</b></li>
            <li><b>Skeleton</b></li>
          </ul>
        </div>}
        {location.pathname === '/reviews/current' && <div className='page-info'>
          <h4>Manage Reviews Functionalities</h4>
          <ul>
            <li><b>Update review:</b> Update review button for each review user has which allows user to update review information.</li>
            <li><b>Delete review:</b> Delete review button for each review user has which allows user to delete review after confirmation.</li>
            <li><b>Responsive (Mobile friendly)</b></li>
          </ul>
        </div>}
        {location.pathname === '/account' && <div className='page-info'>
          <h4>Account Settings Functionalities</h4>
          <ul>
            <li><b>Edit buttons:</b> Edit button reveals inputs that allow user to modify their information.</li>
            <li>Modularized so that further user info can be added in the future.</li>
            <li>Other edit buttons are disabled and other information is grayed out when one set of inputs is open</li>
            <li><b>Save buttons:</b> Disabled until user input is valid and different from original inputs.</li>
            <li><b>Delete account:</b> Delete account button which opens a modal which asks for user confirmation before deleting their account by asking for the user to type out a string.</li>
            <li><b>Responsive (Mobile friendly)</b></li>
          </ul>
        </div>}
        {(location.pathname === '/spots/new' || location.pathname.match(spotUpdatePath)) && <div className='page-info'>
          <h4>Create/Update Spot Functionalities</h4>
          <ul>
            <li><b>Create/Update spot button:</b> Disabled until valid inputs are entered.</li>
            <li><b>Create/Update spot images:</b> When creating or updating the spot, the spot images database will also be added to/updated.</li>
            <li><b>Responsive (Mobile friendly)</b></li>
          </ul>
        </div>}
        {location.pathname.match(spotDetailPath) && <div className='page-info'>
          <h4>Spot Details Functionalities</h4>
          <ul>
            <li><b>Image modal:</b> When clicking on an image, a full size version of the image will appear.</li>
            <li>Image modal contains arrow buttons that allow navigation between spot images, if there are multiple.</li>
            <li><b>Map link:</b> Clicking on the location of the spot will redirect users to the spot's map page.</li>
            <li><b>Write a review:</b> Allows a logged in user to write a review if the spot is not their own and they haven't written one yet.</li>
            <li><b>Update review:</b> Update review button for each review user has which allows user to update review information. Only available for user's own reviews.</li>
            <li><b>Delete review:</b> Similar to review button but for deleting.</li>
            <li><b>Mobile friendly</b></li>
            <li><b>Skeleton</b></li>
          </ul>
        </div>}
        {location.pathname.match(spotMapPath) && <div className='page-info'>
          <h4>Map Functionalities</h4>
          <ul>
            <li><b>Map:</b> Provides a map with a marker on the location of the spot, derived from the lat/lng entered by the user.</li>
            <li><b>Back to location:</b> Redirects user back to the spot details page.</li>
            <li><b>Responsive (Mobile friendly)</b></li>
          </ul>
        </div>}
      </i>
      </li>

      {isLoaded && <li className='nav-right'>
        {sessionUser && <NavLink
          className='new-spot-button'
          to='/spots/new'>
            Create a New Spot
        </NavLink>}
        <div className='nav-right-profile'>
          <ProfileButton user={sessionUser} />
        </div>
      </li>}
    </ul>
  );
}

export default Navigation;
