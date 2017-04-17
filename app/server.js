const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      app = express();

var session = require('express-session');
var flash = require('connect-flash');

var port = 3001;
var passport = require('passport');

const router = require('./router');


// Initialize Passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);


// Initialize mongo database and mongoose
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/civilink', function(err) {
    if(err) {
        console.log('➜ 🍊  MongoDB connection error', err);
    } else {
        console.log('➜ 🍊  MongoDB connection successful');
    }
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
router(app);

app.listen(port);
console.log('➜ 🌎  Back end server is running on port ' + port + '.');
