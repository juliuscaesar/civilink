var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var profile = require('./routes/profile');
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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
