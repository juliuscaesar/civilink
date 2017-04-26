import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage';
import Register from './Register';
import Dashboard from './dashboard/Dashboard';
import CommunityDashboard from './community/CommunityDashboard';
import Community from './community/Community';
import CreateCommunity from './community/CreateCommunity';
import Project from './project/Project';
import Profile from './profile/Profile';
import Auth from './modules/Auth';
import Organization from './organization/Organization';
import Logout from './modules/Logout';
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
    <ReactRouter.Route
      path="/"
      component={LandingPage}
      onEnter={skipLanding}/>
    <ReactRouter.Route
      path="/sign-up"
      component={Register}/>
    <ReactRouter.Route
      path="/dashboard"
      component={Dashboard}
      onEnter={requireAuth}/>
    <ReactRouter.Route
      path="/communities"
      component={CommunityDashboard}
      onEnter={requireAuth}/>
    <ReactRouter.Route
      path="/community/create"
      component={CreateCommunity}
      onEnter={requireAuth}/>
    <ReactRouter.Route
      path="/community/:id"
      component={Community}/>
    <ReactRouter.Route
      path="/project/:id"
      component={Project}/>
    <ReactRouter.Route
      path="/profile/:id"
      component={Profile}/>
    <ReactRouter.Route
      path="/organization/:id"
      component={Organization}/>
    <ReactRouter.Route
      path="/logout"
      component={Logout}/>
    <ReactRouter.Route
      path="*"
      component={LandingPage}/>
  </ReactRouter.Router>,
  document.getElementById('root')
);
