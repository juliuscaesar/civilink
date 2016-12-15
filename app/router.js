const express = require('express');  
const test = require('./routes/test'); 
const dashboard = require('./routes/dashboard');

module.exports = function(app) {  
  const apiRoutes = express.Router();

  apiRoutes.get('/helloworld', test.helloworld);
  apiRoutes.get('/dashboard', dashboard);

  app.use('/api', apiRoutes);
}