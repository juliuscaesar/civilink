import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './landing_page';
import Register from './register';
import Dashboard from './dashboard';
import Community from './community';

//require('../style/style.css');
var ReactRouter = require('react-router');

ReactDOM.render(
    <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/" component={LandingPage}/>
        <ReactRouter.Route path="/sign-up" component={Register}/>
        <ReactRouter.Route path="/dashboard" component={Dashboard}/>
        <ReactRouter.Route path="/community" component={Community}/>
    </ReactRouter.Router>,
    document.getElementById('root')
);
