var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/Users');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            if (username.length < 4) {
              console.log('Username too short: '+username);
              return done(null, false, req.flash('message','Username too short'));
            }
            else if (username.length > 24) {
              console.log('Username too long: '+username);
              return done(null, false, req.flash('message','Username too long'));
            }
            else if (req.param('zip').length != 5) {
              console.log('Invalid zipcode');
              return done(null, false, req.flash('message','Invalid Zipcode'));
            }
            else if (req.param('password').length < 8) {
              console.log('Password too short: ');
              return done(null, false, req.flash('message','Password not long enough'));
            }

            checkEmail = function() {
                // find a user in Mongo with provided email
                
            }

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne( { $or: [ { 'username' :  username.toLowerCase() }, { 'email' :  req.param('email') } ] }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username.toLowerCase();
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.zip = req.param('zip');
                        newUser.city = req.param('city');
                        newUser.state = req.param('state');
                        newUser.gender = req.param('gender');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}