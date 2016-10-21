/**
 * Created by plarboul on 11/04/2016.
 */



// Imports
var UsersDao = require ("./../../database/UsersDao");


// Exports
exports.login = _login;
exports.logout = _logout;
//exports.storeUser = _storeUser;
exports.getStoredUser = _getStoredUser;

//var connectedUser = {};

// Private

// Login
function _login(req, callback) {
    UsersDao.getUserByLogin(req.body.login, req.body.password, callback)
}

function _getStoredUser(req, callback){
    UsersDao.getStoredUser(req, callback);
}

// Logout
function _logout (login, callback) {
    UsersDao.logout();
}

/*function _storeUser(req, callback) {
    connectedUser = req.body;
    console.log(connectedUser);
}*/
