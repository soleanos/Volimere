/**
 * Created by plarboul on 11/04/2016.
 */


var UsersService = require("./../services/UsersService");

// Exports
exports.getUsers = _getUsers;
exports.getUsersPrd = _getUsersPrd;

exports.createUser = _createUser;
exports.createUserPrd = _createUserPrd;

exports.getUser = _getUser;
exports.getUserByLogin = _getUserByLogin;
exports.updateUser = _updateUser;
exports.updateUser = _updateUser;
exports.deleteUser =_deleteUser;

exports.getPicture = _getPicture;
exports.getChart = _getChart;


// Private

// Get all the users
function _getUsers(req,callback) {
    //console.log(req.isAuthenticated());
    UsersService.getUsers(req,callback)
}

function _getUsersPrd(callback) {
    UsersService.getUsersPrd(callback)
}

function _getUser (req, callback){
    UsersService.getUser(req,callback);
}

function _getUserByLogin (req, callback) {
    UsersService.getUserByLogin(req, callback);
}

function _createUser (req, res, callback) {
    UsersService.newUser(req, res, callback);
}

function _createUserPrd(req, res, callback) {
    UsersService.newUserPrd(req, res, callback);
}

function _updateUser (req, res, callback) {
	UsersService.updateUser(req, callback);
}

function _deleteUser (req, res, callback) {
    UsersService.deleteUser(req, res, callback);
}

function _getPicture (req, res) {
    UsersService.getPicture(req,res);
}

function _getChart (req, res) {
    UsersService.getChart(req, res);
}
