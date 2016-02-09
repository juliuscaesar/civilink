var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/civilink', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var routes = require('./routes/index');
var profile = require('./routes/profile');
var editprofile = require('./routes/edit-profile');
var users = require('./routes/users');
var dash = require('./routes/dashboard');
var community = require('./routes/community');
var rings = require('./routes/rings');
var representation = require('./routes/representation');
var idea = require('./routes/idea');            
var ideas = require('./routes/ideas');
var opinion = require('./routes/opinion');
var events = require('./routes/events');
var orgs = require('./routes/orgs');
var article = require('./routes/article');
var petition = require('./routes/petition');
var comm = require('./routes/comm');
var people = require('./routes/people');
var signup = require('./routes/sign-up');
var createcommunity = require('./routes/create-community');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes/index')(passport);
app.use('/', routes);
app.use('/dashboard', dash);
app.use('/profile', profile);
app.use('/community', community);
app.use('/rings', rings);
app.use('/representation', representation);
app.use('/idea', idea);
app.use('/ideas', ideas);
app.use('/opinion', opinion);
app.use('/events', events);
app.use('/orgs', orgs);
app.use('/article', article);
app.use('/petition', petition);
app.use('/comm', comm);
app.use('/people', people);
app.use('/edit-profile', editprofile);
app.use('/sign-up', signup);
app.use('/create-community', createcommunity);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
