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
      const rows = [];
      for (var i = 0; i < props.user.length; i++) {
        const url = "/user/" + props.user[i].username;
        rows.push(
          <a href={url}>
            <UserImage profile={props.user} size="32px"/>
          </a>
        );
      }
      return rows;
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
