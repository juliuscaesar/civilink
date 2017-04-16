import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './landing_page';
import Register from './register';
import Dashboard from './dashboard';
import CommunityDashboard from './community_dashboard';
import Community from './community';
import CreateCommunity from './create_community';
import Project from './project';
import Profile from './profile';
import Auth from './modules/auth';
import Org from './organization';
import Logout from './logout';
require('./style.css')

var ReactRouter = require('react-router');

function requireAuth(nextState, replace) {
  if (!Auth.isUserAuthenticated()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function skipLanding(nextState, replace) {
  if (Auth.isUserAuthenticated()) {
    replace({
      pathname: '/dashboard',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render(
    <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/" component={LandingPage} onEnter={skipLanding}/>
        <ReactRouter.Route path="/sign-up" component={Register}/>
        <ReactRouter.Route path="/dashboard" component={Dashboard} onEnter={requireAuth}/>
        <ReactRouter.Route path="/communities" component={CommunityDashboard} onEnter={requireAuth}/>
        <ReactRouter.Route path="/community/create" component={CreateCommunity} onEnter={requireAuth}/>
        <ReactRouter.Route path="/community/:id" component={Community}/>
        <ReactRouter.Route path="/project/:id" component={Project}/>
        <ReactRouter.Route path="/profile/:id" component={Profile}/>
          <ReactRouter.Route path="/organization/:id" component={Org}/>
        <ReactRouter.Route path="/logout" component={Logout}/>
        <ReactRouter.Route path="*" component={LandingPage}/>
    </ReactRouter.Router>,
    document.getElementById('root')
);
