/**
/**
 * Created by plarboul on 12/04/2016.
 */

// Imports

var confService = require("./../../utils/config/config");
var path = require("path");
var fs = require("fs");
var UsersDao = require ("./../../database/UsersDao");

var config = confService.getConf();

// Exports
exports.getUsers = _getUsers;
exports.getUsersPrd = _getUsersPrd;

exports.newUser = _createUser;
exports.newUserPrd = _createUserPrd;

exports.deleteUser = _deleteUser;
exports.getUser = _getUser;
exports.getUserByLogin = _getUserByLogin;
exports.updateUser = _updateUser;
exports.getPicture = _getPicture;
exports.getChart = _getChart;

// Private

// Get all the users
function _getUsers (req,callback) {
    UsersDao.getUsers(req,callback);
}

function _getUsersPrd (callback) {
    UsersDao.getUsersPrd(callback);
}

//Create a new User
function _createUser(req, res, callback) {
    UsersDao.createUser(req,res, callback);
}

//Create a new User from Prdbase
function _createUserPrd(req, res, callback) {
    UsersDao.createUserPrd(req,res, callback);
}

//Delete a user
function _deleteUser(req, res, callback){
    UsersDao.deleteUser(req, callback);
}

//Get a user
function _getUser(req, callback){
    UsersDao.getUserByID(req, callback);
}

function _getUserByLogin(req, callback) {
    UsersDao.getUserByLogin(req, callback);
}

function _updateUser(req, callback){
    UsersDao.updateUser(req, callback);
}

// Get picture of an existing user
function _getPicture(req, res) {

    var directoryPictures = config.pathResized;
 
    filePath = path.join(directoryPictures,req.params.id+'.jpg');

    function fileExists(filename){
      try{
        fs.accessSync(filename)
        return true;
      }catch(e){
        return false;
      }
    }

    var test = fileExists(filePath);

    if(test == false){
        filePath = path.join(directoryPictures,'Default.png');
    }

    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}

function _getChart (req, res) {
    var directoryOrga = config.pathOrga;
    var filePath = path.join(directoryOrga,'Organigramme.png');

    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}
