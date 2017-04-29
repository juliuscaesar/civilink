import React from 'react';
import Auth from '../modules/Auth';
import { Menu, Button } from 'semantic-ui-react'

/**
* Component for the navbar.
*/
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    //region bind all methods to this
    this.showLogout = this.showLogout.bind(this)

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  showLogout() {
    if (Auth.isUserAuthenticated()) {
      return (
        <a href="/logout">Logout</a>
      );
    }
  }

  render(){
    const { activeItem } = this.state
    return (
      <Menu size={'large'} color={'blue'} inverted stackable>
        <Menu.Item>
          <a href="/">CiviLink</a>
        </Menu.Item>

        <Menu.Item position='right'>
          {this.showLogout()}
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;
