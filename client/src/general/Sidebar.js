import React from 'react';
import { Icon } from 'semantic-ui-react'

/**
* Component for the navbar.
*/
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    //region bind all methods to this


    //update the page

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
  render(){
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
        <p className="grayed">
          © 2016 CiviLink
          <br>
          </br>
          <a href="/about" className="grayed">About</a>
          &nbsp;&nbsp;&nbsp;
          <a href="/donate" className="grayed">Donate</a>
        </p>
      </div>
    );
  }
}

export default Sidebar;