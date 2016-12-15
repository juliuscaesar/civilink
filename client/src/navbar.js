import React from 'react';

/**
 * Component for the navbar.
 */
class Navbar extends React.Component {
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
            <div className="top-header">
              <nav className="navbar navbar-default navbar-static-top navbar-white hidden-xs">
                <div className="container-shrink">
                  <div className="navbar-header">
                    <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle collapsed"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                    <navbar-brand><a href="/" className="navbar-brand">CiviLink</a></navbar-brand>
                  </div>
                  <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="mobile-header hidden-sm hidden-md hidden-lg hidden-xl">
              <div className="row">
                <div className="col-xs-3">
                  <center><a href="/dashboard"> 
                    <i aria-hidden="true" className="fa fa-home"></i>
                  </a></center>
                </div>
                <div className="col-xs-3">
                  <center><a href="/community">
                    <i aria-hidden="true" className="fa fa-users"></i>
                  </a></center></div>
                <div className="col-xs-3">
                  <center><a href="/tasks">
                    <i aria-hidden="true" className="fa fa-check-square"></i>
                  </a></center></div>
                <div className="col-xs-3">
                  <center><a href="/profile/caesar">
                    <i aria-hidden="true" className="fa fa-user"></i>
                  </a></center></div>
                </div>
              </div>
          </div>
        );
    }
}

export default Navbar;