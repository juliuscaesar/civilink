import React from 'react';
import Auth from '../modules/Auth'
import { Icon } from 'semantic-ui-react'

/**
* Component for the navbar.
*/
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.loggedin = this.loggedin.bind(this);
    this.guest = this.guest.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
  }
  //<div className="row">
  //  <div className="col-xs-6">
  //    <center><a href="/">Sign in</a></center>
  //  </div>
  //  <div className="col-xs-6">
  //    <center><a href="/sign-up">Register</a></center>
  //  </div>
  //</div>
  //           </div>


  /**
   * Returns the links for an authenticated user
   */
  loggedin() {
    return (
      <div>
        <p>
          <a href="/dashboard">
            <Icon name='home' />
            Dashboard</a>
        </p>
        <p>
          <a href="/communities">
            <Icon name='users' />
            Communities</a>
        </p>
        <p>
          <a href="/tasks">
            <Icon name='check square' />
            My Tasks
          </a>
        </p>
        <hr>
        </hr>
        <small>
          <span style={{color: '#808080'}}>© 2017 CiviLink, Inc.</span>
          <br>
          </br>
          <a href="/about" className="grayed">About</a>
          &nbsp;&nbsp;&nbsp;
          <a href="/donate" className="grayed">Donate</a>
        </small>
      </div>
    );
  }

  /**
   * Returns the links for an unauthenticated guest
   */
  guest() {
    return (
      <div>
        <p>
          <a href="/dashboard">
            <Icon name='user' />
            Sign in</a>
        </p>
        <p>
          <a href="/sign-up">
            <Icon name='check square' />
            Register</a>
        </p>
        <hr>
        </hr>
        <small>
          <span style={{color: '#808080'}}>© 2017 CiviLink, Inc.</span>
          <br>
          </br>
          <a href="/about" className="grayed">About</a>
          &nbsp;&nbsp;&nbsp;
          <a href="/donate" className="grayed">Donate</a>
        </small>
      </div>
    );
  }

  /**
   * Displays the sidebar links for the appropriate user
   */
  displayInfo() {
    if (Auth.isUserAuthenticated()) {
      return this.loggedin();
    }
    else {
      return this.guest();
    }
  }

  render(){
    return (
      this.displayInfo()
    );
  }
}

export default Sidebar;
