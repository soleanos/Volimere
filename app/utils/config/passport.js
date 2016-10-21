/**
 * Created by tamiand on 21/07/2016.
 */
/**
 * Created by mbellier on 11/05/2016.
 */
/*---------------
 passport.js
 Configuration de
 l'Authentification
 ----------------*/


// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var UserDao = require('../../database/UsersDao.js');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        console.log(user);
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        UserDao.getUserByID(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with name
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, login, password, done) { // callback with name and password from our form
            console.log(req);
            // find a user whose name is the same as the forms name
            // we are checking to see if the user trying to login already exists
            UserDao.getUserByOnlyLogin(login, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, 'USER_NOT_FOUND'); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (password != user.password)
                    return done(null, false, 'WRONG_PASSWORD'); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }));
};