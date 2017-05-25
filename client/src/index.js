import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CommunityDashboard from './components/CommunityDashboard';
import Community from './components/Community';
import CreateCommunity from './components/CreateCommunity';
import TaskDashboard from './components/TaskDashboard';
import Project from './components/Project';
import Profile from './components/Profile';
import Auth from './components/Auth';
import Organization from './components/Organization';
import Logout from './components/Logout';


require('./style/style.css')

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
      path="/tasks"
      component={TaskDashboard}
      onEnter={requireAuth}/>
    <ReactRouter.Route
      path="/community/create"
      component={CreateCommunity}
      onEnter={requireAuth}/>
    <ReactRouter.Route
      path="/project/:id"
      component={Project}/>
    <ReactRouter.Route
      path="/user/:id"
      component={Profile}/>
    <ReactRouter.Route
      path="/organization/:id"
      component={Organization}/>
    <ReactRouter.Route
      path="/logout"
      component={Logout}/>
    <ReactRouter.Route
      path="/:id"
      component={Community}/>
    <ReactRouter.Route
      path="*"
      component={LandingPage}/>
  </ReactRouter.Router>,
  document.getElementById('root')
);
