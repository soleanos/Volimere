/**
 * Created by plarboul on 11/04/2016.
 */

// Imports
var AuthenticationService = require("./../services/AuthenticationService");

// Exports
exports.login = _login;
exports.logout =_logout;
exports.getStoredUser = _getStoredUser;

// Private

function _login (req, callback) {
    AuthenticationService.login(req, callback);
}

function _logout (req, res, callback) {
    AuthenticationService.logout;
}

function _getStoredUser (req, callback) {
    AuthenticationService.getStoredUser(req, callback);
}

/*function _storeUser(req, callback){
    AuthenticationService.storeUser(req, callback);
}*/
