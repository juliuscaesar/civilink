const express = require('express');
const test = require('./routes/test');
const dashboard = require('./routes/dashboard');
const community = require('./routes/community');
const project = require('./routes/project');
const profile = require('./routes/profile');
const login = require('./passport/login');
const org = require('./routes/organizations');
const task = require('./routes/task');

const Authentication = require('./passport/authentication');
const passport = require('passport');
const passportService = require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // We will add all of our API calls to this
  // the final API endpoint will look like: /api/<whatever>
  const apiRoutes = express.Router()

  // Adding only the user authentication calls to this
  // the final API endpoint will look like: /api/user/<whatever>
  const authRoutes = express.Router();


  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  //= =======================================
  //      AUTHORIZATION CALLS
  //= =======================================
  authRoutes.post('/login', Authentication.login);
  authRoutes.post('/signup', Authentication.signup);
  authRoutes.get('/getuser', Authentication.getLoggedinUserObject);

  //= =======================================
  //      DASHBOARD CALLS
  //= =======================================
  const dashboardRoutes = express.Router();
  apiRoutes.use('/dashboard', dashboardRoutes);
  dashboardRoutes.get('/feed', dashboard.getFeed);
  dashboardRoutes.get('/projects', dashboard.getProjects);

  //= =======================================
  //      COMMUNITY CALLS
  //= =======================================
  apiRoutes.get('/community', community.allCommunities);
  apiRoutes.get('/community/:id', community.getCommunity);

  //= =======================================
  //      ORGANIZATION CALLS
  //= =======================================
  apiRoutes.get('/org/:id', org.getOrg);

  //= =======================================
  //      PROJECT CALLS
  //= =======================================
  apiRoutes.post('/project/create', project.createProject);
  apiRoutes.get('/project/:id', project.getProject);

  //= =======================================
  //      PROFILE CALLS
  //= =======================================
  apiRoutes.get('/profile/:id', profile.getProfile);

  //= =======================================
  //      TASK CALLS
  //= =======================================
  apiRoutes.post('/task/create', task.createTask);


  apiRoutes.get('/helloworld', test.helloworld);
  // sets everything in apiRoutes to /api/<whatever>
  app.use('/api', apiRoutes);

  app.use(passport.initialize())
  app.use(passport.session())
}
