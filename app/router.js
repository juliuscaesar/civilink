const express = require('express');  
const test = require('./routes/test'); 
const dashboard = require('./routes/dashboard');
const community = require('./routes/community');
const login = require('./passport/login');

module.exports = function(app) {  
  const apiRoutes = express.Router();

  apiRoutes.get('/helloworld', test.helloworld);
  apiRoutes.get('/dashboard', dashboard.getFeed);
  apiRoutes.get('/community', community.allCommunities);
  apiRoutes.get('/login', login)

  app.use('/api', apiRoutes);
}