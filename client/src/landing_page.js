import React from 'react';
import request from 'superagent';
import Navbar from './navbar';
import LoginForm from './login_form';



/*
 * Component for the landing page that is displayed to users not logged in.
 */
class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    // Render the static content
    render(){
        return (
            <div>
                <Navbar/>
                <div className="about"><br/>
                  <div className="container-body">
                    <div className="row">
                      <div className="col-sm-8 col-md-8"><br/>
                        <center>
                          <div className="landingpage">Welcome to CiviLink</div><br/>
                          <div className="landingpagesub">a social platform for community engagement.</div>
                        </center><br/><br/>
                      </div>
                      <div className="col-sm-4 col-md-4">
                        <div className="row">
                          <div className="content-box hidden-xs">
                            <div>
                              <p className="text-center login-title">Sign in</p>
                              <div className="account-wall">
                                <LoginForm/>
                              </div>
                              <div id="message"></div>
                              <center><a href="/sign-up" className="text-center">Create an account!</a></center>
                            
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><br/>
                </div>
                <div className="content-box hidden-sm hidden-md hidden-lg hidden-xl">
                  <div>
                    <p className="text-center login-title">Sign in</p>
                    <div className="account-wall">
                      <LoginForm/>
                    </div>
                    <div className="message"></div>
                    <center><a href="/sign-up" className="text-center">Create an account!</a></center>
                  </div>
                </div>
                <div className="container-body">
                  <center><br/>
                    <h2 className="text-primary">We are a non-profit organization based in Boston that launched in September 2016.</h2><br/>
                    <h2>Our mission is to empower people to change their communities with technology. We created a social platform that does just that.</h2><br/>
                    <h3>Help us get off the ground today!</h3><br/><a href="/donate">
                      <div className="donate_sm">Donate now</div></a><br/><br/><br/>
                  </center>
                </div>
                <div className="odd">
                  <div className="container-body">
                    <center><br/>
                      <h1>How it works</h1><br/>
                      <div className="row">
                        <div className="col-sm-3">
                          <center>
                            <h2>Join a community<br/><small>Whether it's your city, school, or other organization you're a member of.</small></h2>
                          </center>
                        </div>
                        <div className="col-sm-3">
                          <center>
                            <h2>Share an idea<br/><small>Tell other people how you want to improve the community.</small></h2>
                          </center>
                        </div>
                        <div className="col-sm-3">
                          <center>
                            <h2>Complete tasks<br/><small>Help turn good ideas for your community into a reality by completing tasks whenever.</small></h2>
                          </center>
                        </div>
                        <div className="col-sm-3">
                          <center>
                            <h2>Get points<br/><small>The more you do for your community, the more points you gain.</small></h2>
                          </center>
                        </div>
                      </div>
                    </center><br/><br/>
                  </div>
                </div>
                <div className="container-body">
                  <center>
                    <h1>Like the idea?</h1>
                    <h2>Sign up and start making a difference today!</h2><br/><a href="/sign-up">
                      <div className="outline">Sign up now!</div></a><br/><br/>
                  </center>
                </div>
            </div>
        );
    }
}

export default LandingPage;