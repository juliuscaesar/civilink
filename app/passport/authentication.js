const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt-nodejs');
const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const config = require('../config/main');

/*
 * When Logging in, this function takes in the form request
 * and outputs the user information
 */
setUserInfo = function setUserInfo(request) {
  // Generates hash using bCrypt
  var createHash = function(password){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  // The password is not encrypted here because during the later
  // password comparison check it won't work if it is.
  // Maybe this needs to be changed at some point
  const getUserInfo = {
    _id: request._id,
    username: request.username,
    password: request.password
  };
  return getUserInfo;
};

//
// Same as the above but parses more information
//
setUserInfoSignup = function setUserInfoSignup(request) {
  // Generates hash using bCrypt
  var createHash = function(password){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  // Encrypts the password since a check isn't needed/not logging in
  const getUserInfo = {
    _id: request._id,
    username: request.username,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    city: request.city,
    state: request.state,
    password: createHash(request.password)
  };
  return getUserInfo;
};

// Generate JWT
// This is the token that is used to manage authenticated/logged in sessions
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds
  });
}

//= =======================================
// Login Route
//= =======================================
exports.login = function (req, res, next) {

  const userInfo = setUserInfo(req.body);

  var isValidPassword = function(user, password){
      return bCrypt.compareSync(password, user.password);
  }

  User.findOne({ 'username' :  userInfo.username.toLowerCase() },
      function(err, user) {
          // In case of any error, return using the done method
          if (err)
              return done(err);
          // Username does not exist, log the error and redirect back
          if (!user){
              res.status(203).json({errorMessage: "Incorrect username"});
              console.log('User Not Found with username '+userInfo.username.toLowerCase());
              return false;
              //return done(null, false, req.flash('message', 'User Not found.'));
          }
          // User exists but wrong password, log the error
          if (!isValidPassword(user, userInfo.password)){
            res.status(203).json({errorMessage: "Invalid Password"});
              console.log('Invalid Password');
              return false;
              //return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
          }
          // User and password both match, return user from done method
          // which will be treated like success
          console.log('Correct Password');
          res.status(201).json({
            token: `${generateToken(userInfo)}`,
            user: user
          });
          //return true;
          //return done(null, user);
      });

};

//= =======================================
// Register Route
//= =======================================
exports.signup = function(req, res, next) {
    const userInfo = setUserInfoSignup(req.body);

    if (userInfo.username.length < 4) {
      console.log('Username too short: '+username);
      res.status(203).json({errorMessage: "Username too short"});
    }
    else if (userInfo.username.length > 24) {
      console.log('Username too long: '+username);
    res.status(203).json({errorMessage: "Username too long"});
    }
    else if (userInfo.password.length < 8) {
      console.log('Password too short: ');
      res.status(203).json({errorMessage: "Password too short"});
    }
    findOrCreateUser = function(){
        // find a user in Mongo with provided username
        User.findOne( { $or: [ { 'username' :  userInfo.username.toLowerCase() }, { 'email' :  userInfo.email } ] }, function(err, user) {
            // In case of any error, return using the done method
            if (err){
                console.log('Error in SignUp: '+err);
                res.status(203).json({errorMessage: "Error in signup"});
            }
            // already exists
            if (user) {
                console.log('User already exists with username: '+userInfo.username);
                res.status(203).json({errorMessage: "Username and/or email already in use"});
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.username = userInfo.username.toLowerCase();
                newUser.password = userInfo.password;
                newUser.email = userInfo.email;
                newUser.city = userInfo.city;
                newUser.state = userInfo.state;
                newUser.firstName = userInfo.firstName;
                newUser.lastName = userInfo.lastName;

                // save the user
                newUser.save(function(err) {
                    if (err){
                        console.log('Error in Saving user: '+err);
                        throw err;
                    }
                    console.log('User Registration succesful');

                });

                res.status(201).json({
                  token: `${generateToken(userInfo)}`,
                  user: newUser
                });
            }
        });
    };
    // Delay the execution of findOrCreateUser and execute the method
    // in the next tick of the event loop
    process.nextTick(findOrCreateUser);

    // Generates hash using bCrypt
    var createHash = function(password){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }


}

 /*
  * Decodes the given JWT token and returns the username of the
  * user currently logged in
  */
exports.getLoggedinUser = function(token) {
  const decoded = jwt.verify(token, config.secret);
  const userId = decoded.username;
  return userId;
}

/*
 * Returns the entire user object.
 * This API call can only be used by on its own (ie not included in another
 * API Call) as it will not work (see above note)
 */
exports.getLoggedinUserObject = function(req, res, next)  {

  // decode the token using a secret key-phrase
  const decoded = jwt.verify(req.headers.token, config.secret);

  const userId = decoded.username;
  var loggedinUser = [];
  User.find({ 'username' :  userId })
  .exec(function (err, user) {
    res.status(200).json({"user": user})
  })

}
