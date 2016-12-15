const express = require('express'),  
      bodyParser = require('body-parser'),
      cors = require('cors'),
      app = express();

var port = 3001;  
var passport = require('passport');

const router = require('./router');  


// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// Initialize mongo database and mongoose
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/civilink', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});



app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(cors());  
router(app);

app.listen(port);  
console.log('Your server is running on port ' + port + '.');  