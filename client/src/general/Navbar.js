import React from 'react';
import Auth from '../modules/Auth';

/**
* Component for the navbar.
*/
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    //region bind all methods to this
    this.showLogout = this.showLogout.bind(this)

    //update the page

  }

  showLogout() {
    if (Auth.isUserAuthenticated()) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      );
    }
  }

  render(){
    return (
      <div>
        <div className="top-header">
          <nav className="navbar navbar-default navbar-static-top navbar-white hidden-xs">
            <div className="container-shrink">
              <div className="navbar-header">
                <button
                  type="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                  className="navbar-toggle collapsed">
                  <span className="sr-only">
                    Toggle navigation
                  </span>
                  <span className="icon-bar">
                  </span>
                  <span className="icon-bar">
                  </span>
                  <span className="icon-bar">
                  </span>
                </button>
                <navbar-brand>
                  <a href="/" className="navbar-brand">CiviLink</a>
                </navbar-brand>
              </div>
              <div
                id="bs-example-navbar-collapse-1"
                className="collapse navbar-collapse">
                { this.showLogout() }
              </div>
            </div>
          </nav>
        </div>
        <div className="mobile-header hidden-sm hidden-md hidden-lg hidden-xl">
          <div className="row">
            <div className="col-xs-3">
              <center>
                <a href="/dashboard">
                  <i aria-hidden="true" className="fa fa-home">
                  </i>
                </a>
              </center>
            </div>
            <div className="col-xs-3">
              <center>
                <a href="/community">
                  <i aria-hidden="true" className="fa fa-users">
                  </i>
                </a>
              </center>
            </div>
            <div className="col-xs-3">
              <center>
                <a href="/tasks">
                  <i
                    aria-hidden="true"
                    className="fa fa-check-square">
                  </i>
                </a>
              </center>
            </div>
            <div className="col-xs-3">
              <center>
                <a href="/profile/caesar">
                  <i aria-hidden="true" className="fa fa-user">
                  </i>
                </a>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
