const express = require('express');  
const test = require('./routes/test'); 
const dashboard = require('./routes/dashboard');
const community = require('./routes/community');
const project = require('./routes/project');
const profile = require('./routes/profile');
const login = require('./passport/login');

const passport = require('passport');



module.exports = function(app) {  
  const apiRoutes = express.Router();

  apiRoutes.get('/helloworld', test.helloworld);


  apiRoutes.get('/dashboard', dashboard.getFeed);

  // community api calls
  apiRoutes.get('/community', community.allCommunities);
  apiRoutes.get('/community/:id', community.getCommunity);

  // project api calls
  apiRoutes.get('/project/:id', project.getProject);

  // profile api calls
  apiRoutes.get('/profile/:id', profile.getProfile);

  // passport/authentication api calls
  apiRoutes.get('/login', login)

  app.use('/api', apiRoutes);

  app.use(passport.initialize())
  app.use(passport.session())
}