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
require('./style.css')

var ReactRouter = require('react-router');

ReactDOM.render(
    <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/" component={LandingPage}/>
        <ReactRouter.Route path="/sign-up" component={Register}/>
        <ReactRouter.Route path="/dashboard" component={Dashboard}/>
        <ReactRouter.Route path="/community" component={CommunityDashboard}/>
        <ReactRouter.Route path="/community/create" component={CreateCommunity}/>
        <ReactRouter.Route path="/community/:id" component={Community}/>
        <ReactRouter.Route path="/project/:id" component={Project}/>
        <ReactRouter.Route path="/profile/:id" component={Profile}/>
    </ReactRouter.Router>,
    document.getElementById('root')
);
