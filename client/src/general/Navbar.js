import React from 'react';
import Auth from '../modules/Auth';
import { Menu, Icon } from 'semantic-ui-react'

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

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  showLogout() {
    if (Auth.isUserAuthenticated()) {
      return (
        <a className="link text" href="/logout">Logout</a>
      );
    }
  }

  render(){
    //const { activeItem } = this.state
    return (
      <Menu size={'small'} color={'blue'} inverted attached secondary>
        <div className="ui container container-nav">
        <Menu.Item text>
          <a href="/" className="nav-title">CiviLink</a>
        </Menu.Item>

        <Menu.Item position='right'>
          {this.showLogout()}
        </Menu.Item>
        </div>
      </Menu>
    );
  }
}

export default Navbar;
