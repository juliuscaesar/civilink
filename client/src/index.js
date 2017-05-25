import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import DashboardContainer from './containers/DashboardContainer';
import CommunityDashboardContainer from './containers/CommunityDashboardContainer';
import CommunityContainer from './containers/CommunityContainer';
import TaskDashboard from './components/TaskDashboard';
import ProjectContainer from './containers/ProjectContainer';
import ProfileContainer from './containers/ProfileContainer';
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
      <ReactRouter.Route component={App}>
        <ReactRouter.Route
          path="/"
          component={LandingPage}
          onEnter={skipLanding}/>
        <ReactRouter.Route
          path="/dashboard"
          component={DashboardContainer}
          onEnter={requireAuth}/>
        <ReactRouter.Route
          path="/sign-up"
          component={Register}/>
          <ReactRouter.Route
            path="/communities"
            component={CommunityDashboardContainer}
            onEnter={requireAuth}/>
          <ReactRouter.Route
            path="/tasks"
            component={TaskDashboard}
            onEnter={requireAuth}/>
          <ReactRouter.Route
            path="/project/:id"
            component={ProjectContainer}/>
          <ReactRouter.Route
            path="/user/:id"
            component={ProfileContainer}/>
          <ReactRouter.Route
            path="/organization/:id"
            component={Organization}/>
          <ReactRouter.Route
            path="/logout"
            component={Logout}/>
          <ReactRouter.Route
            path="/:id"
            component={CommunityContainer}/>
          <ReactRouter.Route
            path="*"
            component={LandingPage}/>
    </ReactRouter.Route>
  </ReactRouter.Router>,
  document.getElementById('root')
);
