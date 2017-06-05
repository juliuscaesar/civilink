import React from 'react';
import Auth from './Auth';
import UserImage from './UserImage';
import { Menu } from 'semantic-ui-react'

const Navbar = (props) => {
  /**
  * Displays the logged in users profile picture
  * as a link to their profile
  */
  const showUserImage = () => {
    if (Auth.isUserAuthenticated()) {
      const url = "/user/" + props.user.firstName;
      return (
        <a href={url}>
          <UserImage profile={props.user} size="32px"/>
        </a>
      );
    }
  }

  return (
    <Menu size={'small'} color={'blue'} inverted attached secondary>
      <div className="ui container container-nav">
        <Menu.Item>
          <a href="/" className="nav-title">CiviLink</a>
        </Menu.Item>

        <Menu.Item position='right'>
          { showUserImage() }
        </Menu.Item>
      </div>
    </Menu>
  );
}

export default Navbar;
